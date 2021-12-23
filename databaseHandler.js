const {
    MongoClient,
    ObjectId
} = require('mongodb');

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
    const user = await dbo.collection("Users").findOne({
        userName: nameI,
        password: passI
    });
    if (user == null) {
        return "-1"
    } else {
        console.log(user)
        return user.role;
    }
}
async function searchTrainee(searchInput) {
    const dbo = await getDB();
    const allTrainees = await dbo.collection("trainee").find({
        name: searchInput
    }).toArray();
    return allTrainees;
}
async function searchCourse(searchInput) {
    const dbo = await getDB();
    const allCourse = await dbo.collection("course").find({
        courseName: searchInput
    }).toArray();
    return allCourse;
}
async function getAllTrainees() {
    const dbo = await getDB();
    const allTrainees = await dbo.collection("trainee").find({}).toArray();
    return allTrainees;
}

async function getTraineeById(idInput) {
    const dbo = await getDB();
    return dbo.collection("trainee").findOne({
        _id: ObjectId(idInput)
    });
}
async function deleteTrainee(username) {
    const dbo = await getDB();
    await dbo.collection("trainee").deleteOne({
        name: username
    })
    await dbo.collection("Users").deleteOne({
        userName: username
    })
}
async function deleteCategory(coursecategoryname) {
    const dbo = await getDB();
    await dbo.collection("coursecategory").deleteOne({
        coursecategoryName: coursecategoryname
    })

}
//end trainer function

async function getAllCourse() {
    const dbo = await getDB();
    const allCourse = await dbo.collection("course").find({}).toArray();
    return allCourse;
}

async function getCourseById(idInput) {
    const dbo = await getDB();
    return dbo.collection("course").findOne({
        _id: ObjectId(idInput)
    });
}
async function deleteCourse(coursename) {
    const dbo = await getDB();
    await dbo.collection("course").deleteOne({
        courseName: coursename
    });
}
module.exports = {
    insertObject,
    checkUserRole,
    getDB,
    searchTrainee,
    searchCourse,
    getAllTrainees,
    getTraineeById,
    deleteCourse,
    getCourseById,
    getAllCourse,
    getCourseById,
    deleteTrainee,
    deleteCategory
}
