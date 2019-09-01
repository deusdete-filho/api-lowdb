<div align=center>
<h1>api-lowdb</h1>
<p>É uma API de um Sistema de Fila usando armazenamento local com uso do  <a href="http://expressjs.com/">Express</a> e <a href="https://github.com/typicode/lowdb">LowDB</a></p>
</div>

# Uso

- `POST:/createUser` - Cadastra usuário;

- `POST:/addToLine` - Coloca um usuário na última posição da fila;

- `POST:/findPosition` - Retorna a posição de um usuário a partir de seu email;

- `GET:/showLine` - Lista os usuários da fila e suas respectivas posições;

- `POST:/filterLine` - Lista os usuários filtrados a partir de um parâmetro;

- `POST:/popLine` - Tira a pessoa na primeira posição da fila;


# Instalação 
 1. `npm install`
 2. `npm start`

