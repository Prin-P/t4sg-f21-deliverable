import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import { Box } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "react-bootstrap/Button";
import { useMutation, useQuery } from "urql";

type CaseCardProps = {
  data: CaseData;
};

export type CaseData = {
  name: string;
  status: string;
  description: string;
  id: number;
};

const DeleteACaseMutation = `

mutation DeleteCaseMutation($id: bigint = "") {
  delete_cases(where: {id: {_eq: $id}}) {
    affected_rows
  }
}

`;

const CaseCard: React.FC<CaseCardProps> = (props) => {
  const caseData = props.data;
  const [result, executeMutation] = useMutation(DeleteACaseMutation);
  const id=props.data.id

  return (
    <Container>
      <div style={{ width: "100%", padding: "5px" }}>
        <Card body style={{ backgroundColor: "#e4ebf5" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <CardTitle tag="h3">{caseData.name}</CardTitle>

            {/*New feature*/}
            <Button variant="dark" 
              onClick={() => {
                executeMutation({
                 id
                }), window.location.reload()
              }}
            >
              <CloseIcon />
            </Button>
          </Box>

          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {caseData.status}
          </CardSubtitle>
          <CardText>{caseData.description}</CardText>
        </Card>
      </div>
    </Container>
  );
};
export default CaseCard;
