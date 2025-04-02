import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PollForm from '../components/PollForm';

export default function CreatePollPage() {
  const navigate = useNavigate();

  // Dummy function to simulate poll creation
  const handleCreatePoll = (title, options) => {
    const dummyPollId = 'abc123';
    console.log('Created Poll:', { title, options });
    navigate(`/polls/${dummyPollId}`);
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
