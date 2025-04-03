import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import {
  Box,
  Button,
  Container,
  IconButton,
  Snackbar,
  Stack,
  styled,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import PollViewer from '../components/PollViewer'
import { getPoll } from '../services/api'

export default function PollDetailPage() {
  const { pollId } = useParams()
  const navigate = useNavigate()
  const [poll, setPoll] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
    } catch (err) {
      alert('Copy failed')
      console.error('Failed to copy link', err)
    }
  }

  useEffect(() => {
    async function fetchPoll() {
      try {
        const data = await getPoll(pollId)
        setPoll(data)
      } catch (err) {
        console.error('Failed to load poll', err)
      }
    }
    fetchPoll()
  }, [pollId])

  const goHome = () => {
    navigate('/')
  }

  return (
    <Container maxWidth="lg">
      <Box mt={2} mb={2}>
        <Typography
          variant="h5"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, textAlign: 'center', color: 'text.primary' }}
        >
          Today's Topic : {poll ? poll.title : 'Loading...'}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        mt={-3}
        mb={1}
      ></Box>
      <Box display="flex" alignItems="center" gap={1} mt={2} mb={2}>
        <StyledInput type="text" value={window.location.href} readOnly />

        <Tooltip title="Copy Link">
          <IconButton onClick={handleCopyLink}>
            <ContentCopyIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Link Copied!"
      />

      {poll ? (
        <PollViewer pollData={poll} />
      ) : (
        <Typography align="center">Loading poll...</Typography>
      )}

      <Stack direction="row" justifyContent="center" mt={4}>
        <Button variant="outlined" color="secondary" onClick={goHome}>
          Go to Home
        </Button>
      </Stack>
    </Container>
  )
}

const StyledInput = styled('input')({
  flexGrow: 1,
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: '14px',
  backgroundColor: '#f9f9f9',
  color: '#333',
})
