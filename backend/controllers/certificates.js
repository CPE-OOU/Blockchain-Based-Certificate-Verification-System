const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const CertificateModel = require("../model/Certificate");
const SwepModel = require("../model/Swep");

const certificateTemplate = require("./certificateTemplate/certificateTemplate");
const swepCertificateTemplate = require("./certificateTemplate/swepCertificateTemplate");
const instructorTemplate = require("./certificateTemplate/instructorTemplate");
// const { default: puppeteer } = require("puppeteer");

const fs = require("fs");
const crypto = require("crypto");
const Web3 = require("web3");
const ContractKit = require("@celo/contractkit");

const {
  signAndSendTransaction,
  getBalances,
  getTransactionDetails,
} = require("./celoOperations");

const User = require("../model/User");
const Certificate = require("../model/Certificate");

const QRCode = require("qrcode");

// require('dotenv').config({path: '.env'})

// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const crypto = require('crypto');
// const Web3 = require('web3');
// const CertificateContract = require('./CertificateContract'); // assuming you have a smart contract set up

// @desc    Get all certificates
// @route   Get /api/v1/certificates
// @access  Public

// exports.getCertificates = (req, res, next) => {
//     res
//         .status(200)
//         .json({success:true, msg: 'get all certificates'});
// }

exports.getCertificates = asyncHandler(async (req, res, next) => {
  const Certificates = await CertificateModel.find();

  res
    .status(200)
    .json({ success: true, count: Certificates.length, data: Certificates });
});

