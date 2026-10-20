'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../lib/api';
import Swal from 'sweetalert2';

export default function ListaProdutos() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [busca, setBusca] = useState('');
  const carregar = async () => {
    try {
      const res = await api.get('/produtos');
      setProdutos(res.data);
    } catch {
      Swal.fire('Erro', 'Não foi possível carregar as autopeças.', 'error');
    }
  };
  useEffect(() => { carregar(); }, []);

  const excluir = async (id: number) => {
    const confirmacao = await Swal.fire({ title: 'Confirmar exclusão?', text: 'Produtos com movimentações não podem ser excluídos.', icon: 'warning', showCancelButton: true, confirmButtonText: 'Excluir', cancelButtonText: 'Cancelar' });
    if (!confirmacao.isConfirmed) return;
    try {
      await api.delete(`/produtos/${id}`);
      await Swal.fire('Excluído!', 'Autopeça removida com sucesso.', 'success');
      carregar();
    } catch (error: any) {
      Swal.fire('Não foi possível excluir', error.response?.data?.erro || 'Verifique se a autopeça possui movimentações registradas.', 'warning');
    }
  };

  const termo = busca.toLowerCase();
  const filtrados = produtos.filter(p =>
    String(p.codigo).toLowerCase().includes(termo) ||
    String(p.descricao).toLowerCase().includes(termo) ||
    String(p.marca).toLowerCase().includes(termo) ||
    String(p.modelo).toLowerCase().includes(termo)
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between mb-6 items-center gap-4">
        <h1 className="text-2xl font-bold">Catálogo de Autopeças</h1>
        <Link href="/dashboard" className="text-slate-500 hover:underline">Voltar ao menu</Link>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input type="search" placeholder="Pesquisar por código, descrição, marca ou modelo..." value={busca} onChange={e => setBusca(e.target.value)} className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-400" />
        <Link href="/produtos/form" className="bg-blue-600 text-white px-4 py-2 rounded whitespace-nowrap text-center">+ Nova Autopeça</Link>
      </div>
      <div className="overflow-x-auto rounded border bg-white shadow">
        <table className="w-full min-w-[900px]">
          <thead className="bg-slate-100 border-b"><tr>
            <th className="p-3 text-left">Código</th><th className="p-3 text-left">Descrição</th><th className="p-3 text-left">Marca / Modelo</th><th className="p-3 text-left">Veículos compatíveis</th><th className="p-3 text-center">Estoque</th><th className="p-3 text-center">Mínimo</th><th className="p-3 text-center">Ações</th>
          </tr></thead>
          <tbody className="divide-y">
            {filtrados.map(p => <tr key={p.id}>
              <td className="p-3">{p.codigo}</td><td className="p-3 font-medium">{p.descricao}</td><td className="p-3">{p.marca} / {p.modelo}<div className="text-xs text-slate-500">Ano: {p.anoFabricacao || '—'}</div></td><td className="p-3">{p.veiculosCompativeis || '—'}</td>
              <td className={`p-3 text-center ${p.quantidade <= p.estoqueMinimo ? 'text-red-600 font-bold' : ''}`}>{p.quantidade}{p.quantidade <= p.estoqueMinimo && <div className="text-xs">Estoque baixo</div>}</td><td className="p-3 text-center">{p.estoqueMinimo}</td>
              <td className="p-3 text-center space-x-3"><Link href={`/produtos/form?id=${p.id}`} className="text-blue-600 font-medium">Editar</Link><button onClick={() => excluir(p.id)} className="text-red-600 font-medium">Excluir</button></td>
            </tr>)}
            {filtrados.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-slate-500">Nenhuma autopeça encontrada.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}