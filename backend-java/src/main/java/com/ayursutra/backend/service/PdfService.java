package com.ayursutra.backend.service;

import com.ayursutra.backend.model.Prescription;
import com.ayursutra.backend.model.PrescriptionMedicine;
import com.ayursutra.backend.model.User;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfService {

    public byte[] generatePrescriptionPdf(Prescription prescription, User patient, User doctor) {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, out);
            document.open();

            // Header
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);
            Paragraph title = new Paragraph("AyurSutra Panchakarma", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            
            document.add(new Paragraph(" "));
            
            // Doctor & Patient Info
            PdfPTable infoTable = new PdfPTable(2);
            infoTable.setWidthPercentage(100);
            
            PdfPCell doctorCell = new PdfPCell(new Phrase("Doctor Details\nName: " + doctor.getName() + "\nReg No: " + (doctor.getRegistrationNumber() != null ? doctor.getRegistrationNumber() : "N/A")));
            doctorCell.setBorder(Rectangle.NO_BORDER);
            
            PdfPCell patientCell = new PdfPCell(new Phrase("Patient Details\nName: " + patient.getName() + "\nDate: " + prescription.getDate()));
            patientCell.setBorder(Rectangle.NO_BORDER);
            patientCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            
            infoTable.addCell(doctorCell);
            infoTable.addCell(patientCell);
            document.add(infoTable);
            
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Instructions: " + prescription.getInstructions()));
            document.add(new Paragraph(" "));

            // Medicines Table
            if (prescription.getMedicines() != null && !prescription.getMedicines().isEmpty()) {
                PdfPTable table = new PdfPTable(4);
                table.setWidthPercentage(100);
                
                table.addCell("Medicine");
                table.addCell("Dosage");
                table.addCell("Frequency");
                table.addCell("Timing");
                
                for (PrescriptionMedicine med : prescription.getMedicines()) {
                    table.addCell(med.getMedicineName());
                    table.addCell(med.getDosage());
                    table.addCell(med.getFrequency());
                    table.addCell(med.getTiming());
                }
                document.add(table);
            }
            
            document.add(new Paragraph(" "));
            document.add(new Paragraph("Signature: _______________________"));

            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
