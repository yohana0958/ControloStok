'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/api';
import Swal from 'sweetalert2';

function FormularioProdutoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anoFabricacao, setAnoFabricacao] = useState(String(new Date().getFullYear()));
  const [veiculosCompativeis, setVeiculosCompativeis] = useState('');
  const [quantidade, setQuantidade] = useState('0');
  const [valorUnitario, setValorUnitario] = useState('');
  const [estoqueMinimo, setEstoqueMinimo] = useState('10');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    if (!idParam) return;
    api.get(`/produtos/${idParam}`).then(({ data: p }) => {
      setEditandoId(p.id);
      setCodigo(p.codigo ?? '');
      setDescricao(p.descricao ?? '');
      setMarca(p.marca ?? '');
      setModelo(p.modelo ?? '');
      setAnoFabricacao(String(p.anoFabricacao ?? new Date().getFullYear()));
      setVeiculosCompativeis(p.veiculosCompativeis ?? '');
      setQuantidade(String(p.quantidade ?? 0));
      setValorUnitario(String(p.valorUnitario ?? ''));
      setEstoqueMinimo(String(p.estoqueMinimo ?? 10));
    }).catch(() => Swal.fire('Erro', 'Não foi possível carregar o produto.', 'error'));
  }, [idParam]);

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      codigo: codigo.trim(),
      descricao: descricao.trim(),
      marca: marca.trim(),
      modelo: modelo.trim(),
      anoFabricacao: Number(anoFabricacao),
      veiculosCompativeis: veiculosCompativeis.trim(),
      quantidade: Number(quantidade),
      valorUnitario: Number(valorUnitario),
      estoqueMinimo: Number(estoqueMinimo)
    };
    if (payload.quantidade < 0 || payload.valorUnitario < 0 || payload.estoqueMinimo < 0) {
      await Swal.fire('Atenção', 'Quantidade, preço e estoque mínimo não podem ser negativos.', 'warning');
      return;
    }
    try {
      if (editandoId) await api.put(`/produtos/${editandoId}`, payload);
      else await api.post('/produtos', payload);
      await Swal.fire('Sucesso!', 'Autopeça salva com sucesso.', 'success');
      router.push('/produtos');
    } catch (error: any) {
      Swal.fire('Erro!', error.response?.data?.erro || 'Não foi possível salvar a autopeça.', 'error');
    }
  };

  const campo = 'w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500';
  const rotulo = 'block text-sm font-medium text-slate-700 mb-1';

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">{editandoId ? 'Editar Autopeça' : 'Cadastrar Autopeça'}</h1>
        <Link href="/produtos" className="text-slate-500 hover:underline">Voltar</Link>
      </div>
      <form onSubmit={salvar} className="bg-white p-6 rounded-lg shadow border space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className={rotulo}>Código *</label><input className={campo} required maxLength={50} value={codigo} onChange={e => setCodigo(e.target.value)} /></div>
          <div><label className={rotulo}>Descrição da autopeça *</label><input className={campo} required maxLength={255} value={descricao} onChange={e => setDescricao(e.target.value)} /></div>
          <div><label className={rotulo}>Marca *</label><input className={campo} required value={marca} onChange={e => setMarca(e.target.value)} /></div>
          <div><label className={rotulo}>Modelo *</label><input className={campo} required value={modelo} onChange={e => setModelo(e.target.value)} /></div>
          <div><label className={rotulo}>Ano de fabricação *</label><input className={campo} type="number" min="1900" max={new Date().getFullYear() + 1} required value={anoFabricacao} onChange={e => setAnoFabricacao(e.target.value)} /></div>
          <div><label className={rotulo}>Veículos compatíveis *</label><input className={campo} required placeholder="Ex.: Onix, Prisma" value={veiculosCompativeis} onChange={e => setVeiculosCompativeis(e.target.value)} /></div>
          <div><label className={rotulo}>Quantidade em estoque *</label><input className={campo} type="number" min="0" required value={quantidade} onChange={e => setQuantidade(e.target.value)} /></div>
          <div><label className={rotulo}>Preço unitário (R$) *</label><input className={campo} type="number" min="0" step="0.01" required value={valorUnitario} onChange={e => setValorUnitario(e.target.value)} /></div>
          <div><label className={rotulo}>Estoque mínimo *</label><input className={campo} type="number" min="0" required value={estoqueMinimo} onChange={e => setEstoqueMinimo(e.target.value)} /></div>
        </div>
        <p className="text-xs text-slate-500">* Campos obrigatórios.</p>
        <button type="submit" className="w-full mt-4 bg-blue-600 text-white p-3 rounded font-medium hover:bg-blue-700 transition">Salvar Autopeça</button>
      </form>
    </div>
  );
}

export default function FormularioProduto() {
  return <Suspense fallback={<div className="p-8 text-center">Carregando...</div>}><FormularioProdutoContent /></Suspense>;
}