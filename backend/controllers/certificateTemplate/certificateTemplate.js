const fs = require("fs");
const path = require("path");
// const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const PDFDocument = require("pdfkit");

// module.exports = function certificateTemplate(data) {
//   const doc = new PDFDocument();

//   // Draw a border
//   doc.rect(50, 50, doc.page.width - 100, doc.page.height - 100).stroke();

//   // Set the font size and add the university name
//   doc
//     .fontSize(30)
//     .font("Helvetica-Bold")
//     .fillColor("blue")
//     .text("Olabisi Onabanjo University", 250, 100);

//   // Add the degree certificate subtitle
//   doc
//     .fontSize(20)
//     .font("Helvetica")
//     .fillColor("black")
//     .text("Bachelor's Degree Certificate", 250, 150);

//   // Add a line under the title
//   doc
//     .moveTo(150, 180)
//     .lineTo(doc.page.width - 150, 180)
//     .stroke();

//   // Add the student's name
//   doc
//     .fontSize(25)
//     .font("Helvetica")
//     .fillColor("black")
//     .text(`This is to certify that ${data.name}`, 150, 230);

//   // Add the degree details
//   doc
//     .fontSize(20)
//     .font("Helvetica")
//     .fillColor("black")
//     .text(
//       `has successfully completed the Bachelor's degree in ${data.courseName}`,
//       150,
//       280
//     )
//     .text(`Date of Completion: ${data.dateOfCompletion}`, 150, 330);

//   // Add a line above the signature
//   doc
//     .moveTo(150, 410)
//     .lineTo(doc.page.width - 150, 410)
//     .stroke();

//   // Add the signature placeholder
//   doc
//     .fontSize(20)
//     .font("Helvetica")
//     .fillColor("black")
//     .text("Signature: _______________", 150, 430);

//   return doc;
// };

// module.exports = async function certificateTemplate(data) {
//   // Create a new PDFDocument
//   const pdfDoc = await PDFDocument.create();

//   // Embed the Helvetica font
//   const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

//   // Add a blank page to the document
//   const page = pdfDoc.addPage();

//   // Get the width and height of the page
//   const { width, height } = page.getSize();

//   // Draw the university name
//   page.drawText("Olabisi Onabanjo University", {
//     x: 50,
//     y: height - 4 * 30,
//     size: 30,
//     font: helveticaFont,
//     color: rgb(0, 0, 0),
//   });

//   // Draw the degree certificate subtitle
//   page.drawText("Bachelor's Degree Certificate", {
//     x: 50,
//     y: height - 4 * 50,
//     size: 20,
//     font: helveticaFont,
//     color: rgb(0, 0, 0),
//   });

//   // Draw the student's name
//   page.drawText("This is to certify that [Candidate Name]", {
//     x: 50,
//     y: height - 4 * 70,
//     size: 25,
//     font: helveticaFont,
//     color: rgb(0, 0, 0),
//   });

//   // Draw the degree details
//   page.drawText(
//     "has successfully completed the Bachelor's degree in [Course Name]",
//     {
//       x: 50,
//       y: height - 4 * 90,
//       size: 20,
//       font: helveticaFont,
//       color: rgb(0, 0, 0),
//     }
//   );

//   // Draw the date of completion
//   page.drawText("Date of Completion: [Date]", {
//     x: 50,
//     y: height - 4 * 110,
//     size: 20,
//     font: helveticaFont,
//     color: rgb(0, 0, 0),
//   });

//   // Draw the signature placeholder
//   page.drawText("Signature: _______________", {
//     x: 50,
//     y: height - 4 * 130,
//     size: 20,
//     font: helveticaFont,
//     color: rgb(0, 0, 0),
//   });

//   // Serialize the PDFDocument to bytes (a Uint8Array)
//   const pdfBytes = await pdfDoc.save();

//   // This will be a buffer that you can write to a file or send over a network.
//   return pdfBytes;
// };

