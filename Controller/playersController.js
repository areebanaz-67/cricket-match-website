const Player = require('./../Models/Player');

exports.getPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate('team');
    res.render('teams', { players: players });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.getPlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate('team');
    res.render('player', { player: player });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
