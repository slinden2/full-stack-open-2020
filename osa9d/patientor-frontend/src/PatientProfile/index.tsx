import React from "react";
import { useStateValue, updatePatient, addEntry } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import { Header, Icon, Segment } from "semantic-ui-react";
import Entries from "./Entries";
import EntryFormContainer, { EntryFormValues } from "./EntryFormContainer";

const PatientProfile: React.FC<{ id: string }> = ({ id }) => {
  const [{ patients }, dispatch] = useStateValue();
  const [error, setError] = React.useState<string | undefined>();

  const patient = patients[id];

  const handleError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(undefined);
    }, 10000);
  };

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
        setError(undefined);
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
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
    } catch (e) {
      handleError(`An error occured: ${e.response.data.error}. Try again.`);
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
      {error && <Segment color="red">{error}</Segment>}
      <EntryFormContainer onSubmit={submitNewEntry} />
    </div>
  );
};

export default PatientProfile;
