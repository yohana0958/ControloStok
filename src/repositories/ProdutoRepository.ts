import prisma from '@/src/lib/prisma';
import { ProdutoEntity } from '../entities/ProdutoEntity';
import { ProdutoProps } from '../interfaces';

export class ProdutoRepository {
  private mapear(p: any): ProdutoEntity {
    return new ProdutoEntity({
      id: p.id,
      codigo: p.codigo,
      descricao: p.descricao,
      marca: p.marca,
      modelo: p.modelo,
      anoFabricacao: p.ano_fabricacao,
      veiculosCompativeis: p.veiculos_compativeis,
      quantidade: p.quantidade,
      valorUnitario: Number(p.valor_unitario),
      estoqueMinimo: p.estoque_minimo
    });
  }

  async listarTodos(): Promise<ProdutoEntity[]> {
    const produtos = await prisma.produto.findMany({ orderBy: { descricao: 'asc' } });
    return produtos.map(p => this.mapear(p));
  }

  async buscarPorId(id: number): Promise<ProdutoEntity | null> {
    const produto = await prisma.produto.findUnique({ where: { id } });
    return produto ? this.mapear(produto) : null;
  }

  async criar(props: ProdutoProps): Promise<ProdutoEntity> {
    const produto = await prisma.produto.create({
      data: {
        codigo: props.codigo,
        descricao: props.descricao,
        marca: props.marca,
        modelo: props.modelo,
        ano_fabricacao: props.anoFabricacao,
        veiculos_compativeis: props.veiculosCompativeis,
        quantidade: props.quantidade,
        valor_unitario: props.valorUnitario,
        estoque_minimo: props.estoqueMinimo
      }
    });
    return this.mapear(produto);
  }

  async atualizar(id: number, props: Partial<ProdutoProps>): Promise<ProdutoEntity> {
    const data: any = {};
    if (props.codigo !== undefined) data.codigo = props.codigo;
    if (props.descricao !== undefined) data.descricao = props.descricao;
    if (props.marca !== undefined) data.marca = props.marca;
    if (props.modelo !== undefined) data.modelo = props.modelo;
    if (props.anoFabricacao !== undefined) data.ano_fabricacao = props.anoFabricacao;
    if (props.veiculosCompativeis !== undefined) data.veiculos_compativeis = props.veiculosCompativeis;
    if (props.quantidade !== undefined) data.quantidade = props.quantidade;
    if (props.valorUnitario !== undefined) data.valor_unitario = props.valorUnitario;
    if (props.estoqueMinimo !== undefined) data.estoque_minimo = props.estoqueMinimo;

    const produto = await prisma.produto.update({ where: { id }, data });
    return this.mapear(produto);
  }

  async excluir(id: number): Promise<void> {
    await prisma.produto.delete({ where: { id } });
  }
}