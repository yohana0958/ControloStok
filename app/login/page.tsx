'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import Swal from 'sweetalert2';
export default function Login() {
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');
const router = useRouter();


const handleLogin = async (e: React.FormEvent) => {
e.preventDefault();
try {
const { data } = await api.post('/usuarios/login', { email,
senha });
localStorage.setItem('userLogado', JSON.stringify(data));
router.push('/dashboard');
} catch {
Swal.fire('Falha', 'Motivo: Credenciais incorretas.', 'error');
setSenha('');
}
};
return (
<div className="flex h-screen items-center justify-center bg-sl
ate-100">
<form onSubmit={handleLogin} className="bg-white p-8 rounde
d-lg shadow-lg w-96 border">
<h2 className="text-2xl font-bold mb-6 text-center text
-slate-800">Acesso ao Almoxarifado</h2>
<input type="email" placeholder="E-mail" required value

={email} onChange={e => setEmail(e.target.value)} className="w-full mb-
4 p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500" />

<input type="password" placeholder="Palavra-passe" required value={senha} onChange={e => setSenha(e.target.value)} className
="w-full mb-6 p-2 border rounded outline-none focus:ring-2 focus:ring-b
lue-500" />
<button type="submit" className="w-full bg-blue-600 hov
er:bg-blue-700 text-white p-2 rounded font-semibold transition-colors">
Entrar</button>
</form>
</div>
);
}