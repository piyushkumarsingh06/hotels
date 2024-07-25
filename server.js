// var fs = require('fs');
// var os = require('os');


// var user = os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile('greeting.txt','Hi '+ user.username+ '!\n',()=>{
//     console.log("file is ceated");
// })


// const notes = require('./node.js');

// console.log("server file is availanle");

// var age = notes.age;


// var result = notes.addNumber(age+18, 10);
// console.log(age);
// console.log('result is now'+result);

// const object = {
//     name:"piyush",
//     age:56
// }

// const json = JSON.stringify(object);
// console.log(json);

// console.log(typeof json);


const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// const Person = require('./Models/Person');
// const menuItem = require('./Models/menuItem');


//Middleware function
// const logrequest =(req,res,next) =>{
//     console.log(`${new Date().toLocalString()} Request made to : ${req.originalUrl}`);
//     next();
// }

app.get('/',function(req,res){
    res.send('Welcome to my hotel, how i can help you')
})

app.post('/person',async(req,res)=>{
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


app.get('/person',async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})



app.post('/menu',async(req,res)=>{
    try {
        const data = req.body;

        const Menu = new menuItem(data);

        const response = await Menu.save();
        console.log('data saved');
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server Error'});
    }
})

app.get('/menu',async(req,res)=>{
    try {
        const data = await menuItem.find();
        console.log('data fetched');
        res.status(200).json(data);

    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server Error'});
    }
})


app.get('/person/:workType',async(req,res)=>{
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

//Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/person',personRoutes);
app.use('/menuItem',menuItemRoutes);

app.listen(PORT, ()=>{
    console.log('Listening on port 3000');
});