
import { useState } from "react";
import heroImg from "./assets/hero.png";
import { connectWallet, saveScore } from "./web3";

function App() {

const [page, setPage] = useState("home");
const [username, setUsername] = useState("");
const [score, setScore] = useState(null);
const [profile, setProfile] = useState(null);
const [loading, setLoading] = useState(false);

const analyzeProfile = async () => {
if (!username) return;

try {
  setLoading(true);

  const res = await fetch('http://localhost:5000/analyze/${username}');

  if (!res.ok) {
    alert("User not found");
    setLoading(false);
    return;
  }

  const data = await res.json();

  // SET SCORE
  setScore(data.score);

  // SET PROFILE (FINAL FORMAT)
  setProfile({
    login: data.username,
    avatar_url: data.avatar,
    public_repos: data.repos,
    followers: data.followers,
    stars: data.stars,
    forks: data.forks,
    age: data.accountAge,
    contributions: data.contributions,
    loan: data.loan,
    risk: data.risk,
    score: data.score
  });

} catch (err) {
  console.log(err);
}

setLoading(false);
};

const getRisk = () => {
if (score > 70) return "Low Risk";
if (score > 50) return "Medium Risk";
return "High Risk";
};

// ================= HOME =================
if (page === "home") {
return (
<div className="min-h-screen bg-black text-white overflow-hidden relative">

  {/* GRADIENT BG */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>

  {/* PARTICLES */}
  <div className="absolute inset-0">
    <div className="w-2 h-2 bg-blue-400 rounded-full absolute top-20 left-20 animate-ping"></div>
    <div className="w-2 h-2 bg-purple-400 rounded-full absolute top-40 right-32 animate-pulse"></div>
    <div className="w-1 h-1 bg-white rounded-full absolute bottom-32 left-1/3 animate-bounce"></div>
  </div>

  <div className="flex items-center justify-center min-h-screen px-10 relative z-10">

    <div className="flex w-full max-w-7xl items-center">

      {/* LEFT */}
      <div className="w-1/2">

        <h1 className="text-7xl font-bold mb-6 leading-tight text-white">
        Trust<span className="text-blue-500">Graph</span>
        </h1>

        <p className="text-2xl md:text-3xl font-semibold text-gray-200 mb-6 leading-snug">
          Transforming digital productivity into
          <span className="text-blue-400"> verifiable credit identity</span>
        </p>

        <p className="text-gray-400 mb-6 max-w-lg">
          AI-powered system that converts GitHub activity into trust,
          risk scores, and real-world financial eligibility.
        </p>

        {/* TAGS */}
        <div className="flex gap-3 mb-8 text-sm">
          <span className="bg-white/10 px-3 py-1 rounded-full">AI Scoring</span>
          <span className="bg-white/10 px-3 py-1 rounded-full">GitHub Data</span>
          <span className="bg-white/10 px-3 py-1 rounded-full">Credit Engine</span>
        </div>

        <div className="flex gap-4">

          <button
            onClick={() => setPage("analyze")}
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-xl font-semibold hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition duration-300"
          >
            Get Started
          </button>

          <button
            onClick={() => setPage("learn")}
            className="border border-gray-500 px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Learn More
          </button>

        </div>

      </div>

      {/* RIGHT */}
      <div className="w-1/2 flex justify-center items-center relative">

        {/* GLOW */}
        <div className="absolute w-[350px] h-[350px] bg-blue-500/30 blur-3xl rounded-full animate-pulse"></div>

        <img
          src={heroImg}
          alt="TrustGraph"
          className="h-[450px] md:h-[500px] relative z-10 drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:scale-105 transition duration-500 animate-float"
        />

      </div>

    </div>

  </div>
  {/* FUTURE SECTION */}
  <div className="mt-8 px-10 relative z-10">

    <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-300 mb-16">
      The Future of Credit Underwriting
    </h2>

    <div className="grid md:grid-cols-3 gap-10 text-center">

      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl hover:scale-105 transition">
        <h3 className="text-2xl font-bold mb-3">
          Digital Productivity
        </h3>
        <p className="text-green-400 font-semibold text-lg">
          Creditworthiness
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl hover:scale-105 transition">
        <h3 className="text-2xl font-bold mb-3">
          Behavioral Stability
        </h3>
        <p className="text-blue-400 font-semibold text-lg">
          Financial Risk Metric
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl hover:scale-105 transition">
        <h3 className="text-2xl font-bold mb-3">
          Reputation
        </h3>
        <p className="text-yellow-400 font-semibold text-lg">
          Capital Efficiency
        </p>
      </div>

    </div>

  </div>

  {/* FOOTER */}
  <div className="mt-12 mb-10 border-t border-white/10 pt-6 text-center text-gray-500 text-sm">
    © 2026 TrustGraph. All rights reserved.
  </div>  
</div>
);
}

// ================= ANALYZE =================
if (page === "analyze") {
return (
<div className="min-h-screen bg-gradient-to-br from-[#020617] to-black text-white px-10 py-10">

  {/* BACK */}
  <button
    onClick={() => setPage("home")}
    className="text-blue-400 mb-6"
  >
    ← Back
  </button>

  {/* TITLE */}
  <h1 className="text-4xl font-bold text-center mb-10">
    AI Credit Analysis
  </h1>

  {/* INPUT BOX */}
  <div className="flex justify-center mb-12">
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl flex gap-4 shadow-xl">

      <input
        className="p-3 rounded-lg text-black w-64"
        placeholder="Enter GitHub Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button
        onClick={analyzeProfile}
        className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 rounded-lg font-semibold hover:scale-105 transition"
      >
        Analyze
      </button>

    </div>
  </div>

  {/* MAIN CONTENT (LEFT + RIGHT) */}
  <div className="flex justify-center gap-20 flex-wrap items-center">

    {/* LEFT - STEPS */}
    <div className="space-y-6">

      <div className="bg-white/10 p-4 rounded-xl w-64">
        <p className="text-blue-400 font-semibold">Step 1</p>
        <p className="text-gray-300 text-sm">Fetching GitHub Data</p>
      </div>

      <div className="bg-white/10 p-4 rounded-xl w-64">
        <p className="text-purple-400 font-semibold">Step 2</p>
        <p className="text-gray-300 text-sm">Analyzing Contributions</p>
      </div>

      <div className="bg-white/10 p-4 rounded-xl w-64">
        <p className="text-green-400 font-semibold">Step 3</p>
        <p className="text-gray-300 text-sm">Calculating Trust Score</p>
      </div>

    </div>

    {/* RIGHT - GRAPH */}
    <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl w-[320px] text-center">

      <p className="text-gray-400 mb-4">
        AI Model Output
      </p>

      <div className="h-40 flex items-end gap-2 justify-center">

        <div className="w-4 bg-blue-400 h-10 rounded"></div>
        <div className="w-4 bg-blue-400 h-16 rounded"></div>
        <div className="w-4 bg-blue-400 h-24 rounded"></div>
        <div className="w-4 bg-blue-400 h-32 rounded"></div>
        <div className="w-4 bg-blue-400 h-28 rounded"></div>

      </div>

      <p className="text-xs text-gray-500 mt-4">
        Trust score prediction
      </p>

    </div>

  </div>

  {/* LOADING */}
  {loading && (
    <div className="text-center mt-10 animate-pulse">
      <p className="text-blue-400">
        🤖 Running AI Model...
      </p>
    </div>
  )}

  {/* RESULT */}
  {profile && !loading && (
    <div className="flex justify-center mt-12">

      <div className="bg-white text-black p-8 rounded-2xl shadow-2xl w-[500px]">

        <div className="flex items-center gap-4 mb-6">
          <img src={profile.avatar_url} className="w-16 h-16 rounded-full"/>
          <div>
            <h2 className="text-xl font-bold">{profile.login}</h2>
            <p className="text-gray-500 text-sm">GitHub Developer</p>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className={`text-6xl font-bold animate-pulse ${
            profile.score > 70
              ? "text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.9)]"
              : profile.score > 50
              ? "text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,0.9)]"
              : "text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.9)]"
          }`}>
            {profile.score}
          </h1>
          <p className="text-gray-500">TrustGraph Score</p>
          <p className="text-gray-500 text-sm"> Trust Score(AI-Generated) </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">

        <div className="bg-white/10 backdrop-blur-lg p-3 rounded-lg border border-white/10 hover:scale-105 transition">
          ⭐ Stars <br /> <b>{profile.stars}</b>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-3 rounded-lg border border-white/10 hover:scale-105 transition">
          🍴 Forks <br /> <b>{profile.forks}</b>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-3 rounded-lg border border-white/10 hover:scale-105 transition">
          📅 Account Age <br /> <b>{profile.age} yrs</b>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-3 rounded-lg border border-white/10 hover:scale-105 transition">
          📊 Contributions <br /> <b>{profile.contributions}</b>
        </div>

      </div>

        <div className="mt-6 flex justify-between items-center">
        <div className="mt-4 flex gap-3 justify-center">

          <button
            onClick={connectWallet}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Connect Wallet
          </button>

          <button
            onClick={() => saveScore(profile?.score)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Save Score
          </button>

        </div>
        {/* LOAN */}
        <div>
          <p className="text-gray-500 text-sm">Max Loan</p>
          <p className="text-xl font-bold text-blue-600">
            ${profile.loan}
          </p>
        </div>

        {/* RISK */}
        <div>
          <p className="text-gray-500 text-sm">Risk Level</p>

          <p className={`font-bold ${
            profile.risk === "Low" ? "text-green-500" :
            profile.risk === "Medium" ? "text-yellow-500" :
            "text-red-500"
          }`}>
            {profile.risk}
          </p>
        </div>

      </div>

      </div>

    </div>
  )}

  {/* WHY SECTION */}
  <div className="mt-16 text-center max-w-2xl mx-auto">

    <h2 className="text-2xl font-bold mb-3">
      Why This Matters
    </h2>

    <p className="text-gray-400">
      TrustGraph converts developer activity into financial trust,
      enabling access to credit without traditional collateral.
    </p>

    <p className="mt-6 text-lg font-semibold text-white">
      “Your code is your credit.”
    </p>

  </div>

</div>
);
}

  return <div>Coming soon...</div>;
}

export default App;