import dynamic from "next/dynamic";
import jsPDF from "jspdf";

const GeneratePDF = dynamic(() => import("./GeneratePDF"), {
  ssr: false,
});

const MyPage = () => {
  const handlePDF = async () => {
    const doc = new jsPDF("p", "pt", "a4", false);

    // Write text to the PDF
    doc.text("This is a sample PDF generated from Next.js", 30, 30, "bold");

    // Save the PDF
    await doc.save("mypdf.pdf");
  };

  return (
    <div>
      <button onClick={handlePDF}>Generate PDF</button>
      <GeneratePDF />
    </div>
  );
};

export default MyPage;
