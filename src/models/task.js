
const mongoose = require('mongoose')
const validate = require('validator')

const Tasks = mongoose.model('tasks', {
    task: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 4) {
                throw new Error('Task is not well described')
            }
        }
    },
    completed: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        trim: true,
        default: 'Software Learning',

    }
})

module.exports = Tasks