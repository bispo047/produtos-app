# Registro da sessão com IA — P1 Desenvolvimento Webmobile

Sep 29, 2026 · @Arthur Pereira Bispo

> **Observação:** esta é a sessão de estudo, feita em paralelo (22h54–23h17). O código entregue no repositório foi gerado e corrigido na sessão principal (21h06–23h35), registrada em `docs/uso-de-ia.md`. A estrutura de pastas e os nomes de arquivo citados aqui (`hooks/useProdutos.tsx`, `app/produtos/novo.tsx`, `catalogo-produtos.zip`) são da versão de estudo e não correspondem ao código final.

## Identificação

Este documento registra a sessão de uso de IA na Avaliação Individual P1 de Desenvolvimento Webmobile, conforme pede a seção 5 do enunciado.

| Item | Valor |
| --- | --- |
| Aluno | Arthur Pereira Bispo — matrícula 2022218480 |
| Disciplina | 2773 - GRA.0734 - Desenvolvimento Webmobile (UFT, Câmpus Palmas) |
| Docente | Prof. Dr. Jackson Gomes de Souza |
| Avaliação | P1 individual — 6,0 pontos (implementação + defesa) |
| Ferramenta de IA | Claude (Anthropic), no app claude.ai |
| Data da sessão | 29/09/2026, das 22h54 às 23h17 (horário de Brasília) |

A transcrição abaixo traz os prompts do aluno na íntegra e as respostas da IA. Trechos de código gerados foram entregues como arquivos e estão referenciados pelo nome; o código final está no repositório do projeto.

## Resumo das etapas

A sessão teve oito interações, do estudo do material até a paleta de cores. A IA foi usada como assistência para estudo do material, da regex, do padrão de TextInput e da análise do enunciado.

| # | Pedido do aluno | O que a IA entregou |
| --- | --- | --- |
| 1 | Considerar o Mini Mural (ramo capitulo-6) e o livro até o cap. 6 | Levantamento da stack, das pastas e dos padrões de cada capítulo |
| 2 | Regra de preço por regex e descrição do app | Primeira versão do app (catalogo-produtos.zip) e regex testada |
| 3 | Seguir o exemplo de TextInput da documentação do React Native | Tela de cadastro reescrita no padrão do exemplo |
| 4 | Analisar o PDF da P1 | Lista dos requisitos, tabela do que faltava e duas inconsistências do enunciado |
| 5 | Dividir em produtos, components, hooks, theme, types e utils | Projeto reorganizado e ajustado a RF1–RF4 e RT1–RT3, com README |
| 6 | Revisar a tela inicial escrita pelo aluno | Revisão com cinco pontos de coerência (imports, rota, exports, fonte, nome de parâmetro) |
| 7 | Paleta inspirada no Letterboxd | Arquivo cores.ts com cores e fontes |
| 8 | Documento da conversa | Este registro |

**Arquivos gerados na sessão:** catalogo-produtos.zip (três versões, a última com a estrutura final) e cores.ts.

**Verificações feitas pela IA:** `npx tsc --noEmit` sem erros, build web do Expo reconhecendo as rotas e teste da regex com os exemplos do enunciado. Os nove cenários do roteiro não foram executados pela IA e ficam para o aluno conferir no app.

## Transcrição

Prompts do aluno reproduzidos como foram enviados. As respostas da IA estão completas no conteúdo; código entregue em arquivo aparece citado pelo nome.

### 1. Estudo do material (22h54)

**Aluno:**

> https://github.com/jacksongomesbr/uft-cc-dwm-mini-mural/tree/capitulo-6 leve em consideração os estudos desse mini mural e os estudos apresentados até o capitulo 6 nesse estudo da matéria de webmobile https://jacksongomesbr.github.io/uft-cc-dwm/

**IA:** Leu o livro até o capítulo 6 e clonou o ramo capitulo-6 do Mini Mural. Respondeu com:

- Stack: Expo + Expo Router + React Native + TypeScript.
- Estrutura do Mini Mural: `types/`, `data/`, `theme/tokens.ts`, `components/` (Cartao, ItemDoMural, NovoRecado, ResumoDoMural) e `app/` com rotas por arquivo.
- Padrões por capítulo: cap. 4 (useState na tela, atualização imutável, callbacks por props); cap. 5 (StyleSheet com tokens, área segura, KeyboardAvoidingView, FlatList, acessibilidade); cap. 6 (abas e pilha aninhada, rota dinâmica `[id].tsx` com `useLocalSearchParams`, `+not-found.tsx`, `Link` com params, `canGoBack()`/`replace('/')`, deep link).
- O que fica fora até o cap. 6: estado compartilhado (Context), bibliotecas de formulário, API, AsyncStorage e testes.
- Limitação observada: no Mini Mural o detalhe lê do arquivo de dados, então um item criado no formulário não abre no detalhe.
- Pediu o enunciado da P1.

