import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib'; // Import rgb from pdf-lib
import { saveAs } from 'file-saver';

const AddFooter = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [name, setName] = useState('');
    const [rollNumber, setRollNumber] = useState('');
  
    const handleFileChange = (event) => {
      setPdfFile(event.target.files[0]);
    };
  
    const handleNameChange = (event) => {
      setName(event.target.value);
    };
  
    const handleRollNumberChange = (event) => {
      setRollNumber(event.target.value);
    };
  
    const handleAddFooter = async () => {
      if (!pdfFile || !name || !rollNumber) {
        alert("Please upload a PDF file and enter name and roll number.");
        return;
      }
  
      // Read the uploaded PDF file
      const pdfBytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
  
      // Get all pages of the PDF
      const pages = pdfDoc.getPages();
      
      // Loop through each page and add footer
      pages.forEach((page) => {
        const { width, height } = page.getSize();
        
        // Define the footer area dimensions
        const footerHeight = 30; // Height of the footer area
        const footerWidth = width - 100; // Width of the footer area (leaving space on both sides)
        const footerX = 50; // X position of the footer (distance from the left)
        const footerY = 30; // Y position of the footer (near the bottom of the page)
  
        // Draw a white rectangle for the footer background
        page.drawRectangle({
          x: footerX ,
          y: footerY + 10,
          width: footerWidth,
          height: footerHeight + 20,
          color: rgb(1, 1, 1), // Yellow color for the background
        });
  
        // Add the text inside the white rectangle
        page.drawText(`${name}`, {
          x: footerX + 400, // Slight offset for the text inside the rectangle
          y: footerY + 40, // Slight offset for the text inside the rectangle
          size: 12,
          color: rgb(0, 0, 0), // Black text
        });
        page.drawText(`${rollNumber}`, {
          x: footerX + 400, // Slight offset for the text inside the rectangle
          y: footerY + 20, // Slight offset for the text inside the rectangle
          size: 12,
          color: rgb(0, 0, 0), // Black text
        });
      });
  
      // Serialize the PDF back to bytes
      const modifiedPdfBytes = await pdfDoc.save();
  
      // Create a blob from the modified PDF
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
  
      // Use file-saver to download the modified PDF
      saveAs(blob, 'modified_pdf_with_footer.pdf');
    };
  
    return (
      <div className="flex flex-col justify-center items-center  mb-4 border border-black rounded-2xl m-4 p-4">
        <h1 className='text-4xl font-bold mb-4'>PDF Footer Editor</h1>
        <div className='mb-4'>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </div>
        <div className='mb-4'>
          <label>Name: </label>
          <input type="text" value={name} onChange={handleNameChange} className='py-1 px-2 border border-gray-500 rounded mx-4' />
        </div>
        <div className='mb-4'>
          <label>Roll Number: </label>
          <input type="text" value={rollNumber} onChange={handleRollNumberChange} className='py-1 px-2 border border-gray-500 rounded mx-4'/>
        </div>
        <button onClick={handleAddFooter} className='bg-blue-500 px-4 py-2 rounded-xl hover:scale-110 transition'>Add Footer and Download PDF</button>
      </div>
    );
  }
  
  export default AddFooter;
  