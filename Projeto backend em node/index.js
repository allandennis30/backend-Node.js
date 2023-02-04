// confg inicial 
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose') //avisando o sistema que vou utilizar o mongoose
const app = express()



// forma de ler JSON / middlewares(Recursos utilizados entre as requisições e respostas) 
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())
/************************************************************************************* */
// rotas da Api
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// rota inical / endpoint
app.get('/', (req, res) => {
    
    // mostrar req
    res.json({message: 'Oi Express'})
})

//entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose.set("strictQuery", true);
mongoose
 .connect(
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusterapirest.bmwru37.mongodb.net/bancodaapi?retryWrites=true&w=majority`, 
 )
 .then(() =>{   // quando da certo e o que quero fazer depois de conectar com sucesso
     app.listen(3000)
     console.log('Conectamos na aplicação')
 } )
.catch((err) => console.log(err)) // quando da erro e quero exibir esse erro em algum lugar 
