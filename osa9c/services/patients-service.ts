import patientData from "../data/patients";
import { Patient, PublicPatient } from "../types";

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
  }));
};

export default { getPatients, getPublicPatients };
