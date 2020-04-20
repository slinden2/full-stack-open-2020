import { State } from "./state";
import { Patient, Diagnose, HealthCheckEntryType } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSE_LIST";
      payload: Diagnose[];
    }
  | {
      type: "ADD_HEALTH_CHECK_ENTRY";
      payload: {
        id: string;
        entry: HealthCheckEntryType;
      };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    // As the patient data are objects instead of an array, UPDATE_PATIENT
    // is identical to ADD PATIENT.
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSE_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case "ADD_HEALTH_CHECK_ENTRY":
      const patient = state.patients[action.payload.id];
      patient.entries = [...patient.entries, action.payload.entry];

      return {
        ...state,
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const updatePatient = (patient: Patient): Action => {
  return {
    type: "UPDATE_PATIENT",
    payload: patient,
  };
};

export const setDiagnoseList = (diagnoses: Diagnose[]): Action => {
  return {
    type: "SET_DIAGNOSE_LIST",
    payload: diagnoses,
  };
};

export const addEntry = (
  patientId: string,
  entry: HealthCheckEntryType
): Action => {
  return {
    type: "ADD_HEALTH_CHECK_ENTRY",
    payload: { id: patientId, entry },
  };
};
