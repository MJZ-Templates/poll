import {
  Box,
  Button,
  Container,
  Stack,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PollViewer from '../components/PollViewer';
import { getPoll } from '../services/api';

export default function PollDetailPage() {
  const { pollId } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    async function fetchPoll() {
      try {
        const data = await getPoll(pollId);
        setPoll(data);
      } catch (err) {
        console.error('Failed to load poll', err);
      }
    }
    fetchPoll();
  }, [pollId]);

  const goHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={2} mb={2}>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, textAlign: 'center', color: 'text.primary' }}
        >
          Poll : { poll ? poll.title : 'Loading...' }
        </Typography>
      </Box>

      {poll ? (
        <PollViewer pollData={poll} />
      ) : (
        <Typography align="center">Loading poll...</Typography>
      )}

      <Stack direction="row" justifyContent="center" mt={4}>
        <Button variant="outlined" color="secondary" onClick={goHome}>
          홈으로 돌아가기
        </Button>
      </Stack>
    </Container>
  );
}