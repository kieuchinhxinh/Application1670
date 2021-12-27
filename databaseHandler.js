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


async function deleteCourse(coursename) {
    const dbo = await getDB();
    await dbo.collection("course").deleteOne({
        courseName: coursename
    });
}
async function deleteStaff(username) {
    const dbo = await getDB();
    await dbo.collection("staff").deleteOne({
        name: username
    });
    await dbo.collection("Users").deleteOne({
        userName: username
    });

}
async function GetIDStaff(id) {
    const db = await getDB();
    const e = await db.collection("staff").findOne({
        _id: ObjectId(id)
    })
    return e;
}
async function GetIDTrainee(id) {
    const db = await getDB();
    const te = await db.collection("trainee").findOne({
        _id: ObjectId(id)
    })
    return te;
}
async function UpdateStaff(id, name, email, userName, address, age) {
    const staffID = {
        _id: ObjectId(id)
    }
    const value = {
        $set: UpdateStaff
    }
    const db = await getDB();
    await db.collection("staff").updateOne(value, staffID)
}
async function GetIDCourse(id) {
    const db = await getDB();
    const c = await db.collection("course").findOne({
        _id: ObjectId(id)
    })
    return c;
}
async function UpdateCourse(id, courseName, courseId, trainerId) {
    const courseID = {
        _id: ObjectId(id)
    }
    const value = {
        $set: UpdateCourse(id, courseName, courseId, trainerId)
    }
    const db = await getDB();
    await db.collection("course").updateOne(value, courseID)
}

async function UpdateTrainee(id, name, email, userName, dateofbirth, education) {
    const traineeID = {
        _id: ObjectId(id)
    }
    const value = {
        $set: UpdateTrainee
    }
    const db = await getDB();
    await db.collection("trainee").updateOne(value, traineeID)
}
module.exports = {
    insertObject,
    checkUserRole,
    getDB,
    searchCourse,
    getAllTrainees,
    deleteCourse,
    getAllCourse,

    deleteTrainee,
<<<<<<< Updated upstream
    deleteCategory,
    deleteStaff,
    UpdateStaff,
    UpdateTrainee,
    ObjectId,
    UpdateCourse,
=======
    deleteCategory,deleteStaff
>>>>>>> Stashed changes
}
