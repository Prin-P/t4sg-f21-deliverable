import React from "react";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "reactstrap";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import "../../styles/casemanagement.module.css";
import Footer from "./Footer";
import CaseCategory from "./CaseCategory";
import AddCaseModal from "./Modals/AddCaseModal";
import EditCaseModal from "./Modals/EditCaseModal";
import DeleteCaseModal from "./Modals/DeleteCaseModal";
import { useQuery } from "urql";
import AddCategoryModal from "./Modals/AddCategoryModal";

/* 
  FEATURE 1 TODO:
  Write a query that will get the name AND id of 
  every category. Build this query, and verify it 
  works in Hasura, and then paste the query here.

  Make sure to replace the string that is currently
  in this variable 
*/
export const ManagementContainerQuery = `
query QueryCases {
  category {
    name
    id
  }
}
`;
// END TODO

export type ManagementCategory = {
  id: number;
  name: string;
};

const reload=()=>window.location.reload();

const CaseManagementContainer: React.FC = (props) => {
  const [addCaseModalOpen, setAddCaseModalOpen] =
    React.useState<boolean>(false);
  const [addCategoryModalOpen, setAddCategoryModalOpen] =
    React.useState<boolean>(false);
  const [editCaseModalOpen, setEditCaseModalOpen] =
    React.useState<boolean>(false);
  const [deleteCaseModalOpen, setDeleteCaseModalOpen] =
    React.useState<boolean>(false);

  /* NOTE: This uses */
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });

  return (
    <>
      <h5 className="title">Home Page</h5>
      <Grid container spacing={3} >
        {/*
          FEATURE 1 TODO:
          Use the data from the result of the query to render 
          a CaseCategory for every category in the response.
          Remember, the response is stored in the "data" variable!
        */

        <Container
          style={{ width: "100%", borderStyle: "solid", padding: "0.75rem",marginTop: "0.75rem", }}
        >

          <Grid
            container spacing={3}
            direction="row"
            justifyContent="space-evenly"
            alignItems="flex-start"
          >      

              {data
              ? data.category.map((category: any, index: number) => {
                  return <Grid item xs={4} >
                  <CaseCategory key={index} category_id={category.id} />
                  </Grid> 
                })
              : "Something went wrong"}

          </Grid> 

        </Container>

            }

        {/* END TODO */}
      </Grid>

      <AddCaseModal
        onClose={() => {setAddCaseModalOpen(false),
          window.location.reload()}}
        open={addCaseModalOpen}
      />

      <AddCategoryModal
        onClose={() => {setAddCategoryModalOpen(false), 
          window.location.reload()}}
        open={addCategoryModalOpen}
      />

      <EditCaseModal
        onClose={() => {setEditCaseModalOpen(false), 
          window.location.reload()}}
        open={editCaseModalOpen}
      />  

      <DeleteCaseModal
        onClose={() => {setDeleteCaseModalOpen(false), 
          window.location.reload()}}
        open={deleteCaseModalOpen}
      />  

      <Container
        style={{
          width: "45%",
          padding: "0.75rem",
          marginTop: "0.75rem",
          justifyContent:'flex-end',
          alignItems:'spaced-evenly',
         
        }}
      >
        <Button variant="dark" onClick={() => setAddCategoryModalOpen(true)}>
          Add Category
        </Button>{' '}

        <Button variant="dark" onClick={() => "redirect"}>
          Delete Category
        </Button>{' '}

        <Button variant="dark" onClick={() => setAddCaseModalOpen(true)}>
          Add Case
        </Button>{' '}

        <Button variant="dark" onClick={() => setDeleteCaseModalOpen(true)}>
          Delete Case
        </Button>{' '}

        <Button variant="dark" onClick={() => setEditCaseModalOpen(true)}>
          Edit Case
        </Button>{' '}

      </Container>
    </>
  );
};
export default CaseManagementContainer;
