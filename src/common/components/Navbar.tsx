'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const linkClass = (path: string) =>
        `px-2 py-1 rounded transition-all hover:text-white hover:bg-blue-700 ${
          pathname === path
            ? 'bg-blue-800 text-white drop-shadow-md font-semibold'
            : 'text-blue-100'
        }`;

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center space-x-10">
        <span className="text-2xl font-bold whitespace-nowrap">Mi Aplicación</span>
        <ul className="flex space-x-6">
          <li><Link href="/" className={linkClass('/')}>Inicio</Link></li>
          <li><Link href="/clients" className={linkClass('/clients')}>Clientes</Link></li>
          <li><Link href="/merchants" className={linkClass('/merchants')}>Merchants</Link></li>
        </ul>
      </div>
    </nav>
  );
}
