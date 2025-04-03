import axios from 'axios'

export async function createPoll({ title, options }) {
  const response = await axios.post(`${import.meta.env.VITE_BASEURL}/polls`, {
    title,
    options,
  })
  return response.data
}

export async function getPoll(id) {
  const response = await axios.get(
    `${import.meta.env.VITE_BASEURL}/polls/${id}`
  )
  console.log(response.data)
  return response.data
}
