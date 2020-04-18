import { NewPatient, Gender, Entry, EntryType } from "./types";

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

export default toNewPatient;
