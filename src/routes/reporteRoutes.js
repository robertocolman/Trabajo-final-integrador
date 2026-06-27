import express from "express";
import { generarReporteTurnos } from "../controllers/reporteController.js";

const router = express.Router();

router.get("/turnos/pdf", generarReporteTurnos);

export default router;