const express = require('express')
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

const lodashId = require('lodash-id')

const app = express()
app.use(bodyParser.json())

// Cria json para armazenamento
const adapter = new FileAsync('db.json')
low(adapter)
  .then(db => {

// Routes

// - createUser - Cadastra usuário;
    app.post('/createUser', (req, res) => {
    // determina o proximo id
       const countId = db.get('user').size().value()
      // let countIdUserProximo = get
    // salva os dados do usuario no json
      db.get('user').push(req.body).last().assign({ id: countId + 1}).write()
        .then(post => res.send(post))
    })

// - addToLine - Coloca um usuário na última posição da fila;
    app.post('/addToLine', (req, res) => {
      // determina o proximo id da fila
      const countIdFila = db.get('fila').size().value()

      db.get('fila').push(req.body).last().assign({ posicao : countIdFila + 1}).write()
        .then(post => res.send(post))
    })

// - findPosition - Retorna a posição de um usuário a partir de seu email;
      app.post('/findPosition', (req, res) => {
    // busca usuario
      const user = db.get('user').find({email: req.body.email}).value()
    // busca posicao do usuário na fila
       const fila = db.get('fila').find({user_id: user.id}).value()
    // mapea a posicao
      const posicaoFila = fila.posicao
      res.send({ posicao: posicaoFila });
      })

// - showLine - Lista os usuários da fila e suas respectivas posições;
        app.get('/showLine', (req, res) => {
          // seleciona os usuario na fila e faz join com os usuarios
          const userIds = db.get('fila').map('user_id').value()
          const users = db.get('user').filter(user => userIds.includes(user.id)).value()
          res.send(users)
        })

// - filterLine - Lista os usuários filtrados a partir de um parâmetro;

      app.post('/filterLine', (req, res) => {
        const genero = req.body.genero

        const userIds = db.get('fila').map('user_id').value()
        const users = db.get('user').filter(user => userIds.includes(user.id)).filter({genero: genero}).value()

        res.send(users)
      })


// - `/popLine` - Tira a pessoa na primeira posição da fila;

        app.get('/popLine', (req, res) => {
          const posicaoFila = db.get('fila[0].posicao').value()

          db.get('fila').remove({posicao: posicaoFila}).write()
          res.send({ posicao: posicaoFila })

        })

    // Set db default values
    return db.defaults({ user: [], fila:[], countIdUserProximo: 0, countIdFilaProximo: 0}).write()
  })
  .then(() => {
    app.listen(3000, () => console.log('servidor rodando na porta 3000'))
  })