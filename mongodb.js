//CRUD create read update delete

// const mongodb = require('mongodb') //install library
// const MongoClient = mongodb.MongoClient //inistializes client connection
// const ObjectId = mongodb.ObjectID

//destructuring the objects from mongodb library
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


const id = new ObjectID()


MongoClient.connect(connectionURL, { useUnifiedTopology: true }, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Not able to connect successfully')
    }
    const db = client.db(databaseName)

    db.collection('task').updateMany(
        {
            completed: false
        },
        {
            $set: {
                completed: true
            }
        }
    ).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    // db.collection('task').findOne({ _id: new ObjectID("5dc78ed03f947f12502e1bb9") }, (error, result) => {
    //     if (error) {
    //         console.log('There has been an error')
    //     }
    //     console.log(result)
    // })
    // db.collection('task').find({ completed: false }).toArray((error, result) => {
    //     if (error) {
    //         console.log('there is an error')
    //     }

    //     console.log(result)
    // })
    // db.collection('users').insertOne({
    //     name: 'Siddharth',
    //     age: 27

    // }, (error, result) => {
    //     if (error) {
    //         console.log('Document not inserted properly')
    //     }
    //     console.log(result.ops)
    // }
    // )
    // db.collection('task').insertMany([
    //     {
    //         task: 'Learn Java',
    //         completed: true
    //     },
    //     {
    //         task: 'Learn Node',
    //         completed: false
    //     },
    //     {
    //         tast: 'Learn Python',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         console.log('not inserted correctly')
    //     }

    //     console.log(result.ops)
    // })
})
