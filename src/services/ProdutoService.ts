import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { ProdutoProps } from '../interfaces';

export class ProdutoService {
  constructor(private repo: ProdutoRepository) {}

  private mapper(p: any) {
    return {
      id: p.getId,
      codigo: p.getCodigo,
      descricao: p.getDescricao,
      marca: p.getMarca,
      modelo: p.getModelo,
      anoFabricacao: p.getAnoFabricacao,
      veiculosCompativeis: p.getVeiculosCompativeis,
      quantidade: p.getQuantidade,
      valorUnitario: p.getValorUnitario,
      estoqueMinimo: p.getEstoqueMinimo
    };
  }

  async listar() {
    const lista = await this.repo.listarTodos();
    return lista.map(p => this.mapper(p));
  }

  async buscar(id: number) {
    const produto = await this.repo.buscarPorId(id);
    if (!produto) throw new Error('Produto não encontrado.');
    return this.mapper(produto);
  }

  async cadastrar(props: ProdutoProps) {
    if (!props.codigo?.trim() || !props.descricao?.trim()) {
      throw new Error('Código e descrição são obrigatórios.');
    }
    if (props.quantidade < 0 || props.estoqueMinimo < 0 || props.valorUnitario < 0) {
      throw new Error('Quantidade, estoque mínimo e preço não podem ser negativos.');
    }
    if (!props.marca?.trim() || !props.modelo?.trim() || !props.veiculosCompativeis?.trim()) {
      throw new Error('Marca, modelo e veículos compatíveis são obrigatórios.');
    }
    if (!Number.isInteger(props.anoFabricacao) || props.anoFabricacao < 1900 || props.anoFabricacao > new Date().getFullYear() + 1) {
      throw new Error('Informe um ano de fabricação válido.');
    }
    return this.mapper(await this.repo.criar(props));
  }

  async atualizar(id: number, props: Partial<ProdutoProps>) {
    await this.buscar(id);
    if (props.quantidade !== undefined && props.quantidade < 0) throw new Error('A quantidade não pode ser negativa.');
    if (props.estoqueMinimo !== undefined && props.estoqueMinimo < 0) throw new Error('O estoque mínimo não pode ser negativo.');
    if (props.valorUnitario !== undefined && props.valorUnitario < 0) throw new Error('O preço não pode ser negativo.');
    return this.mapper(await this.repo.atualizar(id, props));
  }

  async excluir(id: number) {
    await this.buscar(id);
    return this.repo.excluir(id);
  }
}