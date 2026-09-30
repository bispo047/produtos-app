# Vitrine — Avaliação P1 de Desenvolvimento Webmobile

**Aluno:** [Arthur Pereira Bispo]
**Matrícula:** [2022218480]
**Disciplina:** GRA.0734 — Desenvolvimento Webmobile (UFT, Câmpus Palmas)
**Docente:** Jackson Gomes de Souza

Aplicativo para pequenos comerciantes cadastrarem produtos, consultarem os detalhes e marcarem quais estão ativos ou inativos. Feito em React Native com Expo (SDK 57), TypeScript e Expo Router.

## Instalação e execução

Requisitos: Node.js LTS e npm.

```
git clone [URL do repositório]
cd produtos-app
npm install
npx expo start
```

Com o servidor rodando, pressione `w` para abrir na web ou leia o QR Code com o Expo Go.

## Plataforma testada

[Web (Google Chrome, Windows) — acrescentar Android/Expo Go se tiver testado]

## Estrutura

```
src/
├── app/                    somente telas e layout (rotas)
│   ├── _layout.tsx         Stack raiz + ProdutosProvider
│   ├── index.tsx           tela inicial (listas de ativos e inativos)
│   ├── cadastro.tsx        formulário de cadastro
│   └── produtos/[id].tsx   detalhe e alteração da situação
├── components/             Botao, ProdutoItem, SecaoProdutos, SituacaoBadge, Tela
├── context/                ProdutosContext.tsx (contexto, provider e hook useProdutos)
├── hooks/                  useVoltarParaInicio
├── theme/                  cores e fontes
├── types/                  tipo Produto
└── utils/                  geração de id e validação/formatação de preço
```

## Verificações

**Tipos:** `npx tsc --noEmit` — [sem erros]

**Cenários da seção 7** (executados na mesma sessão, sem recarregar):

| Cenário | Resultado |
|---|---|
| 1. Partes vazias | [OK] |
| 2. Cadastro ativo ("Arroz 1 kg", 7,50) | [OK] |
| 3. Cadastro inativo ("Café 250 g", 12.90) | [OK] |
| 4. Entrada inválida | [OK — exceto preço 0, ver limitações] |
| 5. Desativação | [OK] |
| 6. Reativação | [OK] |
| 7. Identidade e navegação | [OK] |
| 8. Id inexistente (`/produtos/xyz`) | [OK] |
| 9. Retorno sem histórico | [OK] |

## Decisões e limitações conhecidas

- **Preço zero:** o RF2 diz que o preço "pode ser igual a zero", mas o cenário 4 lista `0` entre as entradas recusadas. Segui o RF2, que é a referência da rubrica (critério A). O preço `0` é aceito.
- **Persistência:** a lista existe só em memória. Recarregar ou fechar o aplicativo volta à lista vazia, como pede o enunciado.
- **Navegação com `router.push` em vez de `Link`:** na web, o `Link` com `asChild` não aplicava o estilo do `Pressable`, e o botão ficava sem fundo. Troquei por `router.push` com `pathname: '/produtos/[id]'` e `params: { id }`, o que mantém a rota dinâmica e passa só o identificador.
- **Teclado do campo de preço:** usei o teclado padrão, e não o numérico, para permitir testar entradas com letras no celular.
- **Botão voltar do cabeçalho:** quando a tela de detalhe é aberta direto pelo endereço, o Stack não mostra a seta de voltar, porque não há histórico. O botão "Voltar para a tela inicial" cobre esse caso.

## Fontes consultadas

- Material da disciplina: https://jacksongomesbr.github.io/uft-cc-dwm/ (capítulos 2 a 6)
- Repositório Mini Mural, ramo `capitulo-6`: https://github.com/jacksongomesbr/uft-cc-dwm-mini-mural
- Documentação do Expo Router: https://docs.expo.dev/router/introduction/
- Documentação do React (Context e useState): https://react.dev/reference/react
- Assistência de IA (Claude, Anthropic). A sessão completa está entregue junto: [link ou arquivo da sessão]

## Respostas da seção 9

**1. Onde o provider está montado? Por que essa posição permite compartilhar a lista?**

Em `src/app/_layout.tsx`, envolvendo o `<Stack>`. O layout raiz é o primeiro componente montado e continua ativo durante toda a navegação. Como `index.tsx`, `cadastro.tsx` e `produtos/[id].tsx` são renderizadas dentro do Stack, todas ficam abaixo do `ProdutosProvider` e leem a mesma instância da lista pelo hook `useProdutos()`. O que o cadastro adiciona aparece na tela inicial e no detalhe porque é o mesmo estado.

**2. Quais dados ficam no estado local, quais ficam no provider e quais são derivados?**

- **Estado local:** os campos do formulário em `cadastro.tsx` (`nome`, `preco`, `ativo` e `tocado`). Só interessam enquanto o produto é digitado e são limpos depois do cadastro.
- **Provider:** a lista `produtos` e as operações `cadastrarProduto` e `alternarSituacao`, em `src/context/ProdutosContext.tsx`.
- **Derivados:** `ativos` e `inativos` em `index.tsx`, calculados com `filter` sobre a mesma lista; `erroNome`, `erroPreco` e `podeCadastrar` em `cadastro.tsx`; e o `produto` localizado com `find` em `produtos/[id].tsx`. Nenhum deles é guardado em estado, então não há cópia que possa ficar desatualizada.

**3. Como a rota identifica o produto? Por que o detalhe consulta o contexto?**

A rota dinâmica `src/app/produtos/[id].tsx` recebe o identificador pela URL, e a tela o lê com `useLocalSearchParams`. Em `ProdutoItem.tsx`, a navegação passa só o `id` (`router.push({ pathname: '/produtos/[id]', params: { id } })`). O detalhe busca o produto no contexto com `produtos.find(...)` porque uma cópia recebida por parâmetro ficaria desatualizada: ao ativar ou desativar, o provider gera um objeto novo, e a tela precisa mostrar o valor atual. Isso também permite abrir o detalhe direto pelo endereço, sem passar pela lista.

**4. Qual função ativa ou desativa um produto? Como funciona a atualização sem mutação?**

`alternarSituacao(id)`, em `ProdutosContext.tsx`. Ela chama `setProdutos` com uma função que recebe o estado anterior e devolve um array novo, criado com `map`. Só o produto com o `id` informado vira um objeto novo (`{ ...produto, ativo: !produto.ativo }`); os outros são mantidos como estão. Nada é alterado no lugar, e o React percebe a mudança pela nova referência do array. Usar o estado anterior garante que a atualização parte do valor mais recente. Ao recarregar o aplicativo, o `useState` do provider é criado de novo com o valor inicial `[]`, e a lista volta vazia.