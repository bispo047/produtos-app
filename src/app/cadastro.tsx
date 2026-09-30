import { useState } from 'react';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Botao } from '../components/Botao';
import { Tela } from '../components/Tela';
import { useProdutos } from '../context/ProdutosContext';
import { useVoltarParaInicio } from '../hooks/useVoltarParaInicio';
import { cores } from '../theme/cores';
import { converterPreco, validarPreco } from '../utils/preco';

const TOCADO_INICIAL = { nome: false, preco: false };

export default function TelaCadastro() {
  const { cadastrarProduto } = useProdutos();
  const voltar = useVoltarParaInicio();

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [ativo, setAtivo] = useState(true);
  const [tocado, setTocado] = useState(TOCADO_INICIAL);

  const erroNome = nome.trim().length === 0 ? 'Informe o nome do produto.' : null;
  const erroPreco = validarPreco(preco);
  const podeCadastrar = erroNome === null && erroPreco === null;

  function limparFormulario() {
    setNome('');
    setPreco('');
    setAtivo(true);
    setTocado(TOCADO_INICIAL);
  }

  function cadastrar() {
    if (!podeCadastrar) {
      return;
    }
    cadastrarProduto({ nome: nome.trim(), preco: converterPreco(preco), ativo });
    limparFormulario();
    voltar();
  }

  return (
    <Tela>
      <View style={styles.campo}>
        <Text style={styles.rotulo} nativeID="rotulo-nome">
          Nome do produto
        </Text>
        <TextInput
          style={[styles.entrada, tocado.nome && erroNome && styles.entradaErro]}
          value={nome}
          onChangeText={(texto) => {
            setNome(texto);
            setTocado((atual) => ({ ...atual, nome: true }));
          }}
          onBlur={() => setTocado((atual) => ({ ...atual, nome: true }))}
          placeholder="Ex.: Arroz 1 kg"
          accessibilityLabel="Nome do produto"
          accessibilityLabelledBy="rotulo-nome"
        />
        {tocado.nome && erroNome && (
          <Text style={styles.erro} accessibilityLiveRegion="polite">
            {erroNome}
          </Text>
        )}
      </View>

      <View style={styles.campo}>
        <Text style={styles.rotulo} nativeID="rotulo-preco">
          Preço (R$)
        </Text>
        <TextInput
          style={[styles.entrada, tocado.preco && erroPreco && styles.entradaErro]}
          value={preco}
          onChangeText={(texto) => {
            setPreco(texto);
            setTocado((atual) => ({ ...atual, preco: true }));
          }}
          onBlur={() => setTocado((atual) => ({ ...atual, preco: true }))}
          placeholder="Ex.: 12,50"
          accessibilityLabel="Preço em reais"
          accessibilityLabelledBy="rotulo-preco"
        />
        {tocado.preco && erroPreco && (
          <Text style={styles.erro} accessibilityLiveRegion="polite">
            {erroPreco}
          </Text>
        )}
      </View>

      <View style={styles.linhaSituacao}>
        <Text style={styles.rotulo}>Situação: {ativo ? 'Ativo' : 'Inativo'}</Text>
        <Switch
          value={ativo}
          onValueChange={setAtivo}
          accessibilityLabel="Produto ativo"
        />
      </View>

      <Botao texto="Cadastrar produto" onPress={cadastrar} disabled={!podeCadastrar} />

      {!podeCadastrar && (
        <Text style={styles.dica}>
          Preencha nome e preço válidos para liberar o cadastro.
        </Text>
      )}
    </Tela>
  );
}

const styles = StyleSheet.create({
  campo: { gap: 6 },
  rotulo: { fontSize: 16, fontWeight: '600', color: cores.texto },
  entrada: {
    minHeight: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: 8,
    backgroundColor: cores.superficie,
    color: cores.texto,
  },
  entradaErro: { borderColor: cores.erro, borderWidth: 2 },
  erro: { color: cores.erro, fontSize: 14 },
  linhaSituacao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dica: { fontSize: 14, color: cores.textoApoio },
});