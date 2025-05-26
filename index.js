const express = require('express')
const mysql = require('mysql2')

const app = express ()

app.use(express.json());
const conexao = mysql.createConnection({ 
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'centro_treinamento'

})

app.post('/centro_treinamento' , (req, res) => {
    const sessoes = {
        aluno: req.body.aluno,
        personal: req.body.personal,
        tipo_treino: req.body.tipo_treino,
        data: req.body.data,
        horario: req.body.horario,
        observacoes: req.body.observacoes
    }

    console.log(sessoes)

    conexao.query(
        'insert into sessoes (aluno, personal, tipo_treino, data, horario, observacoesvalues(?,?,?,?,?,?)'
        [
            sessoes.aluno,
            sessoes.personal,
            sessoes.tipo_treino,
            sessoes.data,
            sessoes.horario,
            sessoes.observacoes

        ],
        () => {
            res.status(201).send('sessão agendada com sucesso!')
        }
        
    )
})
app.get('/centro_treinamento', (res, req) => {
    conexao.query('select * from sessoes', (err, results) => {
        if (err) {
            return res.status(500).send("erro ao buscar sessão")
        }
        res.status(200).sed(results)
    })    
})
app.listen(3000, ()=> {
    console.log("Servidor backend rodando em http://localhost:3000")
})