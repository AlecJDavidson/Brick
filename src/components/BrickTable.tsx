import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Brick {
  name: string;
  id: number;
  language: string;
  sourcePath: string;
  createdAt: string;
  lastInvoked: string;
}

const BrickTable: React.FC = () => {
  const [bricks, setBricks] = useState<Brick[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setBricks(response.data);
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching bricks:', error);
      });
  }, [apiUrl]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>ID</th>
          <th>Language</th>
          <th>Source Path</th>
          <th>Created At</th>
          <th>Last Invoked</th>
        </tr>
      </thead>
      <tbody>
        {bricks.map(brick => (
          <tr key={brick.id}>
            <td>{brick.name}</td>
            <td>{brick.id}</td>
            <td>{brick.language}</td>
            <td>{brick.sourcePath}</td>
            <td>{new Date(brick.createdAt).toLocaleString()}</td>
            <td>{new Date(brick.lastInvoked).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BrickTable;
