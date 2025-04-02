import {
    Button,
    Container,
    Paper,
    Stack,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function PollViewer({ pollId }) {
  const [pollData, setPollData] = useState({
    title: 'Your Favorite Programming Language?',
    options: [
      { name: 'JavaScript', votes: 5 },
      { name: 'Python', votes: 8 },
      { name: 'Java', votes: 3 },
    ]
  });

  useEffect(() => {
    console.log(`Subscribed to poll: ${pollId}`);
  }, [pollId]);

  const handleVote = (optionName) => {
    setPollData(prev => ({
      ...prev,
      options: prev.options.map(option =>
        option.name === optionName
          ? { ...option, votes: option.votes + 1 }
          : option
      )
    }));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          {pollData.title}
        </Typography>

        <ResponsiveContainer width="100%" height={300}>
        <BarChart width={500} height={300} data={pollData.options}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="votes" fill="#1976d2" />
        </BarChart>
        </ResponsiveContainer>

        <Stack spacing={2} sx={{ mt: 3 }}>
          {pollData.options.map((option, index) => (
            <Button
              key={index}
              variant="contained"
              color="primary"
              onClick={() => handleVote(option.name)}
              fullWidth
            >
              Vote for {option.name}
            </Button>
          ))}
        </Stack>
      </Paper>
    </Container>
  );
}
