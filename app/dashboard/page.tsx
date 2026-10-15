'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
export default function Dashboard() {
const [nome, setNome] = useState('');
const router = useRouter();
useEffect(() => {
const user = localStorage.getItem('userLogado');
if (user) setNome(JSON.parse(user).nome);
else router.push('/login');
}, [router]);
return (
<div className="min-h-screen bg-slate-50 p-8">
<header className="flex justify-between items-center bg-whi
te p-4 rounded shadow mb-8">
<h1 className="text-xl font-bold text-slate-800">Utiliz
ador: {nome}</h1>
<button onClick={() => { localStorage.clear(); router.push('/login'); }} className="text-red-500 hover:text-red-700 font-mediu
m">Sair</button>
</header>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w
-4xl mx-auto">

<Link href="/produtos" className="p-8 bg-white rounded-
xl shadow hover:shadow-md border-t-4 border-blue-500 text-center transi

tion">
<h2 className="text-2xl font-bold text-slate-800">
📦 Gestão de Produtos</h2>
</Link>
<Link href="/movimentacao" className="p-8 bg-white roun
ded-xl shadow hover:shadow-md border-t-4 border-emerald-500 text-center
transition">
<h2 className="text-2xl font-bold text-slate-80
0">🔄 Controlo de Stock</h2>
</Link>
</div>

</div>
);
}