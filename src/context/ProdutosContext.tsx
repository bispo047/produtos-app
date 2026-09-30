import { createContext, ReactNode, useContext, useState } from 'react';
import { NovoProduto, Produto } from '../types/produto';
import { gerarId } from '../utils/id';

type ProdutosContextValue = {
  produtos: Produto[];
  cadastrarProduto: (dados: NovoProduto) => void;
  alternarSituacao: (id: string) => void;
};

const ProdutosContext = createContext<ProdutosContextValue | undefined>(undefined);

export function ProdutosProvider({ children }: { children: ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  function cadastrarProduto(dados: NovoProduto) {
    const novo: Produto = { id: gerarId(), ...dados };
    setProdutos((anteriores) => [...anteriores, novo]);
  }

  function alternarSituacao(id: string) {
    setProdutos((anteriores) =>
      anteriores.map((produto) =>
        produto.id === id ? { ...produto, ativo: !produto.ativo } : produto,
      ),
    );
  }

  return (
    <ProdutosContext.Provider value={{ produtos, cadastrarProduto, alternarSituacao }}>
      {children}
    </ProdutosContext.Provider>
  );
}

export function useProdutos(): ProdutosContextValue {
  const contexto = useContext(ProdutosContext);
  if (!contexto) {
    throw new Error('useProdutos deve ser usado dentro de ProdutosProvider');
  }
  return contexto;
}