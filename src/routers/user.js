const express = require('express')
const router = new express.Router() //creating routers from expressy
const User = require('../models/user')
const auth = require('../middleware/auth')



//user logging in

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredential(req.body.email, req.body.password) //this findBy Credential is a new method created by us -> we then define this function in user Model
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//setting post method for users create user

router.post('/users', async (req, res) => {

    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

//find all users
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

//find user by id
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//update user

router.patch('/users/:id', async (req, res) => {

    const updated = Object.keys(req.body) //to handle situtation if user tries to update fields which do not exists in User
    const updatesAllowed = ['name', 'email', 'password', 'age'] //array of fields which can be updated
    const validUpdate = updated.every((update) => updatesAllowed.includes(update)) //function checking whether updated field (keys) are valid or not
    if (!validUpdate) {
        return res.status(400).send({ error: 'not a valid update' })
    }

    try {
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) this findByIdAndUpdate
        //bypasses advanced mongoose functions such as middleware in our case, therefore commenting it and adding new code.

        const user = await User.findById(req.params.id)
        updated.forEach((updates) => {
            user[updates] = req.body[updates] // this is a dynamic update and therefore whatver user passes in body to update gets
            // updateed in 'user' according to the filed (forEach-->update - carries field for iteration)

        })
        await user.save()
        if (!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

//delete user

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(400).send()
        }
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router