import {createClient} from '@sanity/client';
import {dataset, projectId, token} from './projectDetails';

export const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: true, // Use the CDN for faster responses
  stega: {
    enabled: true,
    studioUrl: 'http://localhost:3333',
  },
  apiVersion: '2024-08-13', // Adjust to your desired API version
});
