const express = require('express');
const router = express.Router();
const events = require('./../Controller/matchesController')
const seriesController = require('./../Controller/seriesController');
const Series = require('./../Models/Series');

router.get('/index', async (req, res) => {
  try {
    const recentMatches = await events.getRecentMatches();
    const savematch = await events.saveMatches();
    // console.log(recentMatches); 

    res.render('index',{ recentMatches }); 
  } catch (error) {
    console.error('Error fetching recent events:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/scoreboard', async (req, res) => {
  try {
    const recentMatches = await events.getRecentMatches();
    console.log(recentMatches); 

    // Render the scoreboard.ejs template with the data
    res.render('scoreboard',{ recentMatches }); 
  } catch (error) {
    console.error('Error fetching recent events:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/series', async (req, res) => {
  try {
    // Fetch recent events data 
    const serieslist = await seriesController.getSeriesInfo();
    console.log(serieslist); 

    // Render the series.ejs template with the data
    res.render('series',{ serieslist }); 
  } catch (error) {
    console.error('Error fetching recent events:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/teams', async (req, res) => {
  // const seriesName = req.params.name;
  const seriesName = "ICC Men’s T20 World Cup final";

  try {
    const series = await Series.findOne({ name: seriesName });

    if (!series) {
      return res.status(404).send('Series not found');
    }
    const players = await seriesController.findPlayersByTeams(series.teams);

    // Render the view with players
    res.render('teams', { seriesName, players });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


module.exports = router;
