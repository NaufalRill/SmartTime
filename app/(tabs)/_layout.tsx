// Ubah import dari 'Tabs' menjadi 'Stack'
import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    // Gunakan Stack, bukan Tabs
    <Stack screenOptions={{ headerShown: false }}>
      
      {/* Di Stack, Anda TIDAK PERLU menulis href: null */}
      {/* Stack otomatis tidak punya menu bawah */}
      
      <Stack.Screen name="index" />
      <Stack.Screen name="explore" />
      <Stack.Screen name="pages/home" />
      
      {/* ... Anda bahkan tidak perlu mendaftar semua file satu-satu */}
      {/* Stack akan otomatis merender file yang ada di folder ini */}
      
    </Stack>
  );
}