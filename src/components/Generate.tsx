import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

async function generatePersonalTaxPDF(formData: any) {
// Create a new PDF document
const pdfDoc = await PDFDocument.create();
const page = pdfDoc.addPage([595, 842]); // A4 size

// Embed fonts
const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

const fontSize = 10;
const margin = 50;
let y = page.getHeight() - margin;
const pageWidth = page.getWidth() - 2 * margin;

// Helper function to draw text
const drawText = (text: string, options: { 
  x?: number, 
  y: number, 
  font?: any, 
  size?: number 
} = {}) => {
  page.drawText(text, {
    x: options.x || margin,
    y: options.y,
    size: options.size || fontSize,
    font: options.font || font
  });
};

// Header
drawText('CAMEROON TAXPAYER INCOME DECLARATION FORM', {
  y: y,
  font: boldFont,
  size: 14
});
y -= 30;

// Personal Information Sections
drawText('SECTION 1: PERSONAL INFORMATION', {
  y: y,
  font: boldFont
});
y -= 20;

// TIN
drawText('1. Taxpayer Identification Number (TIN):', { y });
drawText(formData.personalInformation.tinValues.join(''), { 
  x: margin + 200, 
  y 
});
y -= 15;

// Surname
drawText('2. Surname:', { y });
drawText(formData.personalInformation.surnameValues.join(''), { 
  x: margin + 200, 
  y 
});
y -= 15;

// Given Name
drawText('3. Given Name:', { y });
drawText(formData.personalInformation.givennameValues.join(''), { 
  x: margin + 200, 
  y 
});
y -= 15;

// Date of Birth
drawText('4. Date of Birth:', { y });
const { dd, mm, yy } = formData.personalInformation.dateValues;
drawText(`${dd}/${mm}/${yy}`, { 
  x: margin + 200, 
  y 
});
y -= 15;

// Nationality
drawText('5. Nationality:', { y });
drawText(formData.personalInformation.nationalityValues.join(''), { 
  x: margin + 200, 
  y 
});
y -= 15;

// Identification
drawText('6. Identification Document:', { y });
drawText(formData.personalInformation.identification, { 
  x: margin + 200, 
  y 
});
y -= 15;

// Identification Number
drawText('7. Identification Number:', { y });
drawText(formData.personalInformation.indetificaionNumberValues.join(''), { 
  x: margin + 200, 
  y 
});
y -= 15;

// Residential Address
drawText('8. Residential Address:', { y });
drawText(formData.personalInformation.registeredAddress, { 
  x: margin + 200, 
  y 
});
y -= 15;

// Telephone
drawText('9. Telephone Number:', { y });
drawText(formData.personalInformation.telephone, { 
  x: margin + 200, 
  y 
});
y -= 15;

// Email
drawText('10. Email:', { y });
drawText(formData.personalInformation.email, { 
  x: margin + 200, 
  y 
});
y -= 15;

// Employment Status
drawText('11. Employment Status:', { y });
drawText(formData.personalInformation.employmentStatus, { 
  x: margin + 200, 
  y 
});
y -= 15;

// Occupation
drawText('12. Occupation/Profession:', { y });
drawText(formData.personalInformation.occupation, { 
  x: margin + 200, 
  y 
});
y -= 15;

// Sector
drawText('13. Sector:', { y });
drawText(formData.personalInformation.sectorValues.join(''), { 
  x: margin + 200, 
  y 
});

// Save PDF
const pdfBytes = await pdfDoc.save();

// Create and trigger download
const blob = new Blob([pdfBytes], { type: 'application/pdf' });
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'Personal_Tax_Declaration.pdf';
link.click();
}

export default generatePersonalTaxPDF;