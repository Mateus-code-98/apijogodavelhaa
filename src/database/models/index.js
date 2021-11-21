const Game = require('./games');
const User = require('./user');

User.hasMany(Game, { foreignKey: "userId_x", as: "gamesX" })
User.hasMany(Game, { foreignKey: "userId_o", as: "gamesO" })
User.hasMany(Game, { foreignKey: "winnerId", as: "gamesWinner" })
User.hasMany(Game, { foreignKey: "loserId", as: "gamesLoser" })

Game.belongsTo(User, { foreignKey: "userId_x", as: "playerX" })
Game.belongsTo(User, { foreignKey: "userId_o", as: "playerO" })
Game.belongsTo(User, { foreignKey: "winnerId", as: "winner" })
Game.belongsTo(User, { foreignKey: "loserId", as: "loser" })
Game.belongsTo(User, { foreignKey: "lastPlayerId", as: "lastPlayer" })

module.exports = { User, Game }