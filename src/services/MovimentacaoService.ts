import { MovimentacaoRepository } from '../repositories/MovimentacaoRepository';
import { ProdutoRepository } from '../repositories/ProdutoRepository';
import { MovimentacaoProps } from '../interfaces';

export class MovimentacaoService {
  constructor(
    private movRepo: MovimentacaoRepository,
    private prodRepo: ProdutoRepository
  ) {}

  async registrar(props: MovimentacaoProps) {
    if (!Number.isInteger(props.quantidade) || props.quantidade <= 0) {
      throw new Error('Quantidade deve ser um número inteiro maior que zero.');
    }
    if (!props.produtoId || !props.usuarioId) {
      throw new Error('Selecione o produto e identifique o usuário responsável.');
    }
    if (props.tipo !== 'ENTRADA' && props.tipo !== 'SAIDA') {
      throw new Error('Tipo de movimentação inválido.');
    }
    if (props.data && Number.isNaN(new Date(props.data).getTime())) {
      throw new Error('Data da movimentação inválida.');
    }
    const produto = await this.prodRepo.buscarPorId(props.produtoId);
    if (!produto) throw new Error('Produto não encontrado.');
    if (props.tipo === 'SAIDA' && produto.getQuantidade < props.quantidade) {
      throw new Error('Estoque insuficiente.');
    }

    const novoEstoque = props.tipo === 'ENTRADA'
      ? produto.getQuantidade + props.quantidade
      : produto.getQuantidade - props.quantidade;

    produto.setQuantidade = novoEstoque;
    await this.prodRepo.atualizar(props.produtoId, { quantidade: novoEstoque });
    await this.movRepo.criar(props);

    if (novoEstoque <= produto.getEstoqueMinimo) {
      return { sucesso: true, alerta: `Atenção: ${produto.getDescricao} está com ${novoEstoque} unidade(s), no limite mínimo de ${produto.getEstoqueMinimo}.` };
    }
    return { sucesso: true, alerta: null };
  }

  async listar() {
    const lista = await this.movRepo.listarTodos();
    return lista.map(m => ({
      id: m.id,
      produtoId: m.produto_id,
      produtoDescricao: m.produto.descricao,
      produtoCodigo: m.produto.codigo,
      usuarioId: m.usuario_id,
      usuarioNome: m.usuario.nome,
      tipo: m.tipo,
      quantidade: m.quantidade,
      data: m.data_movimentacao
    }));
  }

  async excluir(id: number) {
    return this.movRepo.excluir(id);
  }
}