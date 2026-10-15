import Link from "next/link";
export default function Home() {
return (
<main className="flex min-h-screen flex-col items-center justify-ce
nter bg-slate-50 p-8 text-center">

<div className="bg-white p-12 rounded-2xl shadow-lg border max-w-
lg w-full">

<h1 className="text-4xl font-bold text-slate-800 mb-4">
📦 Controlo de Stock
</h1>
<p className="text-slate-600 mb-8 text-lg">
Bem-vindo ao sistema de gestão de almoxarifado. Por favor, in
icie sessão para aceder ao painel.
</p>
<Link
href="/login"
className="inline-block w-full bg-blue-600 text-white px-6 py
-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors
shadow-sm"
>
Aceder ao Sistema
</Link>
</div>
</main>
);
}