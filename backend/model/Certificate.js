const mongoose = require('mongoose');

// {
//     "_id": "5d713995b721c3bb38c1f5d0",
//     "user": "5d7a514b5d2c12c7449be045",
//     "name": "Devworks Bootcamp",
//     "matricNo": "Devworks Bootcamp",
//     "degree": "Devworks Bootcamp",
//     "grade": "Devworks Bootcamp",
//     "department": "Devworks Bootcamp",

//     "certificateStatus": "Devworks Bootcamp",
//     "verificationId": "Devworks Bootcamp",
//     "fileHash": "Devworks Bootcamp",

//     "transactionHash": "Devworks Bootcamp",
   

//     "fileName": "filename",
//     "fileLocation": "filename",

//     "created_at": "Devworks Bootcamp",
//     "updatedAt": "Devworks Bootcamp",
//     "deleted_at": "Devworks Bootcamp"
// }

const CertifiacteSchema = new mongoose.Schema({

     // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    matricNo: {
        type: String,
        required: [true, 'Please add a Matric No'],
        maxlength: [50, 'Matric NO can not be more than 50 characters']
    },
    lastname: {
        type: String,
        required: [true, 'Please add a Matric No'],
        maxlength: [50, 'Matric NO can not be more than 50 characters']
    },
    firstname: {
        type: String,
        required: [true, 'Please add a Matric No'],
        maxlength: [50, 'Matric NO can not be more than 50 characters']
    },
    middlename: {
        type: String,
        required: [true, 'Please add a Matric No'],
        maxlength: [50, 'Matric NO can not be more than 50 characters']
    },
    degreeType: {
        type: String,
        required: [true, 'Please add a classofDegree'],
        maxlength: [50, 'Degree can not be more than 50 characters']
    },
    degreeAwarded: {
        type: String,
        required: [true, 'Please add a classofDegree'],
        maxlength: [50, 'Degree can not be more than 50 characters']
    },
    classOfDegree: {
        type: String,
        required: [true, 'Please add a Department'],
        maxlength: [50, 'Department can not be more than 50 characters']
    },
    courseName: {
        type: String,
        required: [true, 'Please add a Department'],
        maxlength: [50, 'Department can not be more than 50 characters']
    },
    department: {
        type: String,
        required: [true, 'Please add a Department'],
        maxlength: [50, 'Department can not be more than 50 characters']
    },
    yearOfCompletion: {
        type: String,
        required: [true, 'Please add a Department'],
        maxlength: [50, 'Department can not be more than 50 characters']
    },

    certificateStatus: {
        type: String,
        required: true,
        enum: [
          'Valid',
          'Revoked',
        ]
    },
    certificateId: {
        type: String,
        // required: [true, 'Please add a Department'],
        // maxlength: [50, 'Department can not be more than 50 characters']
    },

    fileHash: {
        type: String,
        // required: [true, 'Please add a Department'],
        // maxlength: [50, 'Department can not be more than 50 characters']
    },
    
    file: {
        type: String,
        // required: [true, 'Please add a Department'],
        // maxlength: [50, 'Department can not be more than 50 characters']
    },
    
},
// {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }

);

module.exports = mongoose.model('Certificate', CertifiacteSchema);