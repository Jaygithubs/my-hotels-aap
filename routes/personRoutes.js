const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async (req,res) => {
    
    try{
        const data= req.body;

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(response);
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }

})

router.get('/', async (req,res) => {

    try{
        const data = await Person.find();
        console.log('Data fetch');
        res.status(200).json(data);
    }
    catch(error){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

router.get('/:workType', async (req,res) =>{

    try{
        const workType = req.params.workType;  // extract the type of work
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter')
        {
            const response = await Person.find({work:workType});
            console.log("Response fetched");
            res.status(200).json({response});
        }
        else
        {
            res.status(404).json({error:'Invalid Request'+err});
        }

    }
    catch(err)
    {
        res.status(500).json({error:'Interanl server error'+err});
    }
})

router.put('/:id', async (req,res) => {
    try{
        const personId = req.params.id; // update data id
        const updatePersonData = req.body //upadate data of person

        const response = await Person.findByIdAndUpdate(personId,updatePersonData, {
            new : true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if(!response)
        {
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('Data updated');
        res.status(200).json(response);
    }
    catch(err)
    {
        res.status(500).json({error:"Internal server error"});
    }
})

router.delete("/:id",async (req,res) =>{
    try{
        const personId = req.params.id; // update data id
        const response = await Person.findByIdAndDelete(personId);

        if(!response)
        {
            return res.status(404).json({error: 'Person not found'});
        }
        console.log("Data Deleted");
        res.status(200).json({message:"Person deleted successfully"});
    }
    catch(error)
    {
        res.status(500).json({error:"Internal server error"+error});
    }
})

module.exports = router;