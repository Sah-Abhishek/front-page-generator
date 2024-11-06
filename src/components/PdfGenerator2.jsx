import React, { useState } from "react";
import { jsPDF } from "jspdf";
import image1 from "../assets/header2.png"; // Import the image

const PdfGenerator = () => {
    const [text, setText] = useState("DATABASE MANAGEMENT SYSTEM"); // State for main text input
    const [studentName, setStudentName] = useState(""); // State for student name
    const [teacherName, setTeacherName] = useState(""); // State for teacher name
    const [rollNoSubmittedBy, setRollNoSubmittedBy] = useState('');
    const [stClassSubmittedBy, setStClassSubmittedBy] = useState('2nd YEAR(SEC - A)');
    const [stBranchSubmittedBy, setStBranchSubmittedBy] = useState('CSE - IOT');
    const [rollNoSubmittedTo, setRollNoSubmittedTo] = useState('2200331550006');
    const [stClassSubmittedTo, setStClassSubmittedTo] = useState('3rd YEAR(SEC - A)');
    const [designation, setDesignation] = useState("(ASST. PROFESSOR)")
    const [stBranchSubmittedTo, setStBranchSubmittedTo] = useState('B. TECH CSE - IOT');
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

    // Handle changes in roll number, class, and branch for both sections
    const handleRollNoSubmittedByChange = (e) => {
        setRollNoSubmittedBy(e.target.value);
    }

    const handleStClassSubmittedByChange = (e) => {
        setStClassSubmittedBy(e.target.value);
    }

    const handleStBranchSubmittedByChange = (e) => {
        setStBranchSubmittedBy(e.target.value);
    }

    const handleRollNoSubmittedToChange = (e) => {
        setDesignation(e.target.value);
    }

    const handleStClassSubmittedToChange = (e) => {
        setStClassSubmittedTo(e.target.value);
    }

    const handleStBranchSubmittedToChange = (e) => {
        setStBranchSubmittedTo(e.target.value);
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
        const sessionXPos = (pageWidth - sessionTextWidth) / 2; // Center the session text horizontally
        doc.text(session, sessionXPos, imageHeight + 30);

        // Practical File
        const practicalFiletextwidth = doc.getStringUnitWidth("Practical File") * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const practicalFileXPos = (pageWidth - practicalFiletextwidth) / 2; // Center the fullBranch text horizontally

        doc.text("PRACTICAL FILE", practicalFileXPos - 10, imageHeight + 45);

        const underlineYPos = imageHeight + 47; // Set Y position for the underline just below the text
        doc.setDrawColor(0, 0, 0); // Set the color for the underline (black)
        doc.setLineWidth(0.5); // Set the line width for the underline
        doc.line(practicalFileXPos - 10, underlineYPos, practicalFileXPos + practicalFiletextwidth + 8, underlineYPos);

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
        doc.text(studentName || "Student's Name", submittedByXPos, studentNameYPos); // Display the student's name
        doc.text(rollNoSubmittedBy || "RollNo", submittedByXPos, studentNameYPos + 12); // Display the student's name
        doc.text(stClassSubmittedBy || "Class", submittedByXPos, studentNameYPos + 24); // Display the student's name
        doc.text(stBranchSubmittedBy || "CSE-IOT", submittedByXPos, studentNameYPos + 36); // Display the student's name

        // Add the teacher's name under "SUBMITTED TO :-"
        const teacherNameYPos = submittedByYPos + 15; // Position teacher name slightly below "SUBMITTED TO :-"
        doc.setFontSize(22);
        doc.text(teacherName || "Teacher's Name", submittedToXPos, teacherNameYPos); // Display the teacher's name
        doc.text("(ASST. PROFESSOR)", submittedToXPos, teacherNameYPos + 12); // Display the teacher's name
        // doc.text(stClassSubmittedTo || "Class", submittedToXPos, teacherNameYPos + 24); // Display the class for teacher
        doc.text(stBranchSubmittedTo || "CSE-IOT", submittedToXPos, teacherNameYPos + 24); // Display the branch for teacher

        const addressText1st = "5th Km Stone Delhi, Meerut Rd, Near Raj Nagar Extension Road,";
        const addressText2nd = "Ghaziabad, Uttar Pradesh 201003";

        doc.setFont("helvetica", "normal");
        doc.setFontSize(19); // Set a smaller font size for the address
        const addressWidth = doc.getStringUnitWidth(addressText1st) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const address2Width = doc.getStringUnitWidth(addressText2nd) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const addressXPos = (pageWidth - addressWidth) / 2; // Center the address horizontally
        const address2XPos = (pageWidth - address2Width) / 2; // Center the address horizontally

        // Add the address text to the bottom of the page
        doc.text(addressText1st, addressXPos, studentNameYPos + 48);
        doc.text(addressText2nd, address2XPos, studentNameYPos + 60);

        // Save the PDF
        doc.save("download.pdf");
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 ">
            <h1 className="text-2xl font-bold mb-4">Generate PDF with Names</h1>

            <div className="bg-white h-auto w-full md:w-[1190px] max-w-full flex flex-col items-center border border-black rounded-2xl p-4">
                <div className="w-full mb-4">
                    <img src={image1} alt="Header" className="w-full h-auto max-w-[500px] mx-auto object-contain" />
                </div>

                <input
                    value={fullBranch}
                    onChange={(e) => setFullBranch(e.target.value)}
                    placeholder="Full Branch"
                    className="mb-4 p-2 w-full md:w-[800px] border border-gray-300 rounded font-bold text-xl text-center"
                    style={{ width: `${fullBranch.length + 1}ch` }}

                />
                <input
                    value={session}
                    onChange={(e) => setSession(e.target.value)}
                    placeholder="Session"
                    className="mb-6 p-2 w-full md:w-[250px] border border-gray-300 rounded font-bold text-xl text-center"
                    style={{ width: `${session.length + 1}ch` }}

                />

                <h1 className="text-4xl font-bold mb-6 underline">Practical File</h1>

                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Subject"
                    className="mb-4 p-2 w-full md:w-[800px] min-w-[500px] border border-gray-300 rounded font-bold text-xl text-center"
                    style={{ width: `${text.length + 1}ch` }}

                />

                <div className="flex flex-col sm:flex-row md:flex-row w-full  rounded">
                    {/* SUBMITTED BY Section */}
                    <div className="w-full lg:w-1/2 p-40 pt-10">
                        <div className="flex flex-col">
                            <p className="underline font-bold text-2xl mb-4">SUBMITTED BY</p>
                            <input
                                value={studentName}
                                onChange={handleStudentNameChange}
                                placeholder="Student Name"
                                className="mb-4 p-1 border border-gray-300 rounded text-2xl min-w-[200px]"
                                style={{ width: `${studentName.length + 1}ch` }}

                            />
                            <input
                                value={rollNoSubmittedBy}
                                onChange={handleRollNoSubmittedByChange}
                                placeholder="Roll No" 
                                className="mb-4 p-1 border border-gray-300 rounded text-2xl min-w-[100px]"
                                style={{ width: `${rollNoSubmittedBy.length + 1}ch` }}

                            />
                            <input
                                value={stClassSubmittedBy}
                                onChange={handleStClassSubmittedByChange}
                                placeholder="Class"
                                className="mb-4 p-1 border border-gray-300 rounded text-2xl min-w-[100px]"
                                style={{ width: `${stClassSubmittedBy.length + 1}ch` }}

                            />
                            <input
                                value={stBranchSubmittedBy}
                                onChange={handleStBranchSubmittedByChange}
                                placeholder="Branch"
                                className="mb-4 p-1 border border-gray-300 rounded text-2xl"
                                style={{ width: `${stBranchSubmittedBy.length + 1}ch` }}

                            />
                        </div>
                    </div>

                    {/* SUBMITTED TO Section */}
                    <div className="w-full md:1/2 lg:w-1/3 p-20 pt-10">

                        <div className="flex flex-col">
                            <p className="underline text-2xl pb-4 font-bold">SUBMITTED TO</p>
                            <input
                                value={teacherName}
                                onChange={handleTeacherNameChange}
                                placeholder="Teacher Name"
                                className="mb-4 p-1 border border-gray-300 rounded min-w-[200px] text-2xl"
                                style={{ width: `${teacherName.length + 1}ch` }}
                            />
                            <input
                                value={designation}
                                onChange={handleRollNoSubmittedToChange}
                                placeholder="TEACHER's DESIGNATION"
                                className="mb-4 p-1 border border-gray-300 rounded min-w-[200px] text-2xl"
                                style={{ width: `${designation.length + 1}ch` }}

                            />
                            <input
                                value={stBranchSubmittedTo}
                                onChange={handleStBranchSubmittedToChange}
                                placeholder="Branch"
                                className="mb-4 p-1 border border-gray-300 rounded min-w-[200px] text-2xl"
                                style={{ width: `${stBranchSubmittedTo.length + 1}ch` }}

                            />
                        </div>
                    </div>
                </div>

                {/* Generate PDF Button */}
                <button
                    onClick={generatePdf}
                    className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 hover:scale-105 transition mt-8"
                >
                    Generate PDF
                </button>
            </div>
        </div>
    );
};

export default PdfGenerator;
