import { NewPatient, Gender } from "./types";

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
    throw new Error(`Incorrect of missing gender: ${gender}`);
  }

  return gender;
};

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString(object.name, "name"),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, "occupation"),
  };
};

export default toNewPatient;
