import {
  NewPatient,
  Gender,
  Entry,
  EntryType,
  HealthCheckRating,
} from "../types";
import { v4 as uuidv4 } from "uuid";

/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (str: any, field: string): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or missing ${field}: ${str}`);
  }

  return str;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect of missing date: ${date}`);
  }

  return date;
};

const isSsn = (ssn: string): boolean => {
  return /^\d{6}-\d{3}[a-zA-Z0-9]$/.test(ssn);
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error(`Incorrect of missing ssn: ${ssn}`);
  }

  return ssn;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const hasCorrectEntryType = (entry: any): entry is Entry => {
  return Object.values(EntryType).includes(entry.type);
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries.length) return [];

  entries.forEach((entry: any) => {
    if (!hasCorrectEntryType(entry)) {
      throw new Error(`Incorrect or missing type: ${entry}`);
    }
  });

  return entries;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString(object.name, "name"),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, "occupation"),
    entries: parseEntries(object.entries),
  };
};

const isEntryType = (entry: any): entry is EntryType => {
  return Object.values(EntryType).includes(entry);
};

const parseEntryType = (entry: unknown): EntryType => {
  if (!isEntryType(entry)) {
    throw new Error(`Incorrect or missing type: ${entry}`);
  }

  return entry;
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error(`Incorrect or missing health check rating: ${rating}`);
  }

  return rating;
};

// const assertNever = (value: never) => {
//   throw new Error(
//     `Unhandled discriminated union member: ${JSON.stringify(value)}`
//   );
// };

const toNewEntry = (object: any): Entry => {
  const commonProps = {
    id: uuidv4(),
    description: parseString(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, "specialist"),
    diagnosisCodes: object.diagnosisCodes,
  };

  const entryType = parseEntryType(object.type);

  switch (entryType) {
    case "HealthCheck":
      return {
        ...commonProps,
        type: entryType,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case "OccupationalHealthcare":
      return {
        ...commonProps,
        type: entryType,
        employerName: parseString(object.employerName, "employerName"),
        sickLeave: {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate),
        },
      };
    case "Hospital":
      return {
        ...commonProps,
        type: entryType,
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseString(object.discharge.criteria, "criteria"),
        },
      };
    default:
      throw new Error("Exhaustive type checking");
    // return assertNever(entryType);
  }
};

export { toNewPatient, toNewEntry };
