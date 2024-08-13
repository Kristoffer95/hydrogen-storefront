import {client} from './client';

export async function loadQuery(query: any, params = {}) {
  return client.fetch(query, params);
}
