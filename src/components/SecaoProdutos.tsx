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
      <Text style={styles.titulo} accessibilityRole="header">
        {titulo}
      </Text>
      {produtos.length === 0 ? (
        <Text style={styles.vazio}>{mensagemVazia}</Text>
      ) : (
        produtos.map((produto) => <ProdutoItem key={produto.id} produto={produto} />)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  secao: { gap: 8 },
  titulo: { fontSize: 20, fontWeight: '700', color: cores.texto },
  vazio: { fontSize: 15, color: cores.textoApoio, fontStyle: 'italic' },
});