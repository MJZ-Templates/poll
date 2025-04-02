import {
  Button,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function PollViewer({ pollData }) {
  const [poll, setPoll] = useState(pollData);

  const handleVote = (optionId) => {
    const updatedOptions = poll.options.map(opt =>
      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
    );
    setPoll({ ...poll, options: updatedOptions });
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        {poll.title}
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={poll.options}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="votes" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>

      <Stack spacing={2} sx={{ mt: 3 }}>
        {poll.options.map((option) => (
          <Button
            key={option.id}
            variant="contained"
            color="primary"
            onClick={() => handleVote(option.id)}
            fullWidth
          >
            Vote for {option.name}
          </Button>
        ))}
      </Stack>
    </Paper>
  );
}
