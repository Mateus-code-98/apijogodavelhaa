const { compare } = require("bcryptjs")
const { sign } = require("jsonwebtoken")
const AppError = require("../errors/AppError")
const { User } = require("./../database/models/index")
const { JsonOnlyAttrs, JsonValidation } = require("../services/generalServices")

const Login = async (req, res, next) => {

    JsonValidation(req.body, ['password', 'email'])
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (user === null) throw new AppError('Error email/password incorrect', '400')

    const resu = await compare(password, user.password)
    if (resu) {
        // Gera token de acesso ao usuário logado
        const token = sign({}, process.env.JWT_SECRET, {
            subject: user.id,
            expiresIn: process.env.JWT_EXPIRESIN
        })

        // Informa apenas dados não sensíveis do usuário
        const infoUser = JsonOnlyAttrs(user, ['id', 'name', 'email', 'photograph'])

        return res.json({ user: infoUser, token })
    }

    else throw new AppError('Error email/password incorrect', '400')
}

module.exports = { Login }