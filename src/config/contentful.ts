import { createClient } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN;

if (!space || !accessToken) {
  throw new Error(
    'CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_TOKEN environment variables are required.'
  );
}

export const client = createClient({
  space,
  accessToken,
});

export async function fetchContent(query:any) {
    try {
      const entries = await client.getEntries(query);
      return entries.items;
    } catch (error) {
      console.error('Error fetching content from Contentful:', error);
      return [];
    }
  }
  
  export async function fetchEntry(id:any) {
    try {
      const entry = await client.getEntry(id);
      return entry;
    } catch (error) {
      console.error(`Error fetching entry with ID ${id} from Contentful:`, error);
      return null;
    }
  }