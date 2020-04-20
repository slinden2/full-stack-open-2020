import express from "express";
import patientService from "../services/patients-service";
import { toNewPatient, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.status(200).json(patientService.getPublicPatients());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  try {
    res.status(200).json(patientService.getPatient(id));
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
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

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
