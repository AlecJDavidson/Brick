import React from 'react';
import { useParams } from 'react-router-dom';
import { Brick } from '../types/Brick';
import axios from 'axios';
import { useState, useEffect } from 'react';

const BrickDetails: React.FC = () => {
  const [brick, setBrick] = useState<Brick>({});
  const apiUrl = import.meta.env.VITE_API_URL;

  const { brickId } = useParams<{ brickId: Brick }>();

  useEffect(() => {
    axios
      .get(apiUrl + `/${brickId}`)
      .then((response) => {
        setBrick(response.data.data.brick);
      })
      .catch((error) => {
        console.error('Error fetching bricks:', error);
      });
  }, [apiUrl + `/${brickId}`]);

  return (
    <div>
      <h1>Brick Details</h1>
      <p>Brick Name: {brick.name}</p>
      <p>Brick ID: {brick.id}</p>
      <p>Brick Language: {brick.language}</p>
      <p>Brick Source Path: {brick.source_path}</p>
      <p>Brick Created At: {brick.created_at}</p>
      <p>Brick Last Invoked: {brick.last_invoked}</p>
    </div>
  );
};

export default BrickDetails;
