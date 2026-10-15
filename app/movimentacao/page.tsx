
'use client';

import { useState, useEffect, type FormEvent } from 'react';
import api from '../lib/api';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function MovimentacaoEstoque() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [produtoId, setProdutoId] = useState('');
  const [tipo, setTipo] = useState('SAIDA');
  const [quantidade, setQuantidade] = useState('');

  useEffect(() => {
    api.get('/produtos')
      .then((res) => setProdutos(res.data))
      .catch(() => {
        Swal.fire('Erro!', 'Não foi possível carregar os produtos.', 'error');
      });
  }, []);

  const registrar = async (e: FormEvent) => {
    e.preventDefault();

    const user = JSON.parse(
      localStorage.getItem('userLogado') || '{}'
    );

    if (!user.id) {
      Swal.fire('Erro!', 'Usuário não identificado. Faça login novamente.', 'error');
      return;
    }

    if (Number(quantidade) <= 0) {
      Swal.fire('Atenção!', 'Informe uma quantidade maior que zero.', 'warning');
      return;
    }

    try {
      const res = await api.post('/movimentacoes', {
        produtoId: Number(produtoId),
        tipo,
        quantidade: Number(quantidade),
        usuarioId: user.id,
      });

      if (res.data.alerta) {
        Swal.fire(
          'Aviso: Estoque baixo!',
          res.data.alerta,
          'warning'
        );
      } else {
        Swal.fire(
          'Sucesso!',
          'Movimentação registrada.',
          'success'
        );
      }

      setQuantidade('');
      setProdutoId('');

    } catch (error: any) {
      Swal.fire(
        'Erro!',
        error.response?.data?.erro || 'Erro ao registrar movimentação.',
        'error'
      );
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Movimentações de Estoque
        </h1>

        <Link
          href="/dashboard"
          className="text-blue-600 hover:underline"
        >
          Voltar
        </Link>
      </div>

      <form
        onSubmit={registrar}
        className="bg-white p-6 rounded shadow border"
      >
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Produto:
          </label>

          <select
            required
            value={produtoId}
            onChange={(e) => setProdutoId(e.target.value)}
            className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Selecione um produto...</option>

            {produtos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.descricao} (Estoque atual: {p.quantidade})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 font-medium">
              Tipo:
            </label>

            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="ENTRADA">Entrada (+)</option>
              <option value="SAIDA">Saída (-)</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Quantidade:
            </label>

            <input
              type="number"
              min="1"
              required
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white p-3 rounded font-bold hover:bg-emerald-700"
        >
          Guardar Movimentação
        </button>
      </form>
    </div>
  );
}
