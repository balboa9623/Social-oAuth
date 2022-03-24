// const req = require("express/lib/request");
const fetch = require('cross-fetch');
const { append } = require('express/lib/response');
require("dotenv").config() // required to read variables from .env config file. Before using, install using 'npm i dotenv'
var cookieParser = require('cookie-parser');

var express = require('express');
var app = express();
app.use(cookieParser());

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const COOKIE_SECRET = process.env.COOKIE_SECRET


const login = async (req, res) => {
    // console.log({CLIENT_ID, CLIENT_SECRET})
    try {
        const redirect_uri = "http://localhost:3000/api/github/login/github/callback"
        const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}`
        res.redirect(url)

        // after authentication we need to exchange the token that we got when the user get redirected back to the app. We implement this in the callback ...

        res.status(200);
    } catch (error) {
        res.send(`Error @ Github login controller: ${error}`);
    }

}

const getAccessToken = async (code, client_id, client_secret) => {
    const res = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client_id,
            client_secret,
            code
        })
    });
    const data = await res.text()
    const params = new URLSearchParams(data);
    return params.get("access_token");
}

const getGitHubUser = async (access_token) => {
    const req = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `bearer ${access_token}`
        }
    });
    const user = await req.json();
    return user;
}

const callback = async (req, res) => {
    try {
        const code = req.query.code;
        const token = await getAccessToken(code, CLIENT_ID, CLIENT_SECRET);
        // res.json({ token })
        const gitHubUserData = await getGitHubUser(token);
        // res.json(gitHubUserData)
        if(gitHubUserData) {
            res.cookie('gitHub_ID', gitHubUserData.id, {maxAge: 360000});
            res.cookie('gitHub_LOGIN', gitHubUserData.login, {maxAge: 360000});
            res.cookie('gitHub_TOKEN', token, {maxAge: 360000});
            

        }
        // if(gitHubUserData.login) res.send(`Hello ${gitHubUserData.login}`)
        // else res.send(`User not authorized!`)
        
    } catch (error) {
        res.send(`Error @ Github callback controller: ${error}`)
    }
}

const admin = async (req, res) => {
    try {
        if (req.session.login) {
            res.send(`Hello ${req.session.login}`)
        } else {
            res.send(`User not authorized!`)
        }
        // res.redirect('http://localhost:3000/api/github/admin')
    } catch (error) {
        res.send(`Error @ admin: ${error}`)
    }
}

module.exports = {
    login,
    callback,
    admin,
}