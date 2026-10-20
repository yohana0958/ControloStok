export interface UsuarioProps {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
}
export interface ProdutoProps {
  id?: number;
  codigo: string;
  descricao: string;
  marca: string;
  modelo: string;
  anoFabricacao: number;
  veiculosCompativeis: string;
  quantidade: number;
  valorUnitario: number;
  estoqueMinimo: number;
}
export interface MovimentacaoProps {
  id?: number;
  produtoId: number;
  usuarioId: number;
  tipo: 'ENTRADA' | 'SAIDA';
  quantidade: number;
  data?: Date;
}