

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <body className="bg-gray-100">
          {children}
        </body>
    );
  }