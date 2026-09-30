import { StyleSheet, Text, View } from 'react-native';
import { cores } from '../theme/cores';
import { Produto } from '../types/produto';
import { ProdutoItem } from './ProdutoItem';

type SecaoProdutosProps = {
  titulo: string;
  produtos: Produto[];
  mensagemVazia: string;
};

export function SecaoProdutos({ titulo, produtos, mensagemVazia }: SecaoProdutosProps) {
  return (
    <View style={styles.secao}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo} accessibilityRole="header">
          {titulo}
        </Text>
        <Text style={styles.contagem}>{produtos.length}</Text>
      </View>

      {produtos.length === 0 ? (
        <Text style={styles.vazio}>{mensagemVazia}</Text>
      ) : (
        produtos.map((produto) => <ProdutoItem key={produto.id} produto={produto} />)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  secao: { gap: 10 },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: cores.borda,
  },
  titulo: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: cores.textoApoio,
  },
  contagem: { fontSize: 13, color: cores.textoApoio },
  vazio: { fontSize: 15, color: cores.textoApoio, paddingVertical: 8 },
});