import React, { useState } from 'react';
import axios from 'axios';

const CreateBrick: React.FC = () => {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('');
  const [sourcePath, setSourcePath] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post(apiUrl, {
        id: "1",
        name,
        language,
        source_path: sourcePath,
      });
      alert('Brick created successfully!');
      setName('');
      setLanguage('');
      setSourcePath('');
    } catch (error) {
      console.error('Error creating brick:', error);
      alert('Failed to create brick');
    }
  };

  return (
    <div>
      <h2>Create Brick</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Language:
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Source Path:
          <input
            type="text"
            value={sourcePath}
            onChange={(e) => setSourcePath(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateBrick;
