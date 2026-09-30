import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Botao } from '../../components/Botao';
import { SituacaoBadge } from '../../components/SituacaoBadge';
import { Tela } from '../../components/Tela';
import { useProdutos } from '../../context/ProdutosContext';
import { useVoltarParaInicio } from '../../hooks/useVoltarParaInicio';
import { cores, fontes } from '../../theme/cores';
import { formatarPreco } from '../../utils/preco';

export default function TelaDetalhe() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { produtos, alternarSituacao } = useProdutos();
  const voltar = useVoltarParaInicio();

  const produto = produtos.find((item) => item.id === id);

  if (!produto) {
    return (
      <Tela>
        <Stack.Screen options={{ title: 'Produto não encontrado' }} />
        <View style={styles.cartao}>
          <Text style={styles.nome}>Produto não encontrado</Text>
          <Text style={styles.apoio}>
            Este endereço não corresponde a nenhum produto cadastrado nesta sessão.
          </Text>
        </View>
        <Botao texto="Voltar para a tela inicial" onPress={voltar} />
      </Tela>
    );
  }

  return (
    <Tela>
      <View style={styles.cartao}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.preco}>{formatarPreco(produto.preco)}</Text>

        <View style={styles.divisor} />

        <View style={styles.linha}>
          <Text style={styles.rotulo}>Situação</Text>
          <View style={styles.situacao}>
            <Text style={styles.valor}>{produto.ativo ? 'Ativo' : 'Inativo'}</Text>
            <SituacaoBadge ativo={produto.ativo} />
          </View>
        </View>
      </View>

      <Botao
        texto={produto.ativo ? 'Desativar produto' : 'Ativar produto'}
        onPress={() => alternarSituacao(produto.id)}
      />
      <Botao texto="Voltar para a tela inicial" onPress={voltar} variante="secundario" />
    </Tela>
  );
}

const styles = StyleSheet.create({
  cartao: {
    padding: 20,
    gap: 8,
    borderRadius: 6,
    backgroundColor: cores.superficie,
  },
  nome: {
    fontFamily: fontes.titulo,
    fontSize: 26,
    fontWeight: '700',
    color: cores.texto,
  },
  preco: { fontSize: 22, fontWeight: '700', color: cores.destaque },
  apoio: { fontSize: 15, color: cores.textoApoio },
  divisor: { height: 1, backgroundColor: cores.borda, marginVertical: 8 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  situacao: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rotulo: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: cores.textoApoio,
  },
  valor: { fontSize: 16, fontWeight: '600', color: cores.texto },
});