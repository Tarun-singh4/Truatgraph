const express = require("express");
const cors = require("cors");
const axios = require("axios");
const NodeCache = require("node-cache");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ================= CACHE =================
const cache = new NodeCache({ stdTTL: 300 });

// ================= RATE LIMIT =================
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10
});

app.use("/analyze", limiter);

// ================= SCORE FUNCTION =================
function calculateScore(data) {
  let score =
    data.public_repos * 2 +
    data.followers * 1 +
    data.stars * 2 +
    data.forks * 1 +
    data.contributions / 10;

  score = Math.min(score, 100);
  return Math.round(score);
}

// ================= MAIN API =================
app.get("/analyze/:username", async (req, res) => {
  const username = req.params.username;
  console.log("USERNAME:", username);

  try {
    // CACHE CHECK
    if (cache.has(username)) {
      console.log("Cache hit");
      return res.json(cache.get(username));
    }

    // ================= GITHUB API =================
    const userRes = await axios.get(`https://api.github.com/users/${username}`);
    const repoRes = await axios.get(`https://api.github.com/users/${username}/repos`);

    const user = userRes.data;
    const repos = repoRes.data;

    // ================= CALCULATIONS =================
    let stars = 0;
    let forks = 0;

    repos.forEach(repo => {
      stars += repo.stargazers_count;
      forks += repo.forks_count;
    });

    const contributions = user.public_repos*10;

    const createdAt = new Date(user.created_at);
    const age = (Date.now() - createdAt) / (1000 * 60 * 60 * 24 * 365);

    const score = calculateScore({
      public_repos: user.public_repos,
      followers: user.followers,
      stars,
      forks,
      contributions
    });

    const loan = score * 100;

    let risk = "High";
    if (score > 70) risk = "Low";
    else if (score > 50) risk = "Medium";

    // ================= RESPONSE =================
    const response = {
      username: user.login,
      avatar: user.avatar_url,
      repos: user.public_repos,
      followers: user.followers,
      stars,
      forks,
      accountAge: age.toFixed(1),
      contributions,
      score,
      loan,
      risk
    };

    // SAVE IN CACHE
    cache.set(username, response);

    res.json(response);

  } catch (err) {
    console.log("ERROR:", err.message);
    res.status(500).json({ error: "Backend error" });
  }
});

// ================= SERVER =================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});