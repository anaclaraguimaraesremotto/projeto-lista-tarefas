import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitulo}>Lista de Tarefas</Text>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#402291',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitulo:{
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
  }
});
