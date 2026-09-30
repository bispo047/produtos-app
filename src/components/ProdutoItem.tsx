import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme/cores';
import { Produto } from '../types/produto';
import { formatarPreco } from '../utils/preco';
import { SituacaoBadge } from './SituacaoBadge';

export function ProdutoItem({ produto }: { produto: Produto }) {
  const router = useRouter();

  function abrirDetalhe() {
    router.push({ pathname: '/produtos/[id]', params: { id: produto.id } });
  }

  return (
    <Pressable
      onPress={abrirDetalhe}
      accessibilityRole="link"
      accessibilityLabel={`Abrir detalhes de ${produto.nome}, ${formatarPreco(produto.preco)}`}
      style={({ pressed }) => [styles.item, pressed && styles.pressionado]}
    >
      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={1}>
          {produto.nome}
        </Text>
        <SituacaoBadge ativo={produto.ativo} />
      </View>
      <Text style={styles.preco}>{formatarPreco(produto.preco)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    minHeight: 64,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: cores.superficieAlta,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  pressionado: { backgroundColor: cores.borda },
  info: { flex: 1, gap: 6 },
  nome: { fontSize: 16, fontWeight: '600', color: cores.texto },
  preco: { fontSize: 17, fontWeight: '700', color: cores.texto },
});