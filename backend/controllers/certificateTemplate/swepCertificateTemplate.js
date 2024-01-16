const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const { FRONTEND_URL } = require("../../config/contants");
const QRCode = require("qrcode");

module.exports = async function certificateTemplate(data) {
  const publicPath = path.join(process.cwd(), "./public");

  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
  });

  // Load your image
  const backgroundImage = `${publicPath}/assets/background1.jpg`;

  // Add the image to the document
  doc.image(backgroundImage, 0, 0, {
    width: doc.page.width,
    height: doc.page.height,
  });

  function jumpLine(doc, lines) {
    for (let index = 0; index < lines; index++) {
      doc.moveDown();
    }
  }

  // doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");

  doc.fontSize(10);

  const distanceMargin = 18;

  // doc
  //   .fillAndStroke("#254085")
  //   .lineWidth(20)
  //   .lineJoin("round")
  //   .rect(
  //     distanceMargin,
  //     distanceMargin,
  //     doc.page.width - distanceMargin * 2,
  //     doc.page.height - distanceMargin * 2
  //   )
  //   .stroke();

  const maxWidth = 140;
  const maxHeight = 70;

  doc.image(`${publicPath}/assets/OOU-logo.png`, distanceMargin, 60, {
    fit: [maxWidth, maxHeight],
    align: "center",
  });

  doc.image(
    `${publicPath}/assets/OTC-logo.jpg`,
    doc.page.width - maxWidth - distanceMargin,
    60,
    {
      fit: [maxWidth, maxHeight],
      align: "center",
    }
  );

  jumpLine(doc, 5);

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Regular.otf`)
    .fontSize(34)
    .fill("#3c68d6")
    .text("Olabisi Onabanjo University", {
      align: "center",
    });

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Regular.otf`)
    .fontSize(20)
    .fill("#021c27")
    .text("Department of Computer Engineering", {
      align: "center",
    });

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Regular.otf`)
    .fontSize(14)
    .fill("#021c27")
    .text("Student Work Experience Programme 2023 ", {
      align: "center",
    });

  doc.y += 0.8 * doc.currentLineHeight();

  doc
    .font(`${publicPath}/fonts/GreatVibes-Regular.ttf`)
    .fontSize(18)
    .fill("#021c27")
    .text("This is to certify that", {
      align: "center",
    });

  // jumpLine(doc, 1);
  doc.y += 0.5 * doc.currentLineHeight();
  doc
    .font(`${publicPath}/fonts/NotoSansJP-Bold.otf`)
    .fontSize(24)
    .fill("#021c27")
    .text(`${data.firstname} ${data.lastname} ${data.middlename}`, {
      align: "center",
    });
  // jumpLine(doc, 1);
  doc
    .font(`${publicPath}/fonts/NotoSansJP-Bold.otf`)
    .fontSize(12)
    .fill("#021c27")
    .text(`participated in ${data.track} workshop training`, {
      align: "center",
    });

  // jumpLine(doc, 1);
  doc
    .font(`${publicPath}/fonts/NotoSansJP-Light.otf`)
    .fontSize(12)
    .fill("#021c27")
    .text(`From 4th to 9th December 2023`, {
      align: "center",
    });

  // jumpLine(doc, 5); ///This is not working plese check

  doc.lineWidth(1);

  const lineSize = 174;
  const signatureHeight = 405;

  doc.fillAndStroke("#021c27");
  doc.strokeOpacity(0.2);

  const startLine1 = 128;
  const endLine1 = 128 + lineSize;
  doc
    .moveTo(startLine1, signatureHeight)
    .lineTo(endLine1, signatureHeight)
    .stroke();

  const endLine2 = 490;

  const startLine3 = endLine2 + 32;
  const endLine3 = startLine3 + lineSize;
  doc
    .moveTo(startLine3, signatureHeight)
    .lineTo(endLine3, signatureHeight)
    .stroke();

  jumpLine(doc, 5); ///This is not working plese check
  // Add signature image for John Doe
  doc.image(
    `${publicPath}/assets/Hod-Signature1.png`,
    startLine1, // Position at the left edge
    signatureHeight - 55, // Adjust this value as needed
    {
      fit: [lineSize, 80], // Adjust these values as needed
      align: "center",
    }
  );

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Bold.otf`)
    .fontSize(10)
    .fill("#021c27")
    .text("MR O.R ABOLADE", startLine1, signatureHeight + 10, {
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
    .text("Head Of Department", startLine1, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  // Add signature image for the Director
  doc.image(
    `${publicPath}/assets/kelvin-signature1.png`,
    startLine3, // Position at the right edge
    signatureHeight - 45, // Adjust this value as needed
    {
      fit: [lineSize, 50], // Adjust these values as needed
      align: "center",
    }
  );

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Bold.otf`)
    .fontSize(10)
    .fill("#021c27")
    .text("Eniola Kelvin", startLine3, signatureHeight + 10, {
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
    .text("OOU Tech Community Team Lead", startLine3, signatureHeight + 25, {
      columns: 1,
      columnGap: 0,
      height: 40,
      width: lineSize,
      align: "center",
    });

  // jumpLine(doc, 10);

  const link = `${FRONTEND_URL}/verify`;

  const linkWidth = doc.widthOfString(link) + 30;
  const linkHeight = doc.currentLineHeight();

  // jumpLine(doc, 10);

  doc
    .underline(doc.page.width / 2 - linkWidth / 2, 478, linkWidth, linkHeight, {
      color: "#021c27",
    })
    .link(doc.page.width / 2 - linkWidth / 2, 478, linkWidth, linkHeight, link);

  doc
    .font(`${publicPath}/fonts/NotoSansJP-Light.otf`)
    .fontSize(10)
    .fill("#021c27")
    .text(
      `Certificate ID: ${data.certificateId}`,
      doc.page.width / 2 - linkWidth / 2,
      478,
      linkWidth,
      linkHeight
    );

  const bottomHeight = doc.page.height - 80;

  const url = await QRCode.toDataURL(link);

  doc.image(url, doc.page.width / 2 - 30, bottomHeight, {
    fit: [70, 70],
  });

  // Load your gold seal image
  const goldSealImage = `${publicPath}/assets/s1.png`;

  // Add the gold seal image to the document
  doc.image(goldSealImage, doc.page.width - 150, doc.page.height - 130, {
    width: 100,
    height: 80,
  });

  return doc;
};
