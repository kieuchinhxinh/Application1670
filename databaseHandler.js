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

module.exports = { insertObject, checkUserRole }