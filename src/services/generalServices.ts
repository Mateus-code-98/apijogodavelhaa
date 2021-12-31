import { AppError } from "../errors/AppError"

// Verifica se um objeto JSON(Obj) passado no corpo de uma requisição possui todos os atributos(Attrs) obrigatórios
export const JsonValidation = (Obj: any, Attrs: any) => {
    for (let i = 0; i < Attrs.length; i++) {
        if (!Obj[Attrs[i]]) {
            throw new AppError(`Atributo '${Attrs[i]}' obrigatório!`, 400)
        }
    }
}

// Retorna o objeto JSON(Obj) apenas com os atributos necessários
export const JsonOnlyAttrs = (Obj: any, Attrs: any) => {
    let newObj: any
    for (let i = 0; i < Attrs.length; i++) {
        let atributo = Attrs[i]
        if (Obj[atributo]) {
            newObj[atributo] = Obj[atributo]
        }
    }
    return newObj
}

// Verifica se o objeto JSON(obj) possui algum dos atríbutos únicos(Attrs) já cadastrado por outro usuário 
export const CheckOnlyAttrs = async (Model: any, Attrs: any, Obj: any) => {
    for (let i = 0; i < Attrs.length; i++) {
        let atributo = Attrs[i]

        let user = await Model.findOne({ where: { [atributo]: Obj[atributo] } })

        if (user) throw new AppError(`Atributo ${atributo} já foi cadastrado por outro usuário`, 400)
    }
}

export const generateKey = () => {
    const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']
    let key = ""
    for (let i = 0; i < 10; i++) {
        let pos = Math.floor(Math.random() * values.length)
        key += values[pos]
    }
    return key
}