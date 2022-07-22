//const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const emp =[{
            "name":"karthi",
              "age":21,
            },
            {
                "name":"hari",
                "age":20,
            },
         ]

app.get('/employees',(req,res)=>{
    return res.status(200).json(emp);        
})

app.get('/employees/:name',(req,res)=>{
    let user;
    emp.forEach( (element,i) => {
        if(element.name == req.params.name){
                user = i;              
        }
    });    
    try{
        res.status(200).json(emp[user]);
    }catch(err){
        res.status(404).json({
            "message": `Entity not found for specified name: ${req.params.name}`
         }); 
    } 
})

app.post('/employees',(req,res)=>{
    let index = -1;
    emp.forEach( (element,i) => {       
        if(element.name == req.body.name){        
            index = i;  
        }
     });
 if(index == -1){
    emp.push({
        "name":req.body.name,
        "age":req.body.age}
     );    
    res.status(201).send({
            "message": "Employee created"
    });
 }else if(!req.body.name || !req.body.age ){
    return res.status(400).send({
     "message": "Validation errors",
     "errors": {
       "name": [
                "name is required",
               ],
       "age": ["age is required."],
     }
   }); 
 } 
 else{
     res.status(409).json({
              "message": "Entity already exists."
     });
 }      
})

app.put('/employees/:name',(req,res)=>{   
    let index = -1;
    emp.forEach( (element,i) => {        
        if(element.name == req.params.name){
            index = i;
        }
    })
    if(index != -1){
        emp[index] = req.body;
        res.status(200).json({
          "message": "Employee updated."
        });
    }else{ 
        res.status(404).json({
            "message": `Entity not found for specified name: ${req.params.name}`
        }); 
    }
})

app.delete('/employees/:index',(req,res)=>{
    let index = parseInt(req.params.index);   
    if(index > emp.length-1 || index < 0 ){
        return res.status(404).send({
            "message": `Entity not found for specified name: ${req.params.name}`
         })
    }
    emp.splice(index,1);
    res.status(200).send({
        "message": "Employee deleted"
    });  
})



app.listen(3000,() => {
    console.log("Server is running");
})

