const express = require('express')
const app = express()
let gitHubRouter = require('./routes/api/gitHub.router')
const cors = require("cors")

// middleware
app.use(cors());

app.use(express.json({ extended: false })); // allows to  request data in routes

app.get('/', (req, res) => {
    res.send("API running...")
});

app.use('/api/github', gitHubRouter);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("listening on port http://localhost:" + PORT+"/") )