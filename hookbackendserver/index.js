const express = require("express")
const dbConnection= require("./db")
const jwt= require("jsonwebtoken")
const cors = require("cors")
const app=express()

app.listen(5000,()=>{
    console.log("Server Connected 5000 ")

})

app.use(cors())
app.use(express.json())

app.get("/users",(req,res)=>{    
    dbConnection.query("select * from usertable", (err,result) => {
        if (err) throw err;
            res.send(result)
    })
})

app.get("/users/:id",(req,res)=>{   
  const id=req.params.id
 
  dbConnection.query('select * from usertable Where id= ? ',[id], (err,result) => {
      if (err) throw err;
          res.send(result)
  })
})

app.put("/change-password",(req,res)=>{
  const Username=req.body.Username
  const Password=req.body.changepassword
  dbConnection.query('Update usertable SET Password = ? Where Username= ?',[Password,Username],(err,result)=>{
    if(err) throw err;
    res.send("Password Changed Successfully")
  })
})


app.post("/register",(req,res)=>{
    const Name=req.body.Name
    const Username= req.body.Username
    const Email=req.body.Email
    const Password=req.body.Password 
    dbConnection.query('INSERT INTO usertable (Name,Username,Email,Password) VALUES (?,?,?,?)',[Name,Username,Email,Password],(err,result)=>{
        if(err){
            console.log(err)
          //   res.send(JSON.stringify({"err":"Wrong Credientials"}))
          }
          else{
            res.send("User Registered")
          }      
    })
})

app.post("/login",(req,res)=>{
    const Username=req.body.Username
    const Password = req.body.Password
    dbConnection.query('SELECT * FROM usertable where Username= ? And Password= ?',[Username,Password], (err,result) => {
        if(err){
          console.log(err)
        //   res.send(JSON.stringify({"err":"Wrong Credientials"}))
        }
        else{
          if (result.length===0){
            res.status(400)
            res.send(JSON.stringify({err:"Wrong Credientials"}))
          }else{
            const payload={Username}
            const jwtToken=jwt.sign(payload,"jwt_token");
           res.status(200);
           res.send({jwtToken,result});
          }            
        }   
    }
    );
})

