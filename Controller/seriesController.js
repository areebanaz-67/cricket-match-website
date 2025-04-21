const Series = require('./../Models/Series');
const Players = require('./../Models/Player');
const apiService = require('../services/apiService');
const axios = require('axios') 
const dotenv = require('dotenv');
dotenv.config({path:'././config.env'});
const API = process.env.API_KEY;

exports.getSeriesInfo = async(req,res)=>{
  try {
    const apiEndpoint = `https://api.cricapi.com/v1/series?apikey=${API}&offset=0`; 
    const response = await axios.get(apiEndpoint);
    const serieslist = response.data.data.slice(0, 4); 
    console.log(serieslist);
    return serieslist; 
  } catch (error) {
    console.error('Error fetching recent matches:', error);
    throw error; 
  }
}

exports.getSeriesData = async (req,res) => {
  try {
    const apiEndpoint = `https://api.cricapi.com/v1/series?apikey=${API}&offset=0`;
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

exports.findSeriesTeams = (seriesName) => {
  const foundSeries = Series.find(series => series.name === seriesName);
  if (foundSeries) {
    return foundSeries.teams;
  } else {
    return null;
  }
};

exports.findPlayersByTeams = async (teams) => {
  try {
    // Fetch players for each team in the given list
    const playersByTeam = await Promise.all(
      teams.map(async (teamName) => {
        // Find players associated with the team
        const players = await Players.find({ team: teamName }).populate('team');
        return { team: teamName, players }; // Return the team and its players
      })
    );

    return playersByTeam;
  } catch (error) {
    console.error('Error fetching players:', error);
    throw error; 
  }
};