### 2. Regra do preço e descrição do app (23h01)

**Aluno:**

> leve em consideração meus estudos basicos de navegação nativa com useroute e os estudos de criação de expressões regulares segundo o seguinte site "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular\_expressions" tenho o objetivo de fomentar o preço de certos produtos de forma obrigatório, a priore deve ser numérico, deve ser um valor positivo (sem sinal), pode ser igual a zero, o separador de casas decimais (quando fornecido) pode ser vírgula ou ponto e, por fim, deve aceitar até duas casas decimais. Exemplos válidos: 12, 12.5, 12,50 e 12.50. Entradas com letras ou qualquer outro caractere que não seja número, vírgula ou ponto devem ser rejeitadas. Exemplos inválidos: 12abc, 12,254, -1, -0.00. Com isso tenho em campo a seguinte atividade e desenvolemento de serviço: Desenvolva um aplicativo para pequenos comerciantes consultarem os produtos que oferecem. O comerciante precisa cadastrar produtos, consultar seus detalhes e indicar quais estão ativos ou inativos. Entregue um aplicativo funcional em React Native com Expo e TypeScript. Use Expo Router para as rotas e navegação com Stack. A lista de produtos deve ser compartilhada por um provider no topo da hierarquia do aplicativo.

**IA:** Montou a primeira versão do app (arquivo catalogo-produtos.zip) a partir da base do Mini Mural. Pontos da resposta:

- Provider no topo: `ProdutosProvider` envolvendo o Stack no `_layout.tsx`, com a lista em `useState` e o hook `useProdutos()`.
- Stack com lista, cadastro e detalhe; navegação com `router.push`, `router.back()` e `router.replace('/')`.
- Regex do preço: `/^\d+([.,]\d{1,2})?$/`. `\d+` só aceita dígitos (rejeita sinal), o grupo final é opcional (ponto ou vírgula + 1 ou 2 casas) e `^`/`$` impedem caracteres extras. Testada com todos os exemplos do enunciado; `12.` também é rejeitado.
- Conversão: troca a vírgula por ponto e grava um `number`.
- Verificação: `npx tsc --noEmit` e build web sem erros.

### 3. Padrão do TextInput (23h05)

**Aluno:**

> https://reactnative.dev/docs/textinput leve em consideração esses estudos de react native. e meu codigo base

```tsx
import {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const TextInputExample = () => {
  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default TextInputExample;
```

**IA:** Reescreveu a tela de cadastro no formato do código base: arrow function com `export default` no fim, estado no padrão `[valor, onChangeValor]`, `keyboardType="numeric"` no preço, estilo `input` com `height: 40`, `margin: 12`, `borderWidth: 1` e `padding: 10`, e `SafeAreaView`. Explicou duas diferenças: o `SafeAreaProvider` fica uma única vez no layout raiz, e o `SafeAreaView` usa `edges={['bottom']}` porque o cabeçalho do Stack já cuida do topo. Também usou `placeholder`, `maxLength`, `multiline` e `returnKeyType` da documentação, e observou que o teclado `numeric` pode permitir `-` no Android, o que a regex rejeita.

### 4. Análise do enunciado (23h08)

**Aluno:**

> &#91;anexo: DWM\_26-2\_P1.pdf\] analise o que vem a ser pedido para com o projeto

**IA:** Resumiu o PDF (escopo, RF1–RF4, RT1–RT3, entrega e rubrica) e comparou com o código da época. Pendências apontadas:

- Lista inicial precisa começar vazia.
- Rota de detalhe deve ser `/produtos/[id]`.
- Formulário precisa do controle ativo/inativo começando em ativo, botão "Cadastrar produto" indisponível com entrada inválida e limpeza explícita após o cadastro.
- Campo de descrição deve sair, pois não está no RF1.
- Tela inicial com as seções "Produtos ativos" e "Produtos inativos" e mensagem de vazio em cada uma.
- Preço sempre no formato R$ 12,50.
- Detalhe com a situação escrita, botão "Desativar/Ativar produto" e retorno à tela inicial também com produto existente.
- README com nome, matrícula, plataforma, limitações, fontes, respostas das perguntas e verificações.

Apontou duas inconsistências no enunciado: o RF2 permite preço zero, mas o cenário 4 manda testar `0` como inválido; e a entrega cita as perguntas da "seção 8", que estão na seção 9. Sugeriu seguir o RF2 e registrar a divergência no README.

### 5. Organização em pastas (23h10)

**Aluno:**

> estou dividindo meu app em pastas propriamente sugeridas nos estudos do mini mural, estou dividindo em produtos, components, hooks, theme, types e utils

**IA:** Reorganizou o projeto e aplicou as pendências da análise (nova versão de catalogo-produtos.zip):

