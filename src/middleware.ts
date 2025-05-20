import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value

  const isLoginPage = request.nextUrl.pathname === '/login'

  if (!token && !isLoginPage) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Si hay token o está en la página de login, permitir acceso
  return NextResponse.next()
}

// Aplica el middleware solo a las rutas deseadas
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
