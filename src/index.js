//importing express and creating app
const express = require('express')
const app = express()
require('./db/mongoose') //importing mongoose db connection
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const port = process.env.PORT || 3000  //Creating local port for application

app.use(express.json())  //Automatically parses incoming JSON into Object format

app.use(userRouter) //creating routes for user router

app.use(taskRouter) // creating routes for task router


//Creating local port for application
app.listen(port, () => {
    console.log('App is up on port 3000')
})


//bcrypt library is used for encrypting the password from plain text format. 

const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const plainPassword = 'Happy123!'
    const hashedPassword = await bcrypt.hash(plainPassword, 8) // hash(password to be converted, number of times algorithm should run)
    // 8 is ideal iteration number for algorithm to create a easy yet secure has
    console.log(plainPassword)
    console.log(hashedPassword)

    const compare = await bcrypt.compare(plainPassword, hashedPassword) //for password comparing and matcing
    console.log(compare)
}
myFunction()


//practising JSON Webtokens
const jwtoken = require('jsonwebtoken')