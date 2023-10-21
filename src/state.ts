import { create } from 'zustand'

interface ApiUrlState {
  url: string
  setUrl: (url: string) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  medifetch: (endpoint: string, init?: RequestInit) => Promise<any>
}

const INITIAL_API_URL = window.localStorage.getItem('apiUrl') || 'http://127.0.0.1:3000';

const API_COLORS = new Map([
  ['GET', '#ea9ac0'],
  ['POST', '#bada55'],
  ['PUT', '#f0a37e'],
  ['PATCH', '#9ea3d3'],
  ['DELETE', '#f0522f'],
]);

export const useAPIUrl = create<ApiUrlState>()((set, get) => ({
  url: INITIAL_API_URL,
  setUrl: (url: string) => {
    window.localStorage.setItem('apiUrl', url);
    set({ url });
  },
  medifetch: (endpoint: string, init?: RequestInit) => {
    // Print method, endpoint, and payload if it exists
    init = {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }
    const METHOD = init?.method || 'GET';
    console.log(
      `%c${METHOD} %c${endpoint}`, `color: ${API_COLORS.get(METHOD)}`, 'color: #fff',
      init?.body ? `\n${JSON.stringify(JSON.parse(init.body as string), null, 2)}` : ''
    );
    return fetch(`${get().url}${endpoint}`, init)
      .then(res => ({ res, data: res.json() }))
      .then(({ data, res }) => {
        data.then(d => {
          console.log(
            res.status, `${res.statusText}`,
            d ? d : ''
          );
        })
        return data;
      })
  }
}));
