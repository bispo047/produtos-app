import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProdutosProvider } from '../context/ProdutosContext';
import { cores, fontes } from '../theme/cores';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ProdutosProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: cores.fundo },
            headerTintColor: cores.texto,
            headerTitleStyle: { fontFamily: fontes.titulo, fontWeight: '700' },
            headerShadowVisible: false,
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