const express = require('express')
const router = new express.Router()
const Task = require('../models/task')


//create new task
router.post('/tasks', async (req, res) => {

    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// select query for the task documents
router.get('/tasks', async (req, res) => {

    try {
        const task = await Task.find()
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }

})

//find task by ID
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            res.status(400).res("No user exists with this ID")
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

//update task

router.patch('/tasks/:id', async (req, res) => {
    const updated = Object.keys(req.body)
    const updatesAllowed = ['completed', 'category', 'task']
    const validUpdate = updated.every((update) => updatesAllowed.includes(update))
    if (!validUpdate) {
        return res.status(400).send({ error: 'This is not a valid update' })
    }
    try {
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        //: refer comments  in user Update

        const task = await Task.findById(req.params.id)
        updated.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()
        if (!task) {
            res.status(404).send()
        }
        res.status(200).send(task)

    } catch (e) {
        res.status(400).send(e)
    }
})

//delete task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(400).send()
        }
        res.status(200).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router