- `app/produtos/novo.tsx` e `app/produtos/[id].tsx`; `app/` só com telas e layouts.
- `hooks/useProdutos.tsx` com o contexto, o `ProdutosProvider` (lista inicial vazia) e as operações `cadastrarProduto`, `alternarSituacao` e `buscarProduto`.
- `components/`: Cartao, ItemProduto e SecaoProdutos.
- `types/produto.ts` com `Produto` e `NovoProduto`; `utils/preco.ts` com regex, conversão e formatação por `toFixed(2)`.
- README com as respostas das quatro perguntas e a tabela dos nove cenários a preencher.
- Verificação: `tsc` sem erros e build web com as rotas `/produtos/novo` e `/produtos/[id]`. Os cenários não puderam ser executados em navegador no ambiente da IA.

### 6. Revisão da tela inicial do aluno (23h13)

**Aluno:** enviou o `index.tsx` gerado na sessão principal (componentes `Botao`, `SecaoProdutos` e `Tela`, resumo com contagem de produtos e navegação para `/cadastro`) e perguntou:

> esse index está ok???

**IA:** Confirmou que a lógica atende o RF3 e a RT2 (partes derivadas da mesma lista com `filter`). Pontos de coerência com o resto do projeto:

1. O import `../context/ProdutosContext` não bate com a pasta `hooks/`.
2. A rota `/cadastro` exige o arquivo `app/cadastro.tsx`; com o formulário em `app/produtos/novo.tsx`, usar `/produtos/novo`.
3. Imports nomeados exigem `export function` nos componentes.
4. `fontes.titulo` precisa de fonte carregada com `expo-font` ou deve ser removido.
5. O parâmetro `plural` tem o mesmo nome da função; sugeriu `formaPlural`.

Recomendou conferir `Tela` (SafeAreaView + ScrollView), `key={produto.id}` em SecaoProdutos e rodar `npx tsc --noEmit`.

### 7. Paleta inspirada no Letterboxd (23h15)

**Aluno:** enviou uma captura da página inicial do Letterboxd e escreveu:

> tenho o objetivo de trabalhar com o meu app um front propriamente parecido com o do letterbox trace pra mim as cores.ts, não precisa ser 100 igual

**IA:** Entregou o arquivo cores.ts com `cores` (fundo `#14181c`, superfícies `#1f252d` e `#2c3440`, texto branco e `#99aabb`, ação `#00ac1c`, ativo `#00e054`, inativo `#667788`, erro, alerta e info) e `fontes` (serifa do sistema nos títulos, sem carregar fonte externa). Explicou o texto escuro no botão verde por contraste (cerca de 3:1 com branco contra mais de 5:1 com `#14181c`) e listou ajustes para o tema escuro: `StatusBar` em `light`, cores do cabeçalho do Stack, `TextInput` e `Switch`.

### 8. Registro da sessão (23h17)

**Aluno:**

> faça pra mim um documento dessa nossa conversa

**IA:** Criou este documento.

## Decisões técnicas e pontos para a defesa

As decisões abaixo foram tomadas ou confirmadas pelo aluno durante a sessão e são as que mais devem aparecer na defesa.

| Decisão | Onde está | Por quê |
| --- | --- | --- |
| Provider único envolvendo o Stack | `app/_layout.tsx` | Todas as telas do Stack ficam abaixo dele e leem a mesma lista (RT2) |
| Lista começa vazia e vive só na memória | `hooks/useProdutos.tsx` | Recarregar volta ao estado inicial; persistência está fora do escopo |
| Atualização imutável com o estado anterior | `cadastrarProduto` e `alternarSituacao` | `[...anteriores, novo]` e `map` com `{ ...produto, ativo: !produto.ativo }` só no id escolhido |
| Detalhe recebe só o id | `app/produtos/[id].tsx` | `useLocalSearchParams` + `buscarProduto(id)` mostram sempre o dado atual |
| Retorno sem histórico | Detalhe e cadastro | `router.canGoBack()` ? `router.back()` : `router.replace('/')` |
| Ativos e inativos derivados | `app/index.tsx` | Dois `filter` sobre a mesma lista, sem cópias em estado |
| Regex do preço | `utils/preco.ts` | `^\d+([.,]\d{1,2})?$`: sem sinal, separador opcional, até duas casas |
| Preço formatado à mão | `formatarPreco` | `toFixed(2)` + vírgula garante sempre R$ 12,50 |
| Preço zero aceito | README, limitações | Segue o RF2, apesar de o cenário 4 listar `0` como inválido |
| Texto escuro no botão verde | `theme/cores.ts` | Contraste acima de 5:1 contra cerca de 3:1 com texto branco (RT3) |

**Pendências do aluno antes da entrega:** preencher a matrícula e a plataforma testada no README, executar e marcar os nove cenários do roteiro, conferir os imports da tela inicial com a estrutura final e anexar este registro à entrega.
