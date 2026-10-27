import axios from './axios';

export async function fetchTmdbResults(requestPath) {
  try {
    const response = await axios.get(requestPath);
    return response.data.results ?? [];
  } catch (error) {
    // The query string carries the API key; keep it out of the console.
    const endpoint = requestPath.split('?')[0];
    console.warn(`TMDB request failed for ${endpoint}: ${error.message}`);
    return [];
  }
}
