import {
    Box,
    Button,
    Container,
    Stack,
    Typography
} from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PollViewer from '../components/PollViewer';

export default function PollDetailPage() {
  const { pollId } = useParams();
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={2} mb={2}>
  <Typography
    variant="h5" // 기존 h4 → h5로 조정 (조금 작게)
    component="h1"
    gutterBottom
    sx={{ fontWeight: 600, textAlign: 'center', color: 'text.primary' }}
  >
    Poll ID: {pollId}
  </Typography>
</Box>


      <PollViewer pollId={pollId} />

      <Stack direction="row" justifyContent="center" mt={4}>
        <Button variant="outlined" color="secondary" onClick={goHome}>
          홈으로 돌아가기
        </Button>
      </Stack>
    </Container>
  );
}
