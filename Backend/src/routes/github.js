
const express = require("express");
const axios = require("axios");
const GithubUser = require("../models/user.model");
const { getGitHubScore } = require('../controllers/githubController');


const router = express.Router();

router.post("/github-user", async (req, res) => {
    const { username } = req.body;
    try {
        // 1 Check if user already exists
        const existingUser = await GithubUser.findOne({ username });

        if (existingUser) {
            return res.json({
                message: "User already exists in database",
                data: existingUser
            });
        }

        // 2 Fetch GitHub user info
        const userResponse = await axios.get(
            `https://api.github.com/users/${username}`
        );

        // 3️ Fetch repositories
        const repoResponse = await axios.get(
            `https://api.github.com/users/${username}/repos`
        );

        let totalStars = 0;
        let totalForks = 0;

        repoResponse.data.forEach(repo => {
            totalStars += repo.stargazers_count;
            totalForks += repo.forks_count;
        });

         const createdDate = new Date(userResponse.data.created_at);
        const currentDate = new Date();

        const accountAge = currentDate.getFullYear() - createdDate.getFullYear();

        // fetch contributions (simple method)
        const contributionsURL = `https://github-contributions-api.jogruber.de/v4/${username}`;

        const contributionResponse = await axios.get(contributionsURL);

        let totalContributions = 0;

        contributionResponse.data.contributions.forEach(day => {
            totalContributions += day.count;
        });

        // 4 Prepare data
        const userData = {
            username: userResponse.data.login,
            avatar_url: userResponse.data.avatar_url,
            followers: userResponse.data.followers,
            public_repos: userResponse.data.public_repos,
            stars: totalStars,
            forks: totalForks,
            account_created: userResponse.data.created_at,
            account_age: accountAge,
            contributions: totalContributions
        };

        //  Save to database
        const savedUser = await GithubUser.create(userData);

        res.json({
            message: "User fetched from GitHub and saved",
            data: savedUser
        });

    } catch (error) {

        res.status(500).json({
            message: "Error fetching GitHub user",
            error: error.message
        });

    }

});


router.get("/github-user/:username", async (req, res) => {
    const { username } = req.params;
    try {
        const user = await GithubUser.findOne({ username });
        if (!user) {
            return res.status(404).json({
                message: "User not found in database"
            });
        }
        res.json({
            message: "User fetched successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user",
            error: error.message
        });
    }
});


module.exports = router;
