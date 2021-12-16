const { MongoClient, ObjectId } = require('mongodb');

const URL = 'mongodb+srv://Admin:112244@cluster0.ub2al.mongodb.net/Application';
const DATABASE_NAME = "Application"

async function getDB() {
    const client = await MongoClient.connect(URL);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function insertObject(collectionName, objectToInsert) {
    const dbo = await getDB();
    const newObject = await dbo.collection(collectionName).insertOne(objectToInsert);
    console.log("Successfully created: ", newObject.insertedId.toHexString());
}
async function checkUserRole(nameI, passI) {
    const dbo = await getDB();
    const user = await dbo.collection("Users").findOne({ userName: nameI, password: passI });
    if (user == null) {
        return "-1"
    } else {
        console.log(user)
        return user.role;
    }
}
// async function insertTrainer(trainer, insertTrainer) {
//     const dbo = await getDB();
//     const newTrainer = await dbo.collection(trainer).insertOne(insertTrainer);
//     console.log("Successfully created: ", insertTrainer.insertedId.toHexString());
// }

//trainer function

// async function DeleteTrainer(username) {
//     const dbo = await getDB();
//     await dbo.collection("Trainers").deleteOne({ userName: username })
//     await dbo.collection("Users").deleteOne({ userName: username })
// }

// //end trainer function

// //trainee
// async function DeleteTrainee(id) {
//     const db = await getDB();
//     await db.collection("trainees").deleteOne({ _id: ObjectId(id) })
// }
// async function UpdateTrainee(id, name, email, age, specialty, address) {
//     const traineeID = { _id: ObjectId(id) }
//     const value = { $set: { name: name, email: email, age: age, specialty: specialty, address: address } };

//     const db = await getDB();
//     await db.collection("trainees").updateOne(traineeID, value)
// }

// // Staff function

// async function DeleteStaff(username) {
//     const dbo = await getDB();
//     await dbo.collection("Staff").deleteOne({ userName: username })
//     await dbo.collection("Users").deleteOne({ userName: username })
// }

module.exports = {
    insertObject,
    checkUserRole
}