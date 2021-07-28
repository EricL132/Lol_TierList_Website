const mongoose = require("mongoose");

const champSchema = new mongoose.Schema({
  rank: {
    type: String,
  },
  image: {
    type: JSON,
  },
  name: {
    type: String,
  },
  tier: {
    type: String,
  },
  lane: {
    type: String,
  },
  win_rate: {
    type: String,
  },
  pick_rate: {
    type: String,
  },
  ban_rate: {
    type: String,
  },
  games_played: {
    type: String,
  },
  rank_s:{
    type:String
  },
  patch:{
    type:String
  }
});


module.exports = mongoose.model('tierList',champSchema)