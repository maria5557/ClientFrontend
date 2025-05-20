'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginClient } from '@/common/components/ClientComponent/infraestructure/functions'; 
import Cookies from 'js-cookie';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const token = await loginClient(email, password);

      Cookies.set('authToken', token.jwt, {
        expires: 1,
        path: '/',
      });

      console.log('Token guardado:', token);
      router.push('/clients');
    } catch (err: any) {
      console.error('Error de login:', err);
      alert('Login fallido: ' + (err?.body || 'Error desconocido'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Iniciar sesión</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Correo electrónico</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
