import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SecaoProdutos } from '../components/SecaoProdutos';
import { Tela } from '../components/Tela';
import { useProdutos } from '../context/ProdutosContext';
import { cores } from '../theme/cores';

export default function TelaInicial() {
  const { produtos } = useProdutos();

  const ativos = produtos.filter((produto) => produto.ativo);
  const inativos = produtos.filter((produto) => !produto.ativo);

  return (
    <Tela>
      <Link href="/cadastro" asChild>
                <Pressable accessibilityRole="button" style={styles.botao}>
          <Text style={styles.botaoTexto}>Novo produto</Text>
        </Pressable>
      </Link>

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
  botao: {
    minHeight: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.acao,
  },
  pressionado: { opacity: 0.8 },
  botaoTexto: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});