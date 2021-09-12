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

type EditCaseModalProps = {
  open: boolean;
  onClose: () => void;
};

const EditCaseMutation = `

mutation EditCaseMutation($nameCase: String = "", $nameCat: bigint = "", $category_id: Int = 10, $description: String = "", $name: String = "", $status: String = "") {
  update_cases(where: {_and: {name: {_eq: $nameCase}, category: {id: {_eq: $nameCat}}}}, _set: {category_id: $category_id, description: $description, name: $name, status: $status}) {
    affected_rows
  }
}
`;


const EditCaseModal: React.FC<EditCaseModalProps> = (props) => {
  const classes = useStyles();
  const [nameCat, setNameCat] = useState<number | null>(null);
  const [nameCase, setNameCase] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string | null>(null);
  const [category, setCategory] = useState<number | null>(null);
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });

  const [result, executeMutation] = useMutation(EditCaseMutation);

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <Typography variant="h4" align="center">
        Edit Case
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
                ? data.category.map((category, index:number) => {
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


        <TextField
          id="standard-full-width"
          label="Name"
          placeholder="Example Case Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="standard-full-width"
          label="Description"
          placeholder="Example Case Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            fullWidth
            value={status}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setStatus(event.target.value as string);
            }}
          >
            <MenuItem value={"To Do"}>To Do</MenuItem>
            <MenuItem value={"In Progress"}>In Progress</MenuItem>
            <MenuItem value={"Done"}>Done</MenuItem>
          </Select>
        </FormControl>
        {data ? (
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              fullWidth
              value={category}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setCategory(event.target.value as number);
              }}
            >
            
              {data
                ? data.category.map((category, index:number) => {
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
      </Box>
      <Box mt="10px" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => {
            executeMutation({
              nameCase,
              nameCat,
              category_id: category,
              description,
              name,
              status,
              
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
export default EditCaseModal;
