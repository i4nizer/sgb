import jsPDF from 'jspdf'
import Papa from "papaparse"
import html2canvas from 'html2canvas'

//

export default () => {

    //

    const generateCsv = async (json: Object[]) => {
        return Papa.unparse(json)
    }

    const generatePDF = async (el: HTMLElement) => {
        // --- Create A4 report
        const pdf = new jsPDF({
            orientation: "p",
            unit: "px",
            format: "a4",
            hotfixes: ["px_scaling"],
        })

        // --- 96px = 1inch
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        // --- Create canvas of the element
        const canvas = await html2canvas(el, {
            useCORS: true,
            width: el.scrollWidth,
            height: el.scrollHeight,
        })

        // --- Convert canvas to image in ratio
        const imgData = canvas.toDataURL("image/png")
        const imgWidth = pdfWidth
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        // --- Record increments
        let heightLeft = imgHeight
        let heightUsed = 0

        // --- Slice the first part of the image
        pdf.addImage(imgData, "PNG", 0, heightUsed, imgWidth, imgHeight)
        heightLeft -= pdfHeight

        // --- Pull up the image
        while (heightLeft > 0) {
            heightUsed -= pdfHeight
            pdf.addPage()
            pdf.addImage(imgData, "PNG", 0, heightUsed, imgWidth, imgHeight)
            heightLeft -= pdfHeight
        }

        return pdf
    }

    //

    return { generateCsv, generatePDF }
}