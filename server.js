const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your FIRST API key
const FIRST_API_KEY = '8FA23371-39E4-4CFB-B2E0-44A2EE4AD692';

app.use(express.static('public'));

app.get('/api/team-names', async (req, res) => {
    try {
        const response = await axios.get('https://ftc-api.firstinspires.org/v2.0/2024/teams', {
            headers: {
                'Authorization': `Basic ${Buffer.from(FIRST_API_KEY + ":").toString('base64')}`
            }
        });

        const teamNames = response.data.teams.map(team => team.teamNameShort).filter(Boolean);
        res.json(teamNames);
    } catch (error) {
        console.error('Error fetching team names:', error);
        res.status(500).json({ error: 'Failed to fetch team names' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
