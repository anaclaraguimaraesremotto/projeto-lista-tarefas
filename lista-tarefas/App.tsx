import React from 'react';
import { NativeBaseProvider, Text, Box } from 'native-base';
export default function App() {
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#402291" alignItems="center" justifyContent= "center">
        <Text color="#fff" fontSize={60} fontWeight="bold">Lista de Tarefas</Text>
      </Box>
    </NativeBaseProvider>
  );
}
