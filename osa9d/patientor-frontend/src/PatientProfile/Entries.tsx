import React from "react";
import { Entry } from "../types";
import { Header } from "semantic-ui-react";
import EntryComponent from "./EntryComponent";

interface Props {
  data: Entry[];
}

const Entries: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <Header size="small">Entries</Header>
      {data.map(entry => (
        <EntryComponent key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default Entries;
