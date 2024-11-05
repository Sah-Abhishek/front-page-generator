import React, { useState } from "react";
import { jsPDF } from "jspdf";
import image1 from "../assets/header2.png"; // Import the image

const PdfGenerator = () => {
    const [text, setText] = useState(""); // State for main text input
    const [studentName, setStudentName] = useState(""); // State for student name
    const [teacherName, setTeacherName] = useState(""); // State for teacher name
    const [rollNo, setRollNo] = useState('');
    const [stClass, setStClass] = useState('')
    const [stBranch, setStBranch] = useState('')
    const [fullBranch, setFullBranch] = useState('BACHELOR OF TECHNOLOGY - CSE (IOT)');
    const [session, setSession] = useState('(2023-2024)')

    // Handle changes in student name input
    const handleStudentNameChange = (e) => {
        setStudentName(e.target.value);
    };

    // Handle changes in teacher name input
    const handleTeacherNameChange = (e) => {
        setTeacherName(e.target.value);
    };
    const handleRollNoChange = (e) => {
        setRollNo(e.target.value);
    }
    const handleClassChange = (e) => {
        setStClass(e.target.value);
    }
    const handleStBranch = (e) => {
        setStBranch(e.target.value);
    }

    // Generate PDF with student and teacher names under "SUBMITTED BY :-" and "SUBMITTED TO :-"
    const generatePdf = () => {
        const doc = new jsPDF();
        const imageWidth = 200; // Set the width of the image
        const imageHeight = 115; // Set the height of the image

        // Get the page width to calculate the image's X position for centering
        const pageWidth = doc.internal.pageSize.getWidth();
        const imageXPos = (pageWidth - imageWidth) / 2; // Center the image horizontally

        // Add the image to the PDF (from the imported image), centered horizontally
        doc.addImage(image1, "PNG", imageXPos, 10, imageWidth, imageHeight); // Adjust the size and position as needed

        const fullBranchFontSize = 22; // Font size for fullBranch text
        doc.setFont("helvetica", "bold");
        doc.setFontSize(fullBranchFontSize);

        // Calculate the width of the fullBranch text
        const fullBranchTextWidth = doc.getStringUnitWidth(fullBranch) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const fullBranchXPos = (pageWidth - fullBranchTextWidth) / 2; // Center the fullBranch text horizontally

        // Add the fullBranch text below the main text (adjust Y position)
        doc.text(fullBranch, fullBranchXPos, imageHeight + 20);

        const sessionTextWidth = doc.getStringUnitWidth(session) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const sessionXPos = (pageWidth - sessionTextWidth) / 2; // Center the fullBranch text horizontally


        doc.text(session, sessionXPos, imageHeight + 30);

        // Practical File
        const practicalFiletextwidth = doc.getStringUnitWidth("Practical File") * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const practicalFileXPos = (pageWidth - practicalFiletextwidth) / 2; // Center the fullBranch text horizontally



        doc.text("PRACTICAL FILE", practicalFileXPos - 10, imageHeight + 45);

        const underlineYPos = imageHeight + 47; // Set Y position for the underline just below the text
        doc.setDrawColor(0, 0, 0); // Set the color for the underline (black)
        doc.setLineWidth(0.5); // Set the line width for the underline

        doc.line(practicalFileXPos - 10, underlineYPos, practicalFileXPos + practicalFiletextwidth + 8 , underlineYPos);


        // Set a larger font size for the main text (e.g., 24 points)
        const fontSize = 24;
        doc.setFont("helvetica", "bold"); // Set font to bold for main text
        doc.setFontSize(fontSize); // Set the font size

        // Calculate the text width and position to center the text
        const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const xPos = (pageWidth - textWidth) / 2; // Center the text horizontally



        // Add the main text below the image
        doc.text(text, xPos, imageHeight + 60); // Adjust Y position to ensure it doesn’t overlap with the image

        // Set the position for "SUBMITTED BY :-"
        const submittedByText = "SUBMITTED BY :-";
        const submittedByXPos = 10; // X position for "SUBMITTED BY :-"
        const submittedByYPos = imageHeight + 75; // Y position for both texts

        // Add "SUBMITTED BY :-"
        doc.text(submittedByText, submittedByXPos, submittedByYPos);

        // Set the position for "SUBMITTED TO :-" (with some distance from "SUBMITTED BY :-")
        const submittedToText = "SUBMITTED TO :-";
        const submittedToXPos = submittedByXPos + doc.getStringUnitWidth(submittedByText) * doc.internal.getFontSize() / doc.internal.scaleFactor + 30; // 30 is the space between the two texts

        // Add "SUBMITTED TO :-"
        doc.text(submittedToText, submittedToXPos, submittedByYPos);

        // Underline the "SUBMITTED BY :-" text
        const submittedByWidth = doc.getStringUnitWidth(submittedByText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const lineY = submittedByYPos + 2; // Space below the text for underline
        doc.setDrawColor(0, 0, 0); // Set color for the underline (black)
        doc.setLineWidth(0.5); // Set line width for the underline
        doc.line(submittedByXPos, lineY, submittedByXPos + submittedByWidth, lineY); // Draw underline for "SUBMITTED BY :-"

        // Underline the "SUBMITTED TO :-" text
        const submittedToWidth = doc.getStringUnitWidth(submittedToText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        doc.line(submittedToXPos, lineY, submittedToXPos + submittedToWidth, lineY); // Draw underline for "SUBMITTED TO :-"

        // Add the student's name under "SUBMITTED BY :-"
        doc.setFont("helvetica", "normal"); // Set font to normal for the names (not bold)
        const studentNameYPos = submittedByYPos + 15; // Position student name slightly below "SUBMITTED BY :-"


        // Add the teacher's name under "SUBMITTED TO :-"
        const teacherNameYPos = submittedByYPos + 15; // Position teacher name slightly below "SUBMITTED TO :-"
        doc.setFontSize(22);
        doc.text(teacherName || "Teacher's Name", submittedToXPos, teacherNameYPos); // Display the teacher's name
        doc.text("(ASST. PROFESSOR)", submittedToXPos, teacherNameYPos + 12); // Display the teacher's name
        doc.text(studentName || "Student's Name", submittedByXPos, studentNameYPos); // Display the student's name
        doc.text(rollNo || "RollNo", submittedByXPos, studentNameYPos + 12); // Display the student's name
        doc.text(stClass || "Class", submittedByXPos, studentNameYPos + 24); // Display the student's name
        doc.text(stBranch || "CSE-IOT", submittedToXPos, studentNameYPos + 24); // Display the student's name
        doc.text(stBranch || "CSE-IOT", submittedByXPos, studentNameYPos + 36); // Display the student's name


        const addressText1st = "5th Km Stone Delhi, Meerut Rd, Near Raj Nagar Extension Road,";
        const addressText2nd = "Ghaziabad, Uttar Pradesh 201003";

        doc.setFont("helvetica", "normal");
        doc.setFontSize(19); // Set a smaller font size for the address
        const addressWidth = doc.getStringUnitWidth(addressText1st) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const address2Width = doc.getStringUnitWidth(addressText2nd) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const addressXPos = (pageWidth - addressWidth) / 2; // Center the address horizontally
        const address2XPos = (pageWidth - address2Width) / 2; // Center the address horizontally
        // const addressYPos = pageHeight - 30; // Position the address near the bottom of the page (30 units above the bottom)

        // Add the address text to the bottom of the page
        doc.text(addressText1st, addressXPos, studentNameYPos + 48);
        doc.text(addressText2nd, address2XPos, studentNameYPos + 60);

        // Save the PDF
        doc.save("download.pdf");
    };

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <h1 className="text-2xl font-bold mb-4">Generate PDF with Names</h1>

            {/* Real-time Preview of Image and Text */}
            <div className="mb-4 w-80 flex flex-col items-center border p-4">
                {/* Center the Image in the Preview */}
                <div className="flex justify-center w-full mb-2">
                    <img
                        src={image1}
                        alt="Preview"
                        className="max-w-xs max-h-60 border border-gray-300 rounded"
                    />
                </div>

                {/* Real-time Text Preview */}
                {text && (
                    <div className="text-xl font-bold text-center mt-2">{text}</div>
                )}

                <div className="text-sm text-center mt-2">{studentName && `Submitted by: ${studentName}`}</div>
                <div className="text-sm text-center mt-2">{teacherName && `Submitted to: ${teacherName}`}</div>
            </div>

            {/* Real-time Text Input for the user to enter main text */}
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to appear below the image"
                rows="4"
                className="mb-4 p-2 w-80 border border-gray-300 rounded"
            />
            <input
                value={fullBranch}
                onChange={(e) => setFullBranch(e.target.value)}
                // placeholder="Enter text to appear below the image"
                rows="4"
                className="mb-4 p-2 w-80 border border-gray-300 rounded"
            />
            <input
                value={session}
                onChange={(e) => setSession(e.target.value)}
                // placeholder="Enter text to appear below the image"
                rows="4"
                className="mb-4 p-2 w-80 border border-gray-300 rounded"
            />



            {/* Real-time Inputs for Student's and Teacher's Names */}
            <input
                type="text"
                value={studentName}
                onChange={handleStudentNameChange}
                placeholder="Enter Student's Name"
                className="mb-4 p-2 w-80 border border-gray-300 rounded"
            />
            <input
                type="text"
                value={teacherName}
                onChange={handleTeacherNameChange}
                placeholder="Enter Teacher's Name"
                className="mb-4 p-2 w-80 border border-gray-300 rounded"
            />
            <input
                type="text"
                value={rollNo}
                onChange={handleRollNoChange}
                placeholder="Enter rollno"
                className="mb-4 p-2 w-80 border border-gray-300 rounded"
            />

            <input
                type="text"
                value={stClass}
                onChange={handleClassChange}
                placeholder="Enter Class"
                className="mb-4 p-2 w-80 border border-gray-300 rounded"
            />

            <input
                type="text"
                value={stBranch}
                onChange={handleStBranch}
                placeholder="Enter branch"
                className="mb-4 p-2 w-80 border border-gray-300 rounded"
            />




            {/* Generate PDF Button */}
            <button
                onClick={generatePdf}
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 mt-4"
            >
                Generate PDF
            </button>
        </div>
    );
};

export default PdfGenerator;
