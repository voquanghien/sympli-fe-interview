import React from "react";
import { List, ListItem, Paper, Typography } from "@mui/material";

type SwapiPersonDetailProps = {
  name: string;
  birthYear: string;
  gender: string;
  films: string[];
};

const SwapiPersonDetailPaper = (props: SwapiPersonDetailProps) => {
  const { name, birthYear, gender, films } = props;
  return (
    <Paper>
      <Typography>Name: {name}</Typography>
      <Typography>Birth Year: {birthYear}</Typography>
      <Typography>Gender: {gender}</Typography>
      <Typography>List of films:</Typography>

      <List>
        {films.map((film, index) => (
          <ListItem key={index}>{film}</ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SwapiPersonDetailPaper;
