const mongoose = require("mongoose");

const githubUserSchema = new mongoose.Schema({
    username: String,
    avatar_url: {
    type: String,
    required: true
    },
    followers: Number,
    public_repos: Number,
    stars: Number,
    forks: Number,
    account_created: Date,
    account_age: Number,
    contributions: Number
});

module.exports = mongoose.model("GithubUser", githubUserSchema);