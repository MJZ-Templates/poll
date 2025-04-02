import axios from "axios";

export async function createPoll({ title, options }) {
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/polls`, { title, options });
    console.log(`Poll created with ID: ${response.data.id}`);
    return response.data;
  }
  
  export async function getPoll(id) {
    const response = await axios.get(`${import.meta.env.VITE_BASEURL}/polls/${id}`);
    return response.data;
  }