const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Hello from the server")
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("listening on port http://localhost:" + PORT+"/") )