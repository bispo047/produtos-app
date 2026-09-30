export type Produto = {
  id: string;
  nome: string;
  preco: number;
  ativo: boolean;
};

export type NovoProduto = Omit<Produto, 'id'>;