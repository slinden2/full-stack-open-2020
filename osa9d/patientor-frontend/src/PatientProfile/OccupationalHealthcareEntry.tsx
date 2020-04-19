import React from "react";
import { OccupationalHealthCareEntryType } from "../types";
import { useStateValue } from "../state";
import { Item } from "semantic-ui-react";

interface Props {
  entry: OccupationalHealthCareEntryType;
}

const OccupationalHealthcareEntry: React.FC<Props> = ({ entry }) => {
  const [{ diagnoses }, _dispatch] = useStateValue();

  return (
    <Item>
      <Item.Content>
        <Item.Image
          size="tiny"
          src="https://img.icons8.com/cotton/64/000000/medical-history.png"
        />
        <Item.Header>{entry.date}</Item.Header>
        <Item.Meta>{entry.description}</Item.Meta>
        <Item.Meta>Employer: {entry.employerName}</Item.Meta>
        {entry.sickLeave && (
          <>
            <Item.Meta>
              Sickleave starting date: {entry.sickLeave?.startDate}
            </Item.Meta>
            <Item.Meta>
              Sickleave end date: {entry.sickLeave?.endDate}
            </Item.Meta>
          </>
        )}
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

export default OccupationalHealthcareEntry;
