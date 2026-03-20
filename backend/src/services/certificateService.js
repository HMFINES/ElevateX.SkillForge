const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const ensureDirectory = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const generateCertificatePdf = async ({
  certificateId,
  studentName,
  courseName,
  issueDate,
}) => {
  const outputDir = path.join(__dirname, "..", "public", "certificates");
  ensureDirectory(outputDir);

  const fileName = `${certificateId}.pdf`;
  const filePath = path.join(outputDir, fileName);
  const relativeUrl = `/assets/certificates/${fileName}`;

  await new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 0,
      info: {
        Title: `${courseName} - ElevateX Certificate`,
        Author: "ElevateX",
      },
    });

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.rect(0, 0, 595, 842).fill("#07101d");
    doc.rect(24, 24, 547, 794).lineWidth(2).strokeColor("#77a6ff").stroke();
    doc.roundedRect(42, 42, 511, 758, 24).fillOpacity(0.1).fill("#ffffff");

    doc.fillOpacity(1);
    doc.fontSize(18).fillColor("#55d8d2").text("ElevateX", 0, 78, {
      align: "center",
      characterSpacing: 3,
    });

    doc.fontSize(34).fillColor("#f5f7fb").text("Certificate of Completion", 0, 120, {
      align: "center",
    });

    doc
      .fontSize(14)
      .fillColor("#9aa6c4")
      .text("This certifies that", 0, 205, { align: "center" });

    doc.fontSize(30).fillColor("#ffffff").text(studentName, 0, 245, {
      align: "center",
      underline: true,
    });

    doc
      .fontSize(14)
      .fillColor("#9aa6c4")
      .text("has successfully completed the ElevateX program", 0, 310, {
        align: "center",
      });

    doc.fontSize(24).fillColor("#77a6ff").text(courseName, 0, 350, {
      align: "center",
    });

    doc
      .moveTo(110, 520)
      .lineTo(485, 520)
      .lineWidth(1)
      .strokeColor("#304463")
      .stroke();

    doc.fontSize(12).fillColor("#9aa6c4").text(`Certificate ID: ${certificateId}`, 85, 560);
    doc.text(`Issue Date: ${issueDate}`, 85, 584);
    doc.text("Platform: ElevateX", 85, 608);

    doc.text("Signature", 390, 560);
    doc.fontSize(18).fillColor("#ffffff").text("Harshal Wakode", 390, 585);
    doc.fontSize(12).fillColor("#9aa6c4").text("AI Engineer & AI Automation Specialist", 390, 612, {
      width: 150,
    });

    doc
      .fontSize(11)
      .fillColor("#7e8dab")
      .text(
        "ElevateX verifies real skill progression, project completion, and learner milestones.",
        80,
        720,
        { width: 435, align: "center" }
      );

    doc.end();

    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  return {
    filePath,
    relativeUrl,
  };
};

module.exports = { generateCertificatePdf };
