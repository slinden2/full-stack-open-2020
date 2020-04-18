import React from "react";
import { useStateValue, updatePatient } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Header, Icon } from "semantic-ui-react";

const PatientProfile: React.FC<{ id: string }> = ({ id }) => {
  const [{ patients }, dispatch] = useStateValue();
  const patient = patients[id];

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (err) {
        console.error(err);
      }
    };

    if (!patients[id]?.ssn) {
      fetchPatient(id);
    }
  }, []);

  if (!patient) return null;

  const iconName =
    patient.gender === "male"
      ? "mars"
      : patient.gender === "female"
      ? "venus"
      : "genderless";

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Header>{patient.name}</Header>
        <Icon name={iconName} size="large" />
      </div>
      <p>ssn: {`${patient.ssn}`}</p>
      <p>occupation: {`${patient.occupation}`}</p>
    </div>
  );
};

export default PatientProfile;
