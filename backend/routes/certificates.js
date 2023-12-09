const express = require("express");
const {
  getCertificates,
  getCertificate,
  createCertificate,
  updateCertificate,
  // deleteCertificate,
  web3,
  getCertificatebyMatricNo,
  verifyCertificatebyCertId,
  verifyCertificatebyCertHash,
  getCertificateByUserId,
} = require("../controllers/certificates");
const router = express.Router();
const { protect } = require("../middleware/auth");
const Certificate = require("../model/Certificate");

router.route("/").get(getCertificates).post(protect, createCertificate);
// .post(createCertificate);

router.route("/:id").get(getCertificate);

// .put(protect, updateCertificate)
// .delete(protect, deleteCertificate);

router
  .route("/matric/:matricNo")
  .get(getCertificatebyMatricNo)
  .put(updateCertificate);

router
  .route("/verify/certificateid/:certificateId")
  .get(verifyCertificatebyCertId);

router
  .route("/verify/certificatehash/:fileHash")
  .get(verifyCertificatebyCertHash);

router.route("/userid/:userId").get(getCertificateByUserId);

router.route("/celo").get(web3);

// ________________________
const app = express();

app.get("/download/:certificateId", async (req, res) => {
  const id = req.params.id;

  // Use the id to find the certificate in the database
  const certificate = await Certificate.findBycertificateId(id); // Assuming Certificate is your Mongoose model

  if (!certificate) {
    return res.status(404).send("Certificate not found");
  }

  const filePath = certificate.pdfPath; // Assuming pdfPath is the field where you store the path

  res.download(filePath, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
});

module.exports = router;
