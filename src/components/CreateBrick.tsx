import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Heading,
} from '@chakra-ui/react';
import CodeMirror from '@uiw/react-codemirror';

const CreateBrick: React.FC = () => {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState(''); // Default to empty string
  const [sourcePath, setSourcePath] = useState('');
  const [codeContent, setCodeContent] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      // Save the code content to the specified path
      await axios.post(apiUrl, {
        id: "1",
        name,
        language,
        source_path: sourcePath,
        code_content: codeContent,  // Include code content in POST data
      });
      alert('Brick created successfully!');
      setName('');
      setLanguage('');
      setSourcePath('');
      setCodeContent('');
    } catch (error) {
      console.error('Error creating brick:', error);
      alert('Failed to create brick');
    }
  };

  return (
    <Box maxW="lg" mx="auto" mt={5}>
      <Heading textAlign="center">Create Brick</Heading>
      <form onSubmit={handleSubmit}>
        <VStack mt={4}>
          <Box>
            <HStack>
              <label htmlFor="name">Name:</label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </HStack>
          </Box>

          <Box>
            <HStack>
              <label htmlFor="language">Language:</label>
              <Input
                id="language"
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                required
              />
            </HStack>
          </Box>

          <Box>
            <HStack>
              <label htmlFor="sourcePath">Source Path:</label>
              <Input
                id="sourcePath"
                type="text"
                value={sourcePath}
                onChange={(e) => setSourcePath(e.target.value)}
                required
              />
            </HStack>
          </Box>

          {/*<Box>
            <label htmlFor="codeContent">Code:</label>
            <CodeMirror
              id="codeContent"
              height="50vh"
              width="80vh"
              value={codeContent}
              onChange={(value) => setCodeContent(value)}
              options={{
                id: "none",
                lineNumbers: true,
                mode: language === 'Python' ? 'python' : 'shell',
                theme: 'monokai',  // You can change this to any other theme you prefer
                readOnly: false,   // Ensure the editor is not read-only
                tabSize: 4,
                lineWrapping: true, // Enable text wrapping for better readability
                viewportMargin: Infinity, // Ensures that all lines are rendered and visible
              }}
            />
            </Box>
          */}

          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateBrick;
