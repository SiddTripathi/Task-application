require('./src/db/mongoose')
const Task = require('./src/models/task')


// Task.findByIdAndRemove('5dcf2883c8d582203c3687ae').then((task) => {
//     console.log(task)
//     return Task.countDocuments()
// }).then(() => {
//     Task.insertMany([{
//         task: 'learn Mocha/Chai',
//         completed: false
//     }]).then((task) => {
//         console.log(task)
//         return Task.countDocuments()
//     }).then((result) => {
//         console.log(result)
//     })
// }).catch((e) => {
//     console.log(e)
// })

const updateAndCount = async (id, completed) => {
    const task = await Task.findByIdAndRemove(id)
    const count = await Task.countDocuments({ completed: false })
    return count
}

updateAndCount('5dcb3fe362285146c8d70c2c').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})