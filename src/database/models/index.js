const Friendship = require('./friendships');
const User = require('./user');

User.hasMany(Friendship, { foreignKey: "userId_x", as: "friendshipsX" })
User.hasMany(Friendship, { foreignKey: "userId_o", as: "friendshipsO" })

Friendship.belongsTo(User, { foreignKey: "userId_x", as: "playerX" })
Friendship.belongsTo(User, { foreignKey: "userId_o", as: "playerO" })

module.exports = { User, Friendship }