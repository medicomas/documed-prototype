import { create } from 'zustand';
import { LoggedUserInformation } from '../types';
import { medifetch } from '../services/medifetch';
import { useToken } from '../store';

interface UserStateStore {
  user: LoggedUserInformation | null,
  loading: boolean,
  setUserState: ({ user, loading }: { user: LoggedUserInformation | null, loading: boolean }) => void
}

export const useUser = create<UserStateStore>()((set) => ({
  user: null,
  loading: true,
  setUserState: ({ user, loading }) => set({ user, loading })
}));

const tryLogin = async () => {
  try {
    const res = await medifetch('/auth/user');
    if (res.status === 401) {
      throw 69;
    }
    const user = await res.json();
    useUser.setState({
      loading: false,
      user: (user as unknown as LoggedUserInformation)
    });
  }
  catch {
    useUser.setState({
      loading: false,
      user: null
    });
  }
};

useToken.subscribe(s => s.token, (token) => {
  if (!token) {
    useUser.setState({
      loading: false,
      user: null
    });
    return;
  }
  tryLogin();
}, { fireImmediately: true });
