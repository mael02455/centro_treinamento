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
    const {aluno, personal, tipo_treino, data, horario, observacao} = req.body
      

    conexao.query(
        'insert into sessoes (aluno, personal, tipo_treino, data, horario, observacoes, nome_plano, duracao, preco, descricao) values(?,?,?,?,?,?,?,?,?,?)',
        [
            aluno,
            personal,
            tipo_treino,
            data,
            horario,
            observacao,
            
        ],
        () => {
            res.status(201).send('sessão agendada com sucesso!')
        }
        
    )
})
app.get('/centro_treinamento', (req, res) => {
    conexao.query('select * from sessoes', (err, results) => {
        if (err) {
            return res.status(500).send("erro ao buscar sessão")
        }
        res.status(200).send(results)
    })    
})
app.delete(' centro_treinamento', (req, res) => {
    const { id } = req.params;
    conexao.query('delete from ssesoes where id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send('arro ao deletar');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('sessão não encontrada')
        }
        res.status(200).send('ssesão deletada com susseso');
    });
});
app.post('/plano' , (req, res) => {
    const {nome_plano, duracao, preco, descricao} = req.body
      

    conexao.query(
        'insert into plano ( nome_plano, duracao, preco, descricao) values(?,?,?,?',
        [
            nome_plano,
            duracao,
            preco,
            descricao,
            
            
        ],
        () => {
            res.status(201).send('plano contratado com  com sucesso!')
        }
        
    )
})

app.get('/plano', (req, res )=> {
    conexao.query('select * from plano', (err, results) => {
        if (err) {
            return res.status(500).send("erro ao buscar plano")
        }
        res.status(200).send(results)
    })  
})

app.put('plano/:id',(req, res) => {
    const {id} = req.params;
    const{nome, preco } = req.body;

    const   query ='update plano set nome = ?, preco  = ? where id = ?'
    conexao.query(query,[nome, preco, id ],(err, results) =>{
        if (err) {
            return res.status(500).send('erro ao atualizar');
            if (results.affectedRows === 0) {
                return res.status(404).send('plano nao encontado');
            
            }
            res.send('produto atualizado com susseso')
        }

    })
})

app.listen(3000, () => {
    console.log("Servidor backend rodando em http://localhost:3000")
})