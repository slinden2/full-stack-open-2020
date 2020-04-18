"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnoses_route_1 = __importDefault(require("./routes/diagnoses-route"));
const patients_route_1 = __importDefault(require("./routes/patients-route"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
const PORT = 3001;
app.get("/api/ping", (_req, res) => {
    console.log("someone pinged here");
    res.send("pong");
});
app.use("/api/diagnoses", diagnoses_route_1.default);
app.use("/api/patients", patients_route_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
