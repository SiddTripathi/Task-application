const { MongoClient, ObjectID } = require("mongodb")

connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'practice'

MongoClient.connect(connectionUrl, { useUnifiedTopology: true }, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        console.log('Connection is not there')
    }
    const database = client.db(dbName)

    database.collection('cars').deleteMany(
        {
            brand: 'Toyota'
        }
    ).then((results) => {
        console.log(results)
    }).catch((error) => {
        console.log(error)
    })
    // database.collection('cars').find({ brand: 'Honda' }).toArray((error, result) => {
    //     if (error) {
    //         console.log('Some error occured')
    //     }
    //     console.log(result)
    // })

    // database.collection('cars').find({ brand: 'Toyota' }).count((error, result) => {
    //     if (error) {
    //         console.log('no data exist')
    //     }
    //     console.log(result)
    // })
    // database.collection('cars').insertOne({
    //     name: 'Civic',
    //     brand: 'Honda',
    //     country: 'Japan'
    // })

    // database.collection('cars').insertMany(
    //     [{
    //         name: 'Corolla',
    //         brand: 'Toyota',
    //         country: 'South Korea'

    //     },
    //     {
    //         name: 'Fortuner',
    //         brand: 'Toyota',
    //         country: 'South Korea'

    //     },
    //     {
    //         name: 'Jazz',
    //         brand: 'Honda',
    //         country: 'Japan',
    //     },
    //     ]
    // )
})