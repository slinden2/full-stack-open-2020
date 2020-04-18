"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_service_1 = __importDefault(require("../services/patients-service"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.status(200).json(patients_service_1.default.getPublicPatients());
});
exports.default = router;
