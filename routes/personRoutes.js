const express = require('express');
const router = express.Router();
const Person = require('./Models/Person');

//POST route add a person
router.post('/',async(req,res)=>{
    try{
      const data = req.body;//Assuming request body contaibs the person data
       

      //create a new person document using the mongoose mmodel
      const newPerson = new Person(data);

      //save the new person to the database
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
      })

router.get('/',async(req,res)=>{
        try{
            const data = await Person.find();
            console.log('data fetched');
            res.status(200).json(data);
    
        }catch(err){
            console.log(err);
            res.status(500).json({error: 'Internal Server Error'});
        }
    })

router.get('//:workType',async(req,res)=>{
        try {
            const workType = req.params.workType;
            if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
                console.log('response fetched');
                res.status(200).json(express.response);
            }
        } catch (error) {
            res.status(500).json({error: 'Internal server error'});
        }
    })


router.put('/:id',async(req,res)=>{
    try {
        const personId = req.params.id;//extract the id from url parameter

        const updatePersonData = req.body;//update data for a person

        const response = await Person.findByIdAndUpdate(personId,updatePersonData,{
            new: true,//return the update document
            runValidators:true,//return mongoose validation
        })

        if(!response){
            return res.status(404).json({error: 'person not found'});
        }

        console.log('data updated')
        res.status(200).json(response);
    } catch (error) {
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})


router.delete('/:id',async(req,res)=>{
    try {
        const personId= req.params.id;

        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('data delete');
        res.status(200).json({message: 'person deleted successfully'});
    } catch (error) {
        console.log(error);
        res.status(505).json({error: 'Internal server error'});

    }
})
    
    module.exports = router;
