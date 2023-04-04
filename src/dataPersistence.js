const fs = require('fs')


function createFile(){
    return new Promise((resolve, reject)=>{
        if(fs.existsSync('./users.json')){
            resolve()
        } else {
            fs.writeFile('./users.json', '', error=>{
                if(error){
                    reject('Error ao criar arquivo')
                } else {
                    console.log('Arquivo criado com sucesso')
                    resolve();
                }
            })
        }
    })
}

function getUsers(){
    let obj = []
    try {
        const users = fs.readFileSync('./users.json', 'utf-8')
        obj = JSON.parse(users)

    } catch(error){
        console.log('Erro ao ler arquivo')
    }
    return obj
}

async function saveUser(name, cpf, date){
    await createFile()
    let users = getUsers()
    let user = {
        name:name,
        cpf:cpf,
        date:date,
    }
    users.push(user)
    fs.writeFileSync('./users.json', JSON.stringify(users))

}

function getUser(cpf){
    return getUsers().filter(item=>item.cpf == cpf)[0] || {}
}




module.exports = {saveUser, getUsers, getUser}