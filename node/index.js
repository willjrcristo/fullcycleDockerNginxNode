const express = require("express")
const bodyParser = require("body-parser")
const mysql = require("mysql")
const app = new express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const config = {
    host: process.env.DBHOST || 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

console.log( JSON.stringify( config, null, 2 ))

function getConn(){
    const connection = mysql.createConnection(config)

    connection.connect()
    
    return connection;
}

function query(sql){

    const conn = getConn();

    return new Promise((resolve, reject) => {
        conn.query(sql, (error, results, fields) => {
            if (error) return reject(error);

            return resolve({ results, fields });
        })
    })
    .finally(() => {
        conn.end()
    })
}

const insert = (name) =>  {
    const sql = `insert into people (name) values ('${name}')`
    query(sql);
}

const header = '<h1>Full Cycle Rocks!</h1>';

app.post('/add', (req, res) => {
    const { body } = req;
    const { name } = body;
    insert(name);
    res.redirect('/', 307) 
})

const root = async (req, res) =>{
    const response = [];

    response.push(header)

    const sql = 'select * from people';

    try {
        const data = await query(sql);

        const { results } = data;
    
        response.push(`<h2>Registros da tabela People:</h2><br>`)
        for ( const row of results )
            response.push(`<li>${row.name}</li><br>`);
    
    }
    catch (erro){
        console.error(erro)
    }

    response.push(`
        <br>
        <form action='/add' method='POST'>
            <input type='text' name='name' id='name'/>
            <button type='submit'>Cadastrar</button>
        </form>
        <br>
    `)

    res.send(response.join('\n'))
}

app.get('/', root)
app.post('/', root)

app.listen(port, function (){
    console.log(`Rodando na porta ${port}`)
}) 