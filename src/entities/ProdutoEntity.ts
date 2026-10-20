import { ProdutoProps } from '../interfaces';

export class ProdutoEntity {
  constructor(private props: ProdutoProps) {}

  public get getId() { return this.props.id; }
  public get getCodigo() { return this.props.codigo; }
  public get getDescricao() { return this.props.descricao; }
  public get getMarca() { return this.props.marca; }
  public get getModelo() { return this.props.modelo; }
  public get getAnoFabricacao() { return this.props.anoFabricacao; }
  public get getVeiculosCompativeis() { return this.props.veiculosCompativeis; }
  public get getQuantidade() { return this.props.quantidade; }
  public get getValorUnitario() { return this.props.valorUnitario; }
  public get getEstoqueMinimo() { return this.props.estoqueMinimo; }

  public set setQuantidade(novaQtd: number) {
    this.props.quantidade = novaQtd;
  }

  public isEstoqueBaixo(): boolean {
    return this.props.quantidade <= this.props.estoqueMinimo;
  }
}