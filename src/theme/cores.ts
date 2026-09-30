import { Platform } from 'react-native';

export const cores = {
  fundo: '#14181c',
  superficie: '#1f262e',
  superficieAlta: '#2c3440',
  borda: '#3d4a57',
  texto: '#e6edf3',
  textoApoio: '#99aabb',
  destaque: '#00e054',
  textoSobreDestaque: '#0f1316',
  ativo: '#00e054',
  inativo: '#ff8000',
  erro: '#ff6b6b',
};

export const fontes = {
  titulo: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia, serif' }),
};