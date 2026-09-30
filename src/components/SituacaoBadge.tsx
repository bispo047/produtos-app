import { StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme/cores';

export function SituacaoBadge({ ativo }: { ativo: boolean }) {
  const cor = ativo ? cores.ativo : cores.inativo;

  return (
    <View style={[styles.badge, { borderColor: cor }]}>
      <View style={[styles.ponto, { backgroundColor: cor }]} />
      <Text style={[styles.texto, { color: cor }]}>{ativo ? 'Ativo' : 'Inativo'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderRadius: 4,
  },
  ponto: { width: 6, height: 6, borderRadius: 3 },
  texto: { fontSize: 11, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
});