// @desc    Get all certificate
// @route   Get /api/v1/certificates/:id
// @access  Public
exports.getCertificate = asyncHandler(async (req, res, next) => {
  const Certificate = await CertificateModel.findById(req.params.id);
  if (!Certificate) {
    return next(
      new ErrorResponse(
        `Certificate not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: Certificate });
});

exports.getCertificateByUserId = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (user) {
    const certificate = await Certificate.find({
      matricNo: user.matricNo,
    });

    res.status(200).json({ success: true, data: certificate });
  }

  res.status(200).json({ success: false, data: true });
});

exports.getCertificatebyMatricNo = asyncHandler(async (req, res, next) => {
  const Certificate = await CertificateModel.findOne({
    matricNo: req.params.matricNo,
  });
  if (!Certificate) {
    return next(
      new ErrorResponse(
        `Certificate not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: Certificate });
});

exports.verifyCertificatebyCertId = asyncHandler(async (req, res, next) => {
  const Certificate = await CertificateModel.findOne({
    certificateId: req.params.certificateId,
  });
  if (!Certificate) {
    return next(
      new ErrorResponse(
        `Certificate not found with certificate id of ${req.params.certificateId}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: Certificate });
});

exports.verifyCertificatebyCertHash = asyncHandler(async (req, res, next) => {
  const Certificate = await CertificateModel.findOne({
    fileHash: req.params.fileHash,
  });
  if (!Certificate) {
    return next(
      new ErrorResponse(
        `Certificate with hash of ${req.params.fileHash} not`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: Certificate });
});

// exports.verifyCertificatebyHash = asyncHandler(async (req, res, next) => {
//   const Certificate = await CertificateModel.findById(req.params.id);
//   if (!Certificate) {
//     return next(
//       new ErrorResponse(
//         `Certificate not found with id of ${req.params.id}`,
//         404
//       )
//     );
//   }
//   res.status(200).json({ success: true, data: Certificate });
// });

// @desc    Create new certificate
// @route   POST /api/v1/certificates/:id
// @access  Private
// exports.createCertificate = asyncHandler(async (req, res, next) => {
//   //Get user using teh id in the JWT
//   const user = await User.findById(req.user.id);

//   if (!user) {
//     res.status(401);
//     throw new Error("User not found");
//   }

//   if (user.role !== "admin") {
//     res.status(403);
//     throw new Error("User is not an admin");
//   }

//   try {
//     // Generate certificate ID (this is just an example, use your own method)
//     const certificateId = Date.now();

//     // Create PDF from HTML template
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     // Load your HTML template and insert form data
//     const html = certificateTemplate({ ...req.body, certificateId });

//     await page.setContent(html);
//     await page.waitForNetworkIdle();
//     const pdfPath = `./certifications/${certificateId}.pdf`;
//     await page.pdf({ path: pdfPath, printBackground: true, format: "A4" });

//     // await page.setContent(html);

//     // const pdfPath = `./certifications/${certificateId}.pdf`;
//     // await page.pdf({ path: pdfPath, format: 'A4' });

//     // await browser.close();

//     // Generate file hash
//     const fileData = fs.readFileSync(pdfPath);
//     const hash = crypto.createHash("sha256");
//     hash.update(fileData);
//     const fileHash = hash.digest("hex");

//     // res.status(201).json({
//     //   success: true,
//     //   data: true,
//     // });

//     // This is the first Account Created
//     //Query database for account details using the loggedin user Id
//     const senderAccount = {
//       address: "0xD263C466E6aA620DF49495A6B6A4a8e49496F06C",
//       privateKey:
//         "0x18424a8c4a250461b3a6b43b9619f6f32ce3dddc70e68746bf6fa25fa86c2b64",
//     };
//     // let account = firstAccount;

//     //Query database of user Id to be awarded database and extract these information
//     // Second Account Created
//     const recieverAccount = {
//       address: "0x22FF4c57Eec278D37a1D9B95E4232F699Cdc2184",
//       privateKey:
//         "0xb390bdd0b41772049126e36fd0478d60332242c22245037da06a7d534e789afd",
//     };

//     // Sign a transaction and get transaction details
//     signAndSendTransaction(
//       senderAccount.privateKey,
//       senderAccount.address,
//       recieverAccount.address
//     )
//       .then((signedTx) => {
//         // console.log('Signed transaction:', signedTx);

//         getTransactionDetails(signedTx.transactionHash)
//           .then((details) => {
//             // console.log('Transaction details:', details);
//             // Store the details in your database here
//           })
//           .catch((error) => {
//             console.error("Error getting transaction details:", error);
//           });
//       })
//       .catch((error) => {
//         console.error("Error signing and sending transaction:", error);
//       });

//     const {
//       matricNo,
//       lastname,
//       firstname,
//       middlename,
//       degreeType,
//       degreeAwarded,
//       classOfDegree,
//       courseName,
//       department,
//       yearOfCompletion,
//       certificateStatus,
//       file,
//     } = req.body;

//     const Certificate = await CertificateModel.create({
//       matricNo,
//       lastname,
//       firstname,
//       middlename,
//       degreeType,
//       degreeAwarded,
//       classOfDegree,
//       courseName,
//       department,
//       yearOfCompletion,
//       certificateStatus,
//       certificateId,
//       fileHash,
//       file,
//     });

//     res.status(201).json({
//       success: true,
//       data: {
//         certificateId,
//         pdfPath,
//         fileHash,
//         // ... more data if needed ...
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// });

exports.createCertificate = asyncHandler(async (req, res, next) => {
  //Get user using teh id in the JWT
  const user = await User.findById(req.user.id);

  if (!user || user.role !== "admin") {
    return res.status(user ? 403 : 401).json({
      success: false,
      message: user ? "User is not an admin" : "User not found",
    });
  }

  const {
    matricNo,
    lastname,
    firstname,
    middlename,
    degreeType,
    degreeAwarded,
    classOfDegree,
    courseName,
    department,
    yearOfCompletion,
  } = req.body;
  const certificateStatus = "Valid";

  const existingCertificate = await CertificateModel.findOne({ matricNo });

  if (existingCertificate) {
    return res.status(400).json({
      success: false,
      message: "Matric No. has been issued certificate already !!",
    });
  }

  try {
    const certificateId = Date.now();
    const pdfPath = `./certifications/${certificateId}.pdf`;
    const file = pdfPath;

    // Generate the PDF document
    // const doc = await certificateTemplate({
    //   ...req.body,
    //   certificateId,
    //   pdfPath,
    // });
    const doc = await swepCertificateTemplate({
      ...req.body,
      certificateId,
      pdfPath,
    });

    // Write the PDF document to a file
    await new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(pdfPath);
      doc.pipe(writeStream);
      doc.end();
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    // Read the file data and produce the hash
    const fileData = fs.readFileSync(pdfPath);
    const hash = crypto.createHash("sha256");
    hash.update(fileData);
    const fileHash = hash.digest("hex");

    // const senderAccount = {
    //   address: "0xD263C466E6aA620DF49495A6B6A4a8e49496F06C",
    //   privateKey:
    //     "0x18424a8c4a250461b3a6b43b9619f6f32ce3dddc70e68746bf6fa25fa86c2b64",
    // };

    // const recieverAccount = {
    //   address: "0x22FF4c57Eec278D37a1D9B95E4232F699Cdc2184",
    //   privateKey:
    //     "0xb390bdd0b41772049126e36fd0478d60332242c22245037da06a7d534e789afd",
    // };

    // const signedTx = await signAndSendTransaction(
    //   senderAccount.privateKey,
    //   senderAccount.address,
    //   recieverAccount.address
    // );

    // const details = await getTransactionDetails(signedTx.transactionHash);

    const Certificate = await CertificateModel.create({
      matricNo,
      lastname,
      firstname,
      middlename,
      degreeType,
      degreeAwarded,
      classOfDegree,
      courseName,
      department,
      yearOfCompletion,
      certificateStatus,
      certificateId,
      fileHash,
      file,
    });

    res.status(201).json({
      success: true,
      data: {
        certificateId,
        pdfPath,
        fileHash,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc    Update all certificate
// @route   PUT /api/v1/certificates/:id
// @access  Private
exports.updateCertificate = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    certificateStatus: req.body.certificateStatus,
  };
  const Certificate = await CertificateModel.findOneAndUpdate(
    { matricNo: req.params.matricNo },
    fieldsToUpdate,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!Certificate) {
    return next(
      new ErrorResponse(
        `Certificate not found with id of ${req.params.id}`,
        404
      )
    );
  }
  return res.status(200).json({ success: true, data: Certificate });
});

// @desc    Delete all certificate
// @route   PUT /api/v1/certificates/:id
// @access  Private

// exports.deleteCertificate = asyncHandler(async (req, res, next) => {
//     const Certificate = await CertificateModel.findByIdAndDelete(req.params.id);

//     if(!Certificate){
//         return next(
//             new ErrorResponse(`Certificate not found with id of ${req.params.id}`, 404)
//         );
//     }
//     return res.status(200).json({ success: true, data: {} });
// });

exports.web3 = asyncHandler(async (req, res, next) => {
  const Web3 = require("web3");
  var web3 = new Web3();

  account = web3.eth.accounts.create();

  res.status(200).json({ success: true, data: account });
});

// ******************* SWEP Cert ******************** //
// ******************* SWEP Cert ******************** //
// ******************* SWEP Cert ******************** //

exports.getSwep = asyncHandler(async (req, res, next) => {
  const Swep = await SwepModel.find();
  // const Certificates = await CertificateModel.find();
  res.status(200).json({ success: true, count: Swep.length, data: Swep });
});

exports.createSwepCertificate = asyncHandler(async (req, res, next) => {
  const matricNo = req.body.matricNo.trimEnd();
  const lastname = req.body.lastname.trimEnd();
  const firstname = req.body.firstname.trimEnd();
  const middlename = req.body.middlename.trimEnd();
  const track = req.body.track.trimEnd();

  const recieveAt = req.body.email.trimEnd();

  const certificateType = "Swep";
  const certificateStatus = "Valid";
  const formattedMatricNo = matricNo.trim().toLowerCase();

  // Check if matricNo is eligible
  const eligibleMatricNo = await SwepModel.findOne({
    matricNo: { $regex: new RegExp(`^${formattedMatricNo}$`, "i") },
  });
  if (!eligibleMatricNo) {
    return res.status(400).json({
      success: false,
      message: "You are not eligible for this certificate.",
    });
  }

  // Check if certificate already exists
  const existingCertificate = await CertificateModel.findOne({
    matricNo: { $regex: new RegExp(`^${formattedMatricNo}$`, "i") },
  });
  if (existingCertificate) {
    return res.status(400).json({
      success: false,
      message:
        " Your details is undergoing check. Certificate will be sent to your email when approved !!",
    });
  }

  try {
    const certificateId = "SWEP-" + Date.now();
    const pdfPath = `./certifications/${lastname}-${firstname}-${middlename}.pdf`;
    const file = pdfPath;

    const trimmedBody = {
      matricNo: req.body.matricNo.trimEnd(),
      lastname: req.body.lastname.trimEnd(),
      firstname: req.body.firstname.trimEnd(),
      middlename: req.body.middlename.trimEnd(),
      track: req.body.track.trimEnd(),
      email: req.body.email.trimEnd(),
    };

    const doc = await swepCertificateTemplate({
      ...trimmedBody,
      certificateId,
      pdfPath,
    });

    // Write the PDF document to a file
    await new Promise((resolve, reject) => {
      const writeStream = fs.createWriteStream(pdfPath);
      doc.pipe(writeStream);
      doc.end();
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    // Read the file data and produce the hash
    const fileData = fs.readFileSync(pdfPath);
    const hash = crypto.createHash("sha256");
    hash.update(fileData);
    const fileHash = hash.digest("hex");

    /////////////// Add to CELO ////////////////////

    // const senderAccount = {
    //   address: "0xD263C466E6aA620DF49495A6B6A4a8e49496F06C",
    //   privateKey:
    //     "0x18424a8c4a250461b3a6b43b9619f6f32ce3dddc70e68746bf6fa25fa86c2b64",
    // };

    // const recieverAccount = {
    //   address: "0x22FF4c57Eec278D37a1D9B95E4232F699Cdc2184",
    //   privateKey:
    //     "0xb390bdd0b41772049126e36fd0478d60332242c22245037da06a7d534e789afd",
    // };

    // const signedTx = await signAndSendTransaction(
    //   senderAccount.privateKey,
    //   senderAccount.address,
    //   recieverAccount.address
    // );

    // const details = await getTransactionDetails(signedTx.transactionHash);

    /////////////// Add to CELO ////////////////////

    const Certificate = await CertificateModel.create({
      matricNo,
      lastname,
      firstname,
      middlename,
      certificateStatus,
      certificateType,
      track,
      recieveAt,
      certificateId,
      fileHash,
      file,
    });

    res.status(201).json({
      success: true,
      data: {
        certificateId,
        pdfPath,
        fileHash,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ******************* End SWEP Cert ******************* //
// ******************* End SWEP Cert ******************* //
// ******************* End SWEP Cert ******************* //

// Instructor SWEP Cert ****************************** //
// Instructor SWEP Cert ****************************** //
// Instructor SWEP Cert ****************************** //
// Instructor SWEP Cert ****************************** //

exports.createInstructorSwepCertificate = asyncHandler(
  async (req, res, next) => {
    const { matricNo, lastname, firstname, middlename, track } = req.body;

    const recieveAt = req.body.email;
    const certificateType = "Swep Instructors";
    const certificateStatus = "Valid";
    // const formattedMatricNo = matricNo.trim().toLowerCase();

    // // Check if matricNo is eligible
    // const eligibleMatricNo = await SwepModel.findOne({
    //   matricNo: { $regex: new RegExp(`^${formattedMatricNo}$`, "i") },
    // });
    // if (!eligibleMatricNo) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You are not eligible for this certificate.",
    //   });
    // }

    // Check if certificate already exists
    // const existingCertificate = await CertificateModel.findOne({
    //   matricNo: { $regex: new RegExp(`^${formattedMatricNo}$`, "i") },
    // });
    // if (existingCertificate) {
    //   return res.status(400).json({
    //     success: false,
    //     message:
    //       " Your details is undergoing check. Certificate will be sent to your email when approved !!",
    //   });
    // }

    try {
      const certificateId = "SWEP-" + Date.now();
      const pdfPath = `./certifications/${lastname}-${firstname}-${middlename}.pdf`;
      const file = pdfPath;

      const doc = await instructorTemplate({
        ...req.body,
        certificateId,
        pdfPath,
      });

      // Write the PDF document to a file
      await new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(pdfPath);
        doc.pipe(writeStream);
        doc.end();
        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      });

      // Read the file data and produce the hash
      const fileData = fs.readFileSync(pdfPath);
      const hash = crypto.createHash("sha256");
      hash.update(fileData);
      const fileHash = hash.digest("hex");

      /////////////// Add to CELO ////////////////////

      // const senderAccount = {
      //   address: "0xD263C466E6aA620DF49495A6B6A4a8e49496F06C",
      //   privateKey:
      //     "0x18424a8c4a250461b3a6b43b9619f6f32ce3dddc70e68746bf6fa25fa86c2b64",
      // };

      // const recieverAccount = {
      //   address: "0x22FF4c57Eec278D37a1D9B95E4232F699Cdc2184",
      //   privateKey:
      //     "0xb390bdd0b41772049126e36fd0478d60332242c22245037da06a7d534e789afd",
      // };

      // const signedTx = await signAndSendTransaction(
      //   senderAccount.privateKey,
      //   senderAccount.address,
      //   recieverAccount.address
      // );

      // const details = await getTransactionDetails(signedTx.transactionHash);

      /////////////// Add to CELO ////////////////////

      const Certificate = await CertificateModel.create({
        matricNo,
        lastname,
        firstname,
        middlename,
        certificateStatus,
        certificateType,
        track,
        recieveAt,
        certificateId,
        fileHash,
        file,
      });

      res.status(201).json({
        success: true,
        data: {
          certificateId,
          pdfPath,
          fileHash,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// End Instructor SWEP Cert **************************

exports.downloadCertificate = asyncHandler(async (req, res, next) => {
  const Certificate = await CertificateModel.findById(req.params.id);
  // const Certificate = await CertificateModel.findOne({
  //   certificateId: req.params.certificateId,
  // });
  if (!Certificate) {
    return next(
      new ErrorResponse(
        `Certificate not found with id of ${req.params.id}`,
        404
      )
    );
  }

  // Assuming the pdfPath is stored in the Certificate object
  const pdfPath = Certificate.file;

  // If you want to send the file to the client, uncomment the following line:
  res.download(pdfPath);

  // return res.status(200).json({ success: true, data: { pdfPath } });
});
