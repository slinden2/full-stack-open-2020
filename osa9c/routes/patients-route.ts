import express from "express";
import patientService from "../services/patients-service";

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).json(patientService.getPublicPatients());
});

export default router;
