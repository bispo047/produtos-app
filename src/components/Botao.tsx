import { Pressable, StyleSheet, Text } from 'react-native';
import { cores } from '../theme/cores';

type BotaoProps = {
  texto: string;
  onPress: () => void;
  disabled?: boolean;
  variante?: 'primario' | 'secundario';
};

export function Botao({ texto, onPress, disabled = false, variante = 'primario' }: BotaoProps) {
  const secundario = variante === 'secundario';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.botao,
        secundario && styles.secundario,
        disabled && styles.desabilitado,
        pressed && styles.pressionado,
      ]}
    >
      <Text style={[styles.texto, secundario && styles.textoSecundario]}>{texto}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  botao: {
    minHeight: 48,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.destaque,
  },
  secundario: {
    backgroundColor: cores.superficieAlta,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  desabilitado: { opacity: 0.35 },
  pressionado: { opacity: 0.8 },
  texto: { color: cores.textoSobreDestaque, fontSize: 16, fontWeight: '700' },
  textoSecundario: { color: cores.texto },
});