// importing app 
const app = require('./app')
const port = process.env.PORT
app.listen(port, () =>{
    console.log(`Server Running on Port ${port}`);
})