import React from "react";
import { Entry } from "../types";

interface Props {
  data: Entry;
}

const EntryComponent: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <p>
        {data.date} {data.description}
      </p>
      <ul>
        {data.diagnosisCodes?.map((code, i) => (
          <li key={i}>{code}</li>
        ))}
      </ul>
    </div>
  );
};

export default EntryComponent;
