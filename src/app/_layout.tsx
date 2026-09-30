import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProdutosProvider } from '../context/ProdutosContext';
import { cores } from '../theme/cores';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ProdutosProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: cores.superficie },
            headerTintColor: cores.acao,
            contentStyle: { backgroundColor: cores.fundo },
          }}
        >
          <Stack.Screen name="index" options={{ title: 'Meus produtos' }} />
          <Stack.Screen name="cadastro" options={{ title: 'Cadastrar produto' }} />
          <Stack.Screen name="produtos/[id]" options={{ title: 'Detalhes do produto' }} />
        </Stack>
      </ProdutosProvider>
    </SafeAreaProvider>
  );
}