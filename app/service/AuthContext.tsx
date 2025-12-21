import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Definisikan Tipe User
interface User {
  id: number;
  username: string;
}

// 2. Definisikan Tipe untuk Context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (userData: User) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session saat pertama kali aplikasi dibuka
  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const authDataSerialized = await AsyncStorage.getItem('userSession');
        if (authDataSerialized) {
          setUser(JSON.parse(authDataSerialized) as User);
        }
      } catch (e) {
        console.error("Gagal load session", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const signIn = async (userData: User) => {
    setUser(userData);
    await AsyncStorage.setItem('userSession', JSON.stringify(userData));
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem('userSession');
    console.log("User Logout", user?.id);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook Custom agar mudah dipanggil di halaman lain
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};