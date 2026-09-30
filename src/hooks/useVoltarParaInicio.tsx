import { useRouter } from 'expo-router';

export function useVoltarParaInicio() {
  const router = useRouter();

  return function voltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };
}