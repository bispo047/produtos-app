import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Botao } from '../components/Botao';
import { SecaoProdutos } from '../components/SecaoProdutos';
import { Tela } from '../components/Tela';
import { useProdutos } from '../context/ProdutosContext';
import { cores, fontes } from '../theme/cores';

function plural(quantidade: number, singular: string, plural: string) {
  return `${quantidade} ${quantidade === 1 ? singular : plural}`;
}

export default function TelaInicial() {
  const { produtos } = useProdutos();
  const router = useRouter();

  const ativos = produtos.filter((produto) => produto.ativo);
  const inativos = produtos.filter((produto) => !produto.ativo);

  return (
    <Tela>
      <View style={styles.resumo}>
        <Text style={styles.resumoTitulo}>Seu catálogo</Text>
        <Text style={styles.resumoTexto}>
          {plural(produtos.length, 'produto', 'produtos')} ·{' '}
          {plural(ativos.length, 'ativo', 'ativos')} ·{' '}
          {plural(inativos.length, 'inativo', 'inativos')}
        </Text>
      </View>

      <Botao texto="Novo produto" onPress={() => router.push('/cadastro')} />

      <SecaoProdutos
        titulo="Produtos ativos"
        produtos={ativos}
        mensagemVazia="Nenhum produto ativo no momento."
      />

      <SecaoProdutos
        titulo="Produtos inativos"
        produtos={inativos}
        mensagemVazia="Nenhum produto inativo no momento."
      />
    </Tela>
  );
}

const styles = StyleSheet.create({
  resumo: { gap: 4, paddingVertical: 8 },
  resumoTitulo: {
    fontFamily: fontes.titulo,
    fontSize: 28,
    fontWeight: '700',
    color: cores.texto,
  },
  resumoTexto: { fontSize: 15, color: cores.textoApoio },
});