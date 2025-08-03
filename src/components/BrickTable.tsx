import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Spacer,
  Table,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Brick } from '../types/Brick';

const apiUrl = import.meta.env.VITE_API_URL;

const invoke = (brick: Brick) => {
  axios
    .get(`${apiUrl}/invoke/${brick.id}`)
    .then(function(response) {
      console.log(response.data.status);
      console.log(response.data.stderr);
      console.log(response.data.stdout);
    })
    .catch(function(error) {
      console.log(error);
    });
};

const BrickTable: React.FC = () => {
  const [bricks, setBricks] = useState<Brick[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setBricks(response.data.bricks);
      })
      .catch((error) => {
        console.error('Error fetching bricks:', error);
      });
  }, [apiUrl]);

  const handleDelete = (brickId: string) => {
    axios
      .delete(`${apiUrl}/${brickId}`)
      .then(() => {
        // Filter out the deleted brick from the state
        setBricks((prevBricks) =>
          prevBricks.filter((brick) => brick.id !== brickId)
        );
      })
      .catch((error) => {
        console.error('Error deleting brick:', error);
      });
  };

  return (
    <div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>Language</Table.ColumnHeader>
            <Table.ColumnHeader>Source Path</Table.ColumnHeader>
            <Table.ColumnHeader>Created At</Table.ColumnHeader>
            <Table.ColumnHeader>Last Invoked</Table.ColumnHeader>
            <Table.ColumnHeader>Invoke</Table.ColumnHeader>
            <Table.ColumnHeader>Details</Table.ColumnHeader>
            <Table.ColumnHeader>Delete</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bricks.map((brick) => (
            <Table.Row key={brick.id}>
              <Table.Cell>{brick.name}</Table.Cell>
              <Table.Cell>{brick.id}</Table.Cell>
              <Table.Cell>{brick.language}</Table.Cell>
              <Table.Cell>{brick.source_path}</Table.Cell>
              <Table.Cell>
                {new Date(brick.created_at).toLocaleString()}
              </Table.Cell>
              <Table.Cell>
                {new Date(brick.last_invoked).toLocaleString()}
              </Table.Cell>
              <Table.Cell>
                <Button onClick={() => invoke(brick)}>Invoke</Button>
              </Table.Cell>
              <Table.Cell>
                <Button onClick={() => navigate(`/brick-details/${brick.id}`)}>
                  Details
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  aria-label="Delete brick"
                  colorScheme="red"
                  background={"red"}
                  size="sm"
                  onClick={() => handleDelete(brick.id)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Spacer paddingTop={5} />
      <Button onClick={() => navigate('/create-brick')} mb={4}>
        Create Brick
      </Button>
    </div>
  );
};

export default BrickTable;
