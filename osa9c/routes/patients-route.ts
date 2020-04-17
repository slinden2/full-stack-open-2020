import express from "express";
import patientService from "../services/patients-service";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).json(patientService.getPublicPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
