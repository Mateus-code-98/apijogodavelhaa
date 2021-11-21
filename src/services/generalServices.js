const AppError = require("../errors/AppError")

// Verifica se um objeto JSON(Obj) passado no corpo de uma requisição possui todos os atributos(Attrs) obrigatórios
const JsonValidation = (Obj,Attrs) => {
    for( let i = 0 ; i < Attrs.length ; i++)
    {
        if(!Obj[Attrs[i]])
        {
            throw new AppError(`Atributo '${Attrs[i]}' obrigatório!`,'400')
        }
    }
}

// Retorna o objeto JSON(Obj) apenas com os atributos necessários
const JsonOnlyAttrs = (Obj,Attrs) => {
    const newObj = {}
    for( let i = 0 ; i < Attrs.length ; i++)
    {
        let atributo = Attrs[i]
        if(Obj[atributo])
        {
            newObj[atributo] = Obj[atributo]
        }
    }
    return newObj
}

// Verifica se o objeto JSON(obj) possui algum dos atríbutos únicos(Attrs) já cadastrado por outro usuário 
const CheckOnlyAttrs = async (Model,Attrs,Obj) => {
    for(let i = 0; i < Attrs.length ; i++)
    {
        let atributo = Attrs[i]

        let user = await Model.findOne({where:{[atributo]:Obj[atributo]}})

        if(user)throw new AppError(`Atributo ${atributo} já foi cadastrado por outro usuário`,'400') 
    }
}

module.exports = { JsonValidation,JsonOnlyAttrs,CheckOnlyAttrs }