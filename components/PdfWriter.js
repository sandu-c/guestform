import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import EncodingUtils from "./utils/encodingUtils";

const PdfWriter = (contact) => {
  const handlePDF = async () => {
    // Load your template PDF
    const templatePdfUrl = "/template_es.pdf";
    const templatePdfBytes = await fetch(templatePdfUrl).then((res) =>
      res.arrayBuffer()
    );

    // Create a PDFDocument from the template PDF bytes
    const templatePdfDoc = await PDFDocument.load(templatePdfBytes);

    // Create a new PDFDocument
    const pdfDoc = await PDFDocument.create();

    // Add a blank page to the new PDF
    const [page] = await pdfDoc.copyPages(templatePdfDoc, [0]);
    pdfDoc.addPage(page);

    // Add text or other elements to the new PDF
    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const writeOnPDF = (text, x, y) => {
      const textSize = 10.5;
      // const textWidth = font.widthOfTextAtSize(text, textSize);
      // const textHeight = font.heightAtSize(textSize);
      if (text !== undefined) {
        page.drawText(text, {
          x,
          y,
          font,
          size: textSize,
          color: rgb(0, 0, 0), // Black color
        });
      } else {
        console.log("Parameter is undefined, function writeOnPDF not executed");
      }
    };

    writeOnPDF(contact.buildingAddress, 283, 750);
    writeOnPDF(contact.buildingMunicipality, 283, 732);
    writeOnPDF(contact.buildingProvince, 283, 713);
    writeOnPDF(contact.buildingPostalCode, 283, 694);
    writeOnPDF(contact.buildingAppartment, 283, 677);

    const xLongFields = 143;
    const xShortFields = 192;
    // Specify the position to add text on the page
    // writeOnPDF(contact.name, xLongFields, 564);
    // writeOnPDF(contact.$surname, xLongFields, 546);
    // writeOnPDF(contact.$sex, xLongFields, 528);
    // writeOnPDF(contact.$idtype, xShortFields, 510);
    // writeOnPDF(contact.$idnum, xShortFields, 492);
    // writeOnPDF(contact.$nationality, xLongFields, 474);
    // writeOnPDF(contact.$birthdate, xLongFields, 456);
    // writeOnPDF(contact.$address, xShortFields, 438);
    // writeOnPDF(contact.$homeTown, xShortFields, 420);
    // writeOnPDF(contact.$homeCountry, xShortFields, 402);
    // writeOnPDF(contact.phone, xLongFields, 366);
    // writeOnPDF(contact.email, xLongFields, 348);

    let yName = 564;
    let yDiff = 18;
    // Specify the position to add text on the page
    writeOnPDF(contact.name0, xLongFields, yName);
    writeOnPDF(contact.$surname0, xLongFields, (yName -= yDiff));
    writeOnPDF(contact.$sex0, xLongFields, (yName -= yDiff));
    writeOnPDF(contact.$idtype0, xShortFields, (yName -= yDiff));
    writeOnPDF(contact.$idnum0, xShortFields, (yName -= yDiff));
    writeOnPDF(contact.$nationality0, xLongFields, (yName -= yDiff));
    writeOnPDF(contact.$birthdate0, xLongFields, (yName -= yDiff));
    writeOnPDF(contact.$address0, xShortFields, (yName -= yDiff));
    writeOnPDF(contact.$homeTown0, xShortFields, (yName -= yDiff));
    writeOnPDF(contact.$homeCountry0, xShortFields, (yName -= yDiff));
    writeOnPDF(contact.phone0, xLongFields, (yName -= yDiff * 2));
    writeOnPDF(contact.email0, xLongFields, (yName -= yDiff));

    // Save or download the filled PDF
    const pdfBytes = await pdfDoc.save();
    const base64String = await EncodingUtils._arrayBufferToBase64(pdfBytes);
    console.log("Astonishing: ", base64String);
    const blob = new Blob([EncodingUtils._base64ToArrayBuffer(base64String)], {
      type: "application/pdf",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "filled_pdf.pdf";
    link.click();

    return blob;
  };

  return { handlePDF };
};
export default PdfWriter;