module.exports = function certificateTemplate(data) {
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
  });

  // Helper to move to next line
  function jumpLine(doc, lines) {
    for (let index = 0; index < lines; index++) {
      doc.moveDown();
    }
  }

  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");

  doc.fontSize(10);

  // Margin
  const distanceMargin = 18;

  doc
    .fillAndStroke("#0e8cc3")
    .lineWidth(20)
    .lineJoin("round")
    .rect(
      distanceMargin,
      distanceMargin,
      doc.page.width - distanceMargin * 2,
      doc.page.height - distanceMargin * 2
    )
    .stroke();

  // Header
  const maxWidth = 140;
  const maxHeight = 70;

  // doc.image("assets/winners.png", doc.page.width / 2 - maxWidth / 2, 60, {
  //   fit: [maxWidth, maxHeight],
  //   align: "center",
  // });

  // jumpLine(doc, 5);

  const publicPath = path.join(process.cwd(), "./public");

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Light.otf`)
    .fontSize(48)
    .fill("#021c27")
    .text("Olabisi Onabanjo University", {
      align: "center",
    });

  jumpLine(doc, 2);

  // Content
  doc
    .font(`${publicPath}/fonts/NotoSansJP-Regular.otf`)
    .fontSize(16)
    .fill("#021c27")
    .text("CERTIFICATE OF BACHELOR DEGREE", {
      align: "center",
    });

  jumpLine(doc, 1);

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Light.otf`)
    .fontSize(10)
    .fill("#021c27")
    .text("Present to", {
      align: "center",
    });

  jumpLine(doc, 2);

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Bold.otf`)
    .fontSize(24)
    .fill("#021c27")
    .text("STUDENT NAME", {
      align: "center",
    });

  jumpLine(doc, 1);

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Light.otf`)
    .fontSize(10)
    .fill("#021c27")
    .text("Successfully completed the Super Course for Awesomes.", {
      align: "center",
    });

  jumpLine(doc, 7);

  doc.lineWidth(1);

  // Signatures
  const lineSize = 174;
  const signatureHeight = 390;

  doc.fillAndStroke("#021c27");
  doc.strokeOpacity(0.2);

  const startLine1 = 128;
  const endLine1 = 128 + lineSize;
  doc
    .moveTo(startLine1, signatureHeight)
    .lineTo(endLine1, signatureHeight)
    .stroke();

  const startLine2 = endLine1 + 32;
  const endLine2 = startLine2 + lineSize;
  doc
    .moveTo(startLine2, signatureHeight)
    .lineTo(endLine2, signatureHeight)
    .stroke();

  const startLine3 = endLine2 + 32;
  const endLine3 = startLine3 + lineSize;
  doc
    .moveTo(startLine3, signatureHeight)
    .lineTo(endLine3, signatureHeight)
    .stroke();

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Bold.otf`)
    .fontSize(10)
    .fill("#021c27")
    .text("John Doe", startLine1, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Light.otf`)
    .fontSize(10)
    .fill("#021c27")
    .text("Associate Professor", startLine1, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Bold.otf`)
    .fontSize(10)
    .fill("#021c27")
    .text("Student Name", startLine2, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Light.otf`)
    .fontSize(10)
    .fill("#021c27")
    .text("Student", startLine2, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Bold.otf`)
    .fontSize(10)
    .fill("#021c27")
    .text("Jane Doe", startLine3, signatureHeight + 10, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Light.otf`)
    .fontSize(10)
    .fill("#021c27")
    .text("Director", startLine3, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  jumpLine(doc, 4);

  // Validation link
  const link = "https://validate-your-certificate.hello/validation-code-here";

  const linkWidth = doc.widthOfString(link);
  const linkHeight = doc.currentLineHeight();

  doc
    .underline(doc.page.width / 2 - linkWidth / 2, 448, linkWidth, linkHeight, {
      color: "#021c27",
    })
    .link(doc.page.width / 2 - linkWidth / 2, 448, linkWidth, linkHeight, link);

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Light.otf`)
    .fontSize(10)
    .fill("#021c27")
    .text(link, doc.page.width / 2 - linkWidth / 2, 448, linkWidth, linkHeight);

  // Footer
  const bottomHeight = doc.page.height - 100;

  doc.image(
    `${publicPath}/assets/qr.png`,
    doc.page.width / 2 - 30,
    bottomHeight,
    {
      fit: [60, 60],
    }
  );

  return doc;
};
