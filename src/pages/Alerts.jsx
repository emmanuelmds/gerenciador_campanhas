import React, { useState } from 'react'
    import { BellIcon, CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid'

    const alertTypes = [
      { id: 'all', name: 'Todos' },
      { id: 'performance', name: 'Desempenho' },
      { id: 'budget', name: 'Orçamento' },
      { id: 'approval', name: 'Aprovação' },
      { id: 'system', name: 'Sistema' }
    ]

    const alertStatus = [
      { id: 'all', name: 'Todos' },
      { id: 'unread', name: 'Não Lidos' },
      { id: 'read', name: 'Lidos' },
      { id: 'resolved', name: 'Resolvidos' }
    ]

    const sampleAlerts = [
      {
        id: 1,
        type: 'performance',
        status: 'unread',
        title: 'CTR abaixo do esperado',
        description: 'O CTR da campanha "Verão 2024" está 15% abaixo da média histórica.',
        date: '2024-01-15T09:30:00',
        platform: 'Facebook'
      },
      {
        id: 2,
        type: 'budget',
        status: 'read',
        title: 'Orçamento próximo ao limite',
        description: 'A campanha "Lançamento Produto X" está com 85% do orçamento utilizado.',
        date: '2024-01-14T16:45:00',
        platform: 'Google Ads'
      },
      {
        id: 3,
        type: 'approval',
        status: 'resolved',
        title: 'Anúncio aprovado',
        description: 'O anúncio "Promoção de Verão" foi aprovado e está ativo no Instagram.',
        date: '2024-01-13T11:15:00',
        platform: 'Instagram'
      },
      {
        id: 4,
        type: 'system',
        status: 'unread',
        title: 'Manutenção programada',
        description: 'O sistema estará indisponível para manutenção no dia 20/01 das 02:00 às 04:00.',
        date: '2024-01-12T14:00:00',
        platform: 'Sistema'
      }
    ]

    function Alerts() {
      const [selectedType, setSelectedType] = useState('all')
      const [selectedStatus, setSelectedStatus] = useState('all')
      const [selectedAlert, setSelectedAlert] = useState(null)

      const filteredAlerts = sampleAlerts.filter(alert => {
        const typeMatch = selectedType === 'all' || alert.type === selectedType
        const statusMatch = selectedStatus === 'all' || alert.status === selectedStatus
        return typeMatch && statusMatch
      })

      const getAlertIcon = (type) => {
        switch (type) {
          case 'performance':
            return <ExclamationCircleIcon className="h-6 w-6 text-yellow-500" />
          case 'budget':
            return <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
          case 'approval':
            return <CheckCircleIcon className="h-6 w-6 text-green-500" />
          case 'system':
            return <InformationCircleIcon className="h-6 w-6 text-blue-500" />
          default:
            return <BellIcon className="h-6 w-6 text-gray-500" />
        }
      }

      return (
        <div className="p-8 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Alertas</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filtros */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Filtros</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Alerta</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {alertTypes.map(type => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {alertStatus.map(status => (
                          <option key={status.id} value={status.id}>{status.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lista de Alertas */}
              <div className="lg:col-span-3">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-6">Alertas Recentes</h2>
                  
                  {filteredAlerts.length > 0 ? (
                    <div className="space-y-4">
                      {filteredAlerts.map(alert => (
                        <div
                          key={alert.id}
                          className={`p-4 border-l-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                            alert.status === 'unread' ? 'border-blue-500' : 'border-gray-300'
                          }`}
                          onClick={() => setSelectedAlert(alert)}
                        >
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              {getAlertIcon(alert.type)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-800">{alert.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                <span>{new Date(alert.date).toLocaleString()}</span>
                                <span>•</span>
                                <span>{alert.platform}</span>
                              </div>
                            </div>
                            {alert.status === 'unread' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Novo
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">Nenhum alerta encontrado com os filtros selecionados.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Detalhes do Alerta */}
            {selectedAlert && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-800">{selectedAlert.title}</h2>
                      <button
                        onClick={() => setSelectedAlert(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getAlertIcon(selectedAlert.type)}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{selectedAlert.description}</p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span>{new Date(selectedAlert.date).toLocaleString()}</span>
                          <span>•</span>
                          <span>{selectedAlert.platform}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                        onClick={() => setSelectedAlert(null)}
                      >
                        Fechar
                      </button>
                      {selectedAlert.status === 'unread' && (
                        <button
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                          onClick={() => {
                            setSelectedAlert({...selectedAlert, status: 'read'})
                            // Aqui você pode adicionar a lógica para marcar como lido no backend
                          }}
                        >
                          Marcar como Lido
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }

    export default Alerts
