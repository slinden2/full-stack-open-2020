import React from "react";
import { useStateValue, updatePatient, addEntry } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, HealthCheckEntryType } from "../types";
import { Header, Icon } from "semantic-ui-react";
import Entries from "./Entries";
import AddEntryForm, { EntryFormValues } from "./AddEntryForm";

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

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<HealthCheckEntryType>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
    } catch (e) {
      console.error(e.response.data);
    }
  };

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
      <Entries data={patient.entries} />
      <Header size="small">Add an entry</Header>
      <AddEntryForm onSubmit={submitNewEntry} />
    </div>
  );
};

export default PatientProfile;
