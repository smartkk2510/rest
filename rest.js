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

app.get('/employees/:name?',(req,res)=>{
    
    if(!req.params.name){
         return res.status(200).json(emp);
    }
    else{
         emp.forEach( (element) => {
            if(element.name == req.params.name){
               return res.status(200).json(element);
            }
         });
    }

    res.status(404).json({
        "message": `Entity not found for specified name: ${req.params.name}`
     }); 
})

app.post('/employees',(req,res)=>{
    console.log(req.body)

    

    if(!req.body.name || !req.body.age ){
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

    emp.forEach( (element,index) => {
        if(element.name == req.params.name){
           return res.status(409).json({
              "message": "Entity already exists."
          });
        }
     });

    emp.push({
        "name":req.body.name,
        "age":req.body.age}
     );
    
    res.status(201).send({

            "message": "Employee created"
    });
    
})

app.put('/employees/:name?',(req,res)=>{
    
    console.log(req.body)
    emp.forEach( (element,index) => {
        
        if(element.name == req.params.name){
            emp[index] = req.body;
            res.status(200).json({
              "message": "Employee updated."
          });
          return;
        }

    })
  
    res.status(404).json({
        "message": `Entity not found for specified name: ${req.params.name}`
     }); 

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

