const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const nodemaier = require('../config/mailconfig');

// Function to generate a PDF with random data
function generatePDF(pdfPath, callback) {
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);

    doc.pipe(writeStream);

    // Add content to the PDF
    doc.fontSize(12).text('Hello, this is a sample PDF document.', 50, 50);

    doc.end();

    writeStream.on('finish', () => {
        console.log('PDF generated successfully');
        callback(null);
    });

    writeStream.on('error', (error) => {
        console.error('Error generating PDF:', error);
        callback(error);
    });
}

// Function to send email with PDF attachment
async function sendEmailWithAttachment(pdfPath, email) {
    // Generate PDF
    await generatePDF(pdfPath, (error) => {
        if (error) {
            console.error('Error generating PDF:', error);
            return;
        }

        const mailOptions = {
            from: 'kaushalbakraniya97@gmail.com', // Sender address
            to: email, // List of recipients
            subject: 'PDF Attachment', // Subject line
            text: 'Please find the attached PDF document.', // Plain text body
            attachments: [{ path: pdfPath }] // Attachment
        };

        // Send email
        nodemaier.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }

            // Delete the generated PDF file after sending the email
            fs.unlink(pdfPath, (err) => {
                if (err) {
                    console.error('Error deleting PDF:', err);
                } else {
                    console.log('PDF deleted successfully');
                }
            });
        });
    });
}

// Example usage
const pdfPath = 'sample.pdf';
const recipientEmail = 'kaushalbakraniya90@gmail.com';

sendEmailWithAttachment(pdfPath, recipientEmail);
