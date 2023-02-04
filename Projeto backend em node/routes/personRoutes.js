const router = require('express').Router()
const Person = require('../models/Person')
const mongoose = require("mongoose")
// rotas da api

/********************* Create - Criação de dados*****************************************/
router.post('/', async (req,res) => {
    // req.body
    const {name, email, password, phone} = req.body
    
    if(!email || !name || !password){
        res.status(422).json({error: 'Verifique se voce preencheu todos os campos'})
        return
    }

    const person = {
        name,
        email,
        password,
        phone
    } 
    
    try {
        await Person.create(person)

        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'})
        return
    }catch(error){
        res.status(500).json({error: error})
    }

})
/****************************************************************************************** */
/*********************************Read - Leitura de dados************************************/

router.get('/', async(req,res) => {
    try{
        const people = await Person.find()
        res.status(200).json(people)
    }catch (error){
        res.status(500).json({ error: error})
    }
})
/***************************************************************************************** */
/*******************************encontra pessoa pelo id********************************** */
router.get('/:id', async(req,res)=> {
    // extrair dado da requisição, pela url = req.parms
    const id = req.params.id
    try{
        const person = await Person.findOne({_id: id})
        if(!person){
            res.status(422).json({message: 'O usuário não foi encontrado'})
            return
        }
        res.status(200).json(person)
    }catch(error){
        res.status(500).json({error: error})
    }
})
/******************************************************************************************** */

/*************************Update - Atualização de dados (PUT, PATCH"atualização parcial")********* */
router.patch('/:id', async (req, res) => {
    
    const id = req.params.id
    const {name, email, password, phone} = req.body

    const person = {
        name,
        email,
        password,
        phone
    } 

    try {
        // Verifica se o ID passado na rota está no formato correto de ObjectId
        const objectId = mongoose.Types.ObjectId.isValid(id)
        if (!objectId) {
            res.status(422).json({message: 'O ID passado não é válido'})
            return
        }

        const updatePerson = await Person.updateOne({_id: id }, person)
        
        if(updatePerson.matchedCount === 0){
            res.status(422).json({message: 'O usuário não foi encontrado'})
            return   
        }

        res.status(200).json(person)

    } catch(error) {
        console.error(error)
        res.status(500).json({error: error})
    }
})

// Delete - deletar dados
router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const person = await Person.findOne({ _id: mongoose.Types.ObjectId(id) });
        
        if (!person) {
            return res.status(422).json({ message: 'O usuário não foi encontrado' });
        }
        
        await person.remove();
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});
module.exports = router


