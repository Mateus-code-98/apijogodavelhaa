import { Friendship } from './friendships'
import { User } from './user'

User.hasMany(Friendship, { foreignKey: "userId_x", as: "friendshipsX" })
User.hasMany(Friendship, { foreignKey: "userId_o", as: "friendshipsO" })

Friendship.belongsTo(User, { foreignKey: "userId_x", as: "playerX" })
Friendship.belongsTo(User, { foreignKey: "userId_o", as: "playerO" })

export { User, Friendship }