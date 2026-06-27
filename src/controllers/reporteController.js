import PDFDocument from "pdfkit";
import turnoService from "../services/turnoService.js";

export const generarReporteTurnos = async (req, res, next) => {
    try {
        const turnos = await turnoService.getAll();

        const doc = new PDFDocument({
            margin: 50,
            size: "A4"
        });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=reporte_turnos.pdf"
        );

        doc.pipe(res);

        // Título
        doc
            .fontSize(20)
            .text("REPORTE DE TURNOS", {
                align: "center"
            });

        doc.moveDown();

        doc
            .fontSize(12)
            .text(
                `Fecha de generación: ${new Date().toLocaleDateString()}`
            );

        doc.moveDown();

        if (!turnos || turnos.length === 0) {
            doc.text("No existen turnos registrados.");
        } else {
            turnos.forEach((turno, index) => {
                doc
                    .fontSize(11)
                    .text(`Turno N° ${index + 1}`)
                    .text(`ID: ${turno.id_turno_reserva || ""}`)
                    .text(`Paciente: ${turno.paciente_apellido || ""} ${turno.paciente_nombres || ""}`)
                    .text(`Médico: ${turno.medico_apellido || ""} ${turno.medico_nombres || ""}`)
                    .text(`Especialidad: ${turno.especialidad || ""}`)
                    .text(`Obra Social: ${turno.obra_social || ""}`)
                    .text(`Fecha: ${turno.fecha_hora || ""}`)
                    .text(`Valor: $${turno.valor_total || 0}`);

                doc.moveDown();
            });
        }

        doc.end();

    } catch (error) {
        next(error);
    }
};