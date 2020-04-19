import React from "react";
import { HospitalEntryType } from "../types";
import { useStateValue } from "../state";
import { Item } from "semantic-ui-react";

interface Props {
  entry: HospitalEntryType;
}

const HospitalEntry: React.FC<Props> = ({ entry }) => {
  const [{ diagnoses }, _dispatch] = useStateValue();
  return (
    <Item>
      <Item.Content>
        <Item.Image
          size="tiny"
          src="https://img.icons8.com/metro/26/000000/hospital.png"
        />
        <Item.Header>{entry.date}</Item.Header>
        <Item.Meta>{entry.description}</Item.Meta>
        <Item.Meta>
          Discharged on {entry.discharge.date} on the following criteria:{" "}
          {entry.discharge.criteria}
        </Item.Meta>
        <Item.Extra>
          <ul>
            {entry.diagnosisCodes?.map((code, i) => (
              <li key={i}>
                <span>{code}</span> <span>{diagnoses[code]?.name}</span>
                <br />
              </li>
            ))}
          </ul>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default HospitalEntry;
