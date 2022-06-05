const express = require('express');
const app = express();
const port = process.env.PORT || 6598;

app.use(express.static('weather/build'));


app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
})