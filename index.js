const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const queryString = require('query-string');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = 'https://od-api.oxforddictionaries.com/api/v1';
const APP_ID = '6f6b02bb';
const APP_KEY = 'c9992070793f4cd646520c081fc8fb28';

app.use(bodyParser.json());
app.use(cors());

app.get('/words/:word', async (req, res) => {
    const { word } = req.params;

    const entries = await fetch(`${BASE_URL}/entries/en/${word}`, {
        method: 'GET',
        headers: {
            app_id: APP_ID,
            app_key: APP_KEY
        }
    });

    if (entries.status >= 400) {
        return res.sendStatus(500);
    }

    const data = await entries.json();
    return res.send(data.results);
});

app.listen(PORT);
console.log(`App listening ${PORT}`);