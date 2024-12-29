import React from 'react'
    import { Link } from 'react-router-dom'
    import { Cog6ToothIcon, BellIcon } from '@heroicons/react/24/outline'

    function Navbar() {
      return (
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Gerenciamento
                </Link>
                <Link to="/cadastro" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Cadastro
                </Link>
                <Link to="/insights" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Insights
                </Link>
                <Link to="/alertas" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Alertas
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/alertas"
                  className="text-gray-500 hover:text-blue-600 p-2 rounded-full relative"
                  title="Alertas"
                >
                  <BellIcon className="h-6 w-6" />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    3
                  </span>
                </Link>
                <Link
                  to="/configuracoes"
                  className="text-gray-500 hover:text-blue-600 p-2 rounded-full"
                  title="Configurações"
                >
                  <Cog6ToothIcon className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      )
    }

    export default Navbar
