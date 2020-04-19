import React from "react";
import { Entry } from "../types";
import { useStateValue } from "../state";

interface Props {
  data: Entry;
}

const EntryComponent: React.FC<Props> = ({ data }) => {
  const [{ diagnoses }, _dispatch] = useStateValue();

  return (
    <div>
      <p>
        {data.date} {data.description}
      </p>
      <ul>
        {data.diagnosisCodes?.map((code, i) => (
          <li key={i}>
            <span>{code}</span> <span>{diagnoses[code]?.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntryComponent;
