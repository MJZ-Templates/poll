import 'modern-css-reset'
// src/App.jsx
import { Box } from '@mui/material'
import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import CreatePollPage from './pages/CreatePollPage'
import PollDetailPage from './pages/PollDetailPage'

export default function App() {
  return (
    <Box sx={{ pt: 5 }}>
      <Router>
        <Routes>
          <Route path="/" element={<CreatePollPage />} />
          <Route path="/polls/:pollId" element={<PollDetailPage />} />
        </Routes>
      </Router>
    </Box>
  )
}
