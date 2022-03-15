require("dotenv").config() // required to read variables from .env config file. Before using, install using 'npm i dotenv'

/* GitHub new app credentials
    Client ID: Iv1.2a8896ddd1345433
    Client secret: 780ba7d89830ec661bebcb1238a2950280ee8d6e
*/

// https://github.com/login/oauth/authorize?client_id=CLIENT_ID&redirect_uri=REDIRECTURL

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

const login = async (req, res) => {
    console.log({CLIENT_ID, CLIENT_SECRET})
    try {
        const redirect_uri = "http://localhost:3000/api/github/login/github/callback"
        const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect_uri}`
        res.redirect(url)

        res.status(200);
    } catch (error) {
        res.send(`Error @ Github login controller: ${error}`);
    }
    
}

const callback = async (req, res) => {
    res.status(200).send("GitHub CALLBACK works!");
}

module.exports = {
    login,
    callback,
}