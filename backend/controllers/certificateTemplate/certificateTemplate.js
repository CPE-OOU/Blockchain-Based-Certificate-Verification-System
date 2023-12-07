const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = function certificateTemplate(data) {
 const doc = new PDFDocument();

// Set document margins
doc.margins({ top: 50, bottom: 50, left: 50, right: 50 });

// Set background color
doc.fill("#a6ffcb");
doc.rect(0, 0, doc.page.width, doc.page.height).fill();

// Add certificate content
doc.fill("#fff");
doc.rect(0, 50, doc.page.width, doc.page.height - 100).fill();

// University name
doc.fontSize(40);
doc.text("Olabisi Onabanjo University", doc.page.width / 2, 70, { align: "center" });

// Degree type
doc.fontSize(35);
doc.text(`${data.degreeType} Certificate`, doc.page.width / 2, 120, { align: "center" });

// Seal image
doc.image(path.join(__dirname, "../seal1.png"), doc.page.width - 150, 100, { width: 120 });

// Subtitle
doc.fontSize(25);
doc.text("This is to certify that", doc.page.width / 2, 170, { align: "center" });

// Name
doc.fontSize(45);
doc.text(`${data.firstname} ${data.middlename} ${data.lastname}`, doc.page.width / 2, 220, { align: "center" });

// Course name
doc.text("has successfully completed the Bachelor's degree in", doc.page.width / 2, 270, { align: "center" });
doc.text(`${data.courseName}`, doc.page.width / 2, 320, { align: "center" });

// Year of completion
doc.text(`Year of Completion: ${data.yearOfCompletion}`, doc.page.width / 2, 370, { align: "center" });

// Signature
doc.text("Signature: [Signature]", doc.page.width / 2, 420, { align: "center" });

// Generate PDF file
doc.pipe(fs.createWriteStream('certificate.pdf'));
return doc.end();
};
