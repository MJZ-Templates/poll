import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PollForm from '../components/PollForm';
import { createPoll } from '../services/api';

export default function CreatePollPage() {
  const navigate = useNavigate();

  const handleCreatePoll = async (title, options) => {
    try {
      const data = await createPoll({title, options});
      navigate(`/polls/${data.id}`);
    } catch (error) {
      console.error('Error creating poll:', error);
    }

  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create a New Poll
        </Typography>
        <PollForm onSubmit={handleCreatePoll} />
      </Box>
    </Container>
  );
}
