const mongoose = require("mongoose");

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

const SwepSchema = new mongoose.Schema(
  {
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    matricNo: {
      type: String,
      // required: [true, "Please add a Matric No"],
      // maxlength: [50, "Matric NO can not be more than 50 characters"],
    },
  }

  // {
  //     toJSON: { virtuals: true },
  //     toObject: { virtuals: true }
  //   }
);

module.exports = mongoose.model("Swep", SwepSchema);
