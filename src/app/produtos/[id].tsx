import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Botao } from '../../components/Botao';
import { Tela } from '../../components/Tela';
import { useProdutos } from '../../context/ProdutosContext';
import { useVoltarParaInicio } from '../../hooks/useVoltarParaInicio';
import { cores } from '../../theme/cores';
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
        <Text style={styles.aviso}>Produto não encontrado</Text>
        <Botao texto="Voltar para a tela inicial" onPress={voltar} />
      </Tela>
    );
  }

  return (
    <Tela>
      <View style={styles.cartao}>
        <Text style={styles.rotulo}>Nome</Text>
        <Text style={styles.valor}>{produto.nome}</Text>

        <Text style={styles.rotulo}>Preço</Text>
        <Text style={styles.valor}>{formatarPreco(produto.preco)}</Text>

        <Text style={styles.rotulo}>Situação</Text>
        <Text style={styles.valor}>{produto.ativo ? 'Ativo' : 'Inativo'}</Text>
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
    padding: 16,
    gap: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: cores.borda,
    backgroundColor: cores.superficie,
  },
  rotulo: { fontSize: 14, color: cores.textoApoio, marginTop: 8 },
  valor: { fontSize: 18, fontWeight: '600', color: cores.texto },
  aviso: { fontSize: 18, fontWeight: '600', color: cores.texto },
});