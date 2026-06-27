import express from "express";
import { generarReporteTurnos } from "../controllers/reporteController.js";

const router = express.Router();

/**
 * @openapi
 * /reportes/turnos/pdf:
 *   get:
 *     tags: [Reportes]
 *     summary: Descargar reporte PDF de turnos
 *     description: Genera y descarga un archivo PDF con el listado de turnos.
 *     responses:
 *       200:
 *         description: Archivo PDF generado correctamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       500:
 *         $ref: '#/components/responses/InternalError'
 */
router.get("/turnos/pdf", generarReporteTurnos);

export default router;