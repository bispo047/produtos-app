import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { cores } from '../theme/cores';
import { Produto } from '../types/produto';
import { formatarPreco } from '../utils/preco';

export function ProdutoItem({ produto }: { produto: Produto }) {
  return (
    <Link href={{ pathname: '/produtos/[id]', params: { id: produto.id } }} asChild>
            <Pressable
        accessibilityRole="link"
        accessibilityLabel={`Abrir detalhes de ${produto.nome}, ${formatarPreco(produto.preco)}`}
        style={styles.item}
      >
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.preco}>{formatarPreco(produto.preco)}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  item: {
    minHeight: 48,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.superficie,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  pressionado: { opacity: 0.7 },
  nome: { flex: 1, fontSize: 16, color: cores.texto },
  preco: { fontSize: 16, fontWeight: '600', color: cores.texto },
});