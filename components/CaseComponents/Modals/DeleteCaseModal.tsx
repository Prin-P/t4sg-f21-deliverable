/* eslint-disable */

import React, { useState } from "react";
import StyledModal from "./StyledModal";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useMutation, useQuery } from "urql";
import {
  ManagementCategory,
  ManagementContainerQuery,
} from "../CaseManagementContainer";

//Extra feature

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
  })
);

type DeleteCaseModalProps = {
  open: boolean;
  onClose: () => void;
};

const DeleteCaseMutation = `

mutation DeleteCaseMutation($nameCat: bigint = "", $nameCase: String = "") {
  delete_cases(where: {_and: {category: {id: {_eq: $nameCat}}, name: {_eq: $nameCase}}}) {
    affected_rows
  }
}

`;


const DeleteCaseModal: React.FC<DeleteCaseModalProps> = (props) => {
  const classes = useStyles();
  const [nameCat, setNameCat] = useState<number | null>(null);
  const [nameCase, setNameCase] = useState<string>("");
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });

  const [result, executeMutation] = useMutation(DeleteCaseMutation);

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <Typography variant="h4" align="center">
        Delete Case
      </Typography>
      <Box>
        
        {data ? (
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category of case to be changed</InputLabel>
            <Select
              labelId="category-select-label"
              fullWidth
              value={nameCat}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setNameCat(event.target.value as number);
              }}
            >
              
              {data
                ? data.category.map((category: any, index:number) => {
                  return <MenuItem key={index} value={category.id}>
                    {category.name} 
                  </MenuItem>
                })
              : "Something went wrong"}
            </Select>
          </FormControl>
        ) : fetching ? (
          "Loading Categories"
        ) : null}

        
        <TextField
          id="standard-full-width"
          label="Name of case to be changed"
          placeholder="Example Case Name"
          fullWidth
          margin="normal"
          value={nameCase}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNameCase(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Box mt="10px" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => {
            executeMutation({
              nameCase,
              nameCat,
              
            });
            props.onClose();
          }}
        >
          Submit
        </Button>
      </Box>
    </StyledModal>
  );
};
export default DeleteCaseModal;
