import { createContext, useState, useEffect } from 'react';
import axios from '../axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) setUser({ username });
    // (선택) /users/me/ API 호출로 더 정확한 정보를 가져와도 좋습니다.
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
