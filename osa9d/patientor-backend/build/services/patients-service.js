"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const getPatients = () => {
    return patients_1.default;
};
const getPublicPatients = () => {
    return patients_1.default.map(patient => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
    }));
};
exports.default = { getPatients, getPublicPatients };
