import { Stack, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { chartColors } from '../constants/charColors'
import useLocalStorage from '../hooks/useLocalStorage'
import { connectSocket, disconnectSocket, sendVote } from '../services/socket'
import PollBarChart from './PollBarChart'

export default function PollViewer({ pollData }) {
  const [poll, setPoll] = useState(pollData)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [storedVotes, setStoredVotes] = useLocalStorage('votedPolls', {})

  const hasVoted = !!(poll?.id && storedVotes[poll.id])

  useEffect(() => {
    if (!poll?.id) return

    connectSocket(poll.id, setPoll)

    return () => {
      disconnectSocket()
    }
  }, [poll?.id])

  const handleVote = (optionId) => {
    if (hasVoted) return
    sendVote(poll.id, optionId)
    setStoredVotes({ ...storedVotes, [poll.id]: true })
  }

  return (
    <Container>
      <PollBarChart options={poll.options} hoveredIndex={hoveredIndex} />

      <Stack spacing={1.5} sx={{ mt: 3 }}>
        {poll.options.map((option, index) => (
          <VoteButton
            key={option.id}
            onClick={() => handleVote(option.id)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            disabled={hasVoted}
            $color={chartColors[index % chartColors.length]}
          >
            ✅ Vote for {option.name}
          </VoteButton>
        ))}
      </Stack>
    </Container>
  )
}

const Container = styled('div')`
  background: #fff;
  padding: 24px;
  margin-top: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`

const VoteButton = styled('button')`
  all: unset;
  cursor: pointer;
  text-align: center;
  font-weight: 500;
  font-size: 1rem;
  padding: 12px 0;
  border-radius: 8px;
  border: 2px solid ${({ $color }) => $color};
  color: ${({ $color }) => $color};
  transition:
    background-color 0.3s,
    color 0.3s;
  width: 100%;

  &:hover {
    background-color: ${({ $color }) => $color};
    color: #fff;
  }

  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`
