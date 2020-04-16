import express from "express";
import diagnoseService from "../services/diagnoses-service";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(diagnoseService.getDiagnoses());
});

export default router;
