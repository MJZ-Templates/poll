import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'

export default function PollForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [options, setOptions] = useState(['', ''])

  const handleOptionChange = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const addOption = () => {
    setOptions([...options, ''])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const filteredOptions = options.filter((option) => option.trim() !== '')
    if (title && filteredOptions.length >= 2) {
      onSubmit(title, filteredOptions)
    } else {
      alert('Please enter a title and at least two options.')
    }
  }

  return (
    <Container maxWidth="sm">
      <Card variant="outlined">
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Typography variant="h5" gutterBottom>
              Create a Poll
            </Typography>

            <TextField
              label="Poll Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              sx={{ mb: 3 }}
            />

            <Typography variant="h6" gutterBottom>
              Options
            </Typography>
            <Stack spacing={2} sx={{ mb: 2 }}>
              {options.map((option, index) => (
                <TextField
                  key={index}
                  label={`Option ${index + 1}`}
                  variant="outlined"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  fullWidth
                />
              ))}
            </Stack>

            <Button variant="outlined" onClick={addOption} sx={{ mb: 2 }}>
              Add Option
            </Button>

            <Box textAlign="right">
              <Button variant="contained" color="primary" type="submit">
                Create Poll
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}
