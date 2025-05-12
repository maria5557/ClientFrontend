export function ClientTableSkeleton() {
    return (
      <div className="overflow-hidden border border-gray-200 rounded-lg shadow-md animate-pulse">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-500">Nombre</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-500">Apellido</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-500">Email</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-500">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index} className="bg-white">
                <td className="px-4 py-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }