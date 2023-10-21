import { create } from 'zustand'

interface ApiUrlStore {
  url: string
  setUrl: (url: string) => void
}

const INITIAL_API_URL = window.localStorage.getItem('apiurl') || 'http://127.0.0.1:3000';

export const useAPIUrl = create<ApiUrlStore>()((set) => ({
  url: INITIAL_API_URL,
  setUrl: (url: string) => {
    window.localStorage.setItem('apiUrl', url);
    set({ url });
  }
}));

interface TokenStore {
  token: string
  setToken: (token: string) => void
}

export const TOKEN_KEY = 'meditoken';
const INITIAL_TOKEN = window.localStorage.getItem(TOKEN_KEY) || '';

export const useToken = create<TokenStore>((set) => ({
  token: INITIAL_TOKEN,
  setToken: (token: string) => {
    window.localStorage.setItem(TOKEN_KEY, token);
    set({ token });
  }
}));
