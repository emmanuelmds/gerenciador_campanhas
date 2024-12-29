import React, { useState } from 'react'
    import { Cog6ToothIcon, UsersIcon, LinkIcon } from '@heroicons/react/24/outline'

    function Settings() {
      const [activeSection, setActiveSection] = useState('users')
      const [menuOpen, setMenuOpen] = useState(false)

      return (
        <div className="min-h-screen bg-gray-50">
          <div className="flex">
            {/* Menu Lateral */}
            <div className={`bg-white w-64 min-h-screen border-r border-gray-200 fixed lg:relative transform transition-transform duration-200 ${
              menuOpen ? 'translate-x-0' : '-translate-x-64 lg:translate-x-0'
            }`}>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Configurações</h2>
              </div>
              <nav className="p-4 space-y-1">
                <button
                  onClick={() => setActiveSection('users')}
                  className={`w-full flex items-center p-2 rounded-lg ${
                    activeSection === 'users'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <UsersIcon className="h-5 w-5 mr-3" />
                  Gerenciamento de Usuários
                </button>
                <button
                  onClick={() => setActiveSection('integrations')}
                  className={`w-full flex items-center p-2 rounded-lg ${
                    activeSection === 'integrations'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <LinkIcon className="h-5 w-5 mr-3" />
                  Integrações de API
                </button>
              </nav>
            </div>

            {/* Conteúdo Principal */}
            <div className="flex-1 lg:ml-64">
              {/* Botão de Toggle para Mobile */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
              >
                <Cog6ToothIcon className="h-6 w-6 text-gray-600" />
              </button>

              <div className="p-8">
                {activeSection === 'users' && <UserManagement />}
                {activeSection === 'integrations' && <APIIntegrations />}
              </div>
            </div>
          </div>
        </div>
      )
    }

    function UserManagement() {
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: ''
      })

      const handleSubmit = (e) => {
        e.preventDefault()
        // Lógica de envio do formulário
      }

      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Gerenciamento de Usuários</h2>
          <form onSubmit={handleSubmit} className="max-w-lg">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">E-mail</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Perfil de Acesso</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="admin">Administrador</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Visualizador</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Salvar Usuário
                </button>
              </div>
            </div>
          </form>
        </div>
      )
    }

    function APIIntegrations() {
      const integrations = [
        {
          name: 'Facebook API',
          connected: false,
          fields: [
            { label: 'Client ID', key: 'clientId' },
            { label: 'Client Secret', key: 'clientSecret' }
          ]
        },
        {
          name: 'Instagram API',
          connected: true,
          fields: [
            { label: 'Client ID', key: 'clientId' },
            { label: 'Client Secret', key: 'clientSecret' }
          ]
        },
        {
          name: 'LinkedIn API',
          connected: false,
          fields: [
            { label: 'Client ID', key: 'clientId' },
            { label: 'Client Secret', key: 'clientSecret' }
          ]
        },
        {
          name: 'Google Ads API',
          connected: false,
          fields: [
            { label: 'Client ID', key: 'clientId' },
            { label: 'Client Secret', key: 'clientSecret' }
          ]
        }
      ]

      return (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Integrações de API</h2>
          <div className="space-y-8">
            {integrations.map((integration, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">{integration.name}</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    integration.connected
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {integration.connected ? 'Conectado' : 'Desconectado'}
                  </div>
                </div>
                <div className="space-y-4">
                  {integration.fields.map((field, i) => (
                    <div key={i}>
                      <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled={integration.connected}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button
                    className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      integration.connected
                        ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                        : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                    }`}
                  >
                    {integration.connected ? 'Desconectar' : 'Conectar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    export default Settings
