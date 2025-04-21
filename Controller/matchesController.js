const Match = require('./../Models/Match');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({path:'././config.env'});
const API = process.env.API_KEY;
// console.log(API);
const db = require('./../config/db');

exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find().populate('teams');
    res.render('scoreboard', { matches: matches });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


exports.getRecentMatches = async(req,res)=>{
  try {
    const apiEndpoint = `https://api.cricapi.com/v1/matches?apikey=${API}`;
    // console.log(API);
    // console.log(apiEndpoint);

    const response = await axios.get(apiEndpoint);
    const recentMatches = response.data.data.slice(0,4);
    // console.log(recentMatches);
    return recentMatches; 
  } catch (error) {
    console.error('Error fetching recent matches:', error);
    throw error; 
  }
}

exports.geMatchesData = async (req,res) => {
  try {
    const apiEndpoint = `https://api.cricapi.com/v1/match_info?apikey=${API_KEY}&id=3fbecb72-9884-47c4-8855-ea88db0a2816`;
    const seriesData = await apiService.fetchDataFromApi(apiEndpoint); 
    for (const series of seriesData) { 
      const newSeries = new Series({
        apiIdGuid: series.apiIdGuid,
        name: series.name, 
        startDate: series.startDate, 
        endDate: series.endDate,
        odiNumber: series.odiNumber,
        t20Number: series.t20Number,
        testNumber: series.testNumber,
        squadsNumber: series.squadsNumber,
        matchesNumber: series.matchesNumber,
      });
      await newSeries.save();
      return seriesData;
    }

  } catch (error) {
    console.error('Error fetching or saving series data:', error); 
  }
};

exports.saveMatches = async () => {
  try {
    const apiEndpoint = `https://api.cricapi.com/v1/matches?apikey=${API}`;
    const response = await axios.get(apiEndpoint);

    // const matches= await apiService.fetchDataFromApi(apiEndpoint); 
    const recentMatches = response.data.data;
    // Save each match in the database
    for (const match of recentMatches) {
      // Check if the match already exists in the database
      const existingMatch = await Match.findOne({ id: match.id });
      if (!existingMatch) {
        const newMatch = new Match(match);
        await newMatch.save(); // Save the match to MongoDB
        console.log(`Saved match: ${match.name}`);
      } else {
        console.log(`Match already exists: ${match.name}`);
      }
    }

    console.log('All matches processed.');
  } catch (error) {
    console.error('Error saving matches:', error.message);
  }
  
};
