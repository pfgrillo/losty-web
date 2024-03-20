import axios from 'axios';

export function buildAuthHttpHeaders(token: string) {
  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  return headers;
}