import { NativeBaseProvider, View } from 'native-base';
import React from 'react';
import AdicionarTarefa from './src/components/AdicionarTarefa';
import ListaTarefas from './src/components/ListaTarefas';
import { ProvedorEstadoGlobal } from './src/hooks/EstadoGlobal';
 
export default function App() {
 
  return (
    <NativeBaseProvider>
      <ProvedorEstadoGlobal>
        <View style={{flex: 1}}>
          <AdicionarTarefa/>
          <ListaTarefas/>
        </View>
      </ProvedorEstadoGlobal>
    </NativeBaseProvider>
  );
}

