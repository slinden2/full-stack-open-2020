import React from "react";
import { HealthCheckEntryType } from "../types";
import { useStateValue } from "../state";
import { Item } from "semantic-ui-react";

interface Props {
  entry: HealthCheckEntryType;
}

const HealthCheckEntry: React.FC<Props> = ({ entry }) => {
  const [{ diagnoses }, _dispatch] = useStateValue();

  return (
    <Item>
      <Item.Content>
        <Item.Image
          size="tiny"
          src="https://img.icons8.com/officel/16/000000/like.png"
        />
        <Item.Header>{entry.date}</Item.Header>
        <Item.Meta>{entry.description}</Item.Meta>
        <Item.Meta>Health-check rating: {entry.healthCheckRating}</Item.Meta>
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

export default HealthCheckEntry;
