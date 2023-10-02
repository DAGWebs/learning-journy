// Import the axios library to make HTTP requests
import axios from "axios";

/**
 * Fetches an image from the Unsplash API based on a provided query string.
 *
 * @param {string} query - The search term to use for fetching an image from Unsplash.
 * @returns {string} - The URL of the image stored in small_s3 format.
 *
 * @example
 * const imageUrl = await getUnsplashImage('sunrise');
 * console.log(imageUrl); // Outputs the URL of an image of a sunrise from Unsplash.
 */
export const getUnsplashImage = async (query: string) => {
  // Make a GET request to the Unsplash API with the provided query and API key.
  const { data } = await axios.get(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_API_KEY}`
  );

  // Extract and return the small_s3 format URL of the first image result.
  return data.results[0].urls.small_s3;
};
