import { v4 as uuidv4 } from "uuid";
import patientData from "../data/patients";
import { Patient, PublicPatient, NewPatient } from "../types";

const getPatients = (): Array<Patient> => {
  return patientData;
};

const getPublicPatients = (): Array<PublicPatient> => {
  return patientData.map(patient => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patientData.find(p => p.id === id);

  if (!patient) {
    throw new Error("patient not found!");
  }

  if (!patient.entries) {
    patient.entries = [];
  }

  return patient;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = { id: uuidv4(), ...entry };
  patientData.push(newPatient);
  return newPatient;
};

export default { getPatients, getPublicPatients, getPatient, addPatient };
