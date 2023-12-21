const express = require("express");
const {
  getCertificates,
  getCertificate,
  createCertificate,
  createSwepCertificate,
  updateCertificate,
  // deleteCertificate,
  web3,
  getCertificatebyMatricNo,
  verifyCertificatebyCertId,
  verifyCertificatebyCertHash,
  getCertificateByUserId,
  downloadCertificate,
  getSwep,
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

router.route("/download/:id").get(downloadCertificate);

router.route("/swep").post(createSwepCertificate);

// router.route("/swep/all/").get(getSwep);

module.exports = router;
