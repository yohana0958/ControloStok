'use client';

import { useState, useEffect, type FormEvent } from 'react';
import api from '../lib/api';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function MovimentacaoEstoque() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [historico, setHistorico] = useState<any[]>([]);
  const [produtoId, setProdutoId] = useState('');
  const [tipo, setTipo] = useState('SAIDA');
  const [quantidade, setQuantidade] = useState('');
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));

  const carregarDados = async () => {
    try {
      const [produtosRes, movimentacoesRes] = await Promise.all([
        api.get('/produtos'),
        api.get('/movimentacoes')
      ]);
      setProdutos(produtosRes.data);
      setHistorico(movimentacoesRes.data);
    } catch {
      Swal.fire('Erro!', 'Não foi possível carregar os produtos e o histórico.', 'error');
    }
  };

  useEffect(() => { carregarDados(); }, []);

  const registrar = async (e: FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('userLogado') || '{}');
    if (!user.id) {
      Swal.fire('Erro!', 'Usuário não identificado. Faça login novamente.', 'error');
      return;
    }
    if (!produtoId || !Number.isInteger(Number(quantidade)) || Number(quantidade) <= 0) {
      Swal.fire('Atenção!', 'Selecione um produto e informe uma quantidade inteira maior que zero.', 'warning');
      return;
    }
    try {
      const res = await api.post('/movimentacoes', {
        produtoId: Number(produtoId),
        tipo,
        quantidade: Number(quantidade),
        usuarioId: user.id,
        data: new Date(`${data}T12:00:00`).toISOString()
      });
      if (res.data.alerta) await Swal.fire('Aviso: estoque mínimo', res.data.alerta, 'warning');
      else await Swal.fire('Sucesso!', 'Movimentação registrada.', 'success');
      setQuantidade('');
      setProdutoId('');
      await carregarDados();
    } catch (error: any) {
      Swal.fire('Erro!', error.response?.data?.erro || 'Erro ao registrar movimentação.', 'error');
    }
  };

  const formatarData = (valor: string) => new Date(valor).toLocaleString('pt-BR');

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Gestão de Estoque</h1>
        <Link href="/dashboard" className="text-blue-600 hover:underline">Voltar ao menu</Link>
      </div>

      <form onSubmit={registrar} className="bg-white p-6 rounded shadow border mb-8 space-y-4 max-w-2xl">
        <h2 className="text-lg font-bold">Registrar entrada ou saída</h2>
        <div>
          <label className="block mb-2 font-medium">Autopeça:</label>
          <select required value={produtoId} onChange={e => setProdutoId(e.target.value)} className="w-full p-2 border rounded">
            <option value="">Selecione uma autopeça...</option>
            {produtos.slice().sort((a, b) => a.descricao.localeCompare(b.descricao, 'pt-BR')).map(p =>
              <option key={p.id} value={p.id}>{p.descricao} — {p.codigo} (saldo: {p.quantidade})</option>
            )}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div><label className="block mb-2 font-medium">Tipo:</label><select value={tipo} onChange={e => setTipo(e.target.value)} className="w-full p-2 border rounded"><option value="ENTRADA">Entrada (+)</option><option value="SAIDA">Saída (-)</option></select></div>
          <div><label className="block mb-2 font-medium">Quantidade:</label><input type="number" min="1" step="1" required value={quantidade} onChange={e => setQuantidade(e.target.value)} className="w-full p-2 border rounded" /></div>
          <div><label className="block mb-2 font-medium">Data:</label><input type="date" required value={data} onChange={e => setData(e.target.value)} max="9999-12-31" className="w-full p-2 border rounded" /></div>
        </div>
        <button type="submit" className="w-full bg-emerald-600 text-white p-3 rounded font-bold hover:bg-emerald-700">Registrar movimentação</button>
      </form>

      <section>
        <h2 className="text-xl font-bold mb-4">Histórico de movimentações</h2>
        <div className="overflow-x-auto rounded border bg-white shadow">
          <table className="w-full min-w-[750px]">
            <thead className="bg-slate-100 border-b"><tr><th className="p-3 text-left">Data</th><th className="p-3 text-left">Autopeça</th><th className="p-3 text-left">Tipo</th><th className="p-3 text-center">Quantidade</th><th className="p-3 text-left">Responsável</th></tr></thead>
            <tbody className="divide-y">
              {historico.map(m => <tr key={m.id}>
                <td className="p-3">{formatarData(m.data)}</td><td className="p-3">{m.produtoDescricao} <span className="text-slate-500">({m.produtoCodigo})</span></td>
                <td className={`p-3 font-semibold ${m.tipo === 'ENTRADA' ? 'text-emerald-700' : 'text-rose-700'}`}>{m.tipo === 'ENTRADA' ? 'Entrada' : 'Saída'}</td><td className="p-3 text-center">{m.quantidade}</td><td className="p-3">{m.usuarioNome}</td>
              </tr>)}
              {historico.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-slate-500">Nenhuma movimentação registrada.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}