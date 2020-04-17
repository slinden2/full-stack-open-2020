import express from "express";
import patientService from "../services/patients-service";

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).json(patientService.getPublicPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = patientService.addPatient(req.body);
    res.json(newPatient);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
