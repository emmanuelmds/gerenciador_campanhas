import React, { useState, useRef, useEffect } from 'react'

    const campaigns = [
      {
        id: 1,
        name: 'Campanha de Verão',
        metrics: {
          ctr: 7.8,
          cpc: 0.85,
          impressions: 51000,
          conversions: 1632
        }
      },
      {
        id: 2,
        name: 'Lançamento do Produto X',
        metrics: {
          ctr: 6.5,
          cpc: 1.10,
          impressions: 75000,
          conversions: 2400
        }
      }
    ]

    const experts = [
      { id: 1, name: 'Ana - Especialista em Redes Sociais', expertise: 'Facebook, Instagram' },
      { id: 2, name: 'Carlos - Especialista em Google Ads', expertise: 'Google Ads, SEO' },
      { id: 3, name: 'Mariana - Analista de Dados', expertise: 'Análise de Métricas, Otimização' }
    ]

    const expertParameters = {
      analysisDepth: {
        label: 'Profundidade de Análise',
        value: 'Detalhada',
        description: 'Nível de detalhamento nas análises'
      },
      responseTime: {
        label: 'Tempo de Resposta',
        value: 'Rápido',
        description: 'Velocidade média de resposta'
      },
      expertiseLevel: {
        label: 'Nível de Expertise',
        value: 'Avançado',
        description: 'Experiência na área'
      },
      language: {
        label: 'Idioma',
        value: 'Português',
        description: 'Idioma principal de comunicação'
      }
    }

    function Insights() {
      const [selectedCampaign, setSelectedCampaign] = useState(null)
      const [selectedExpert, setSelectedExpert] = useState(null)
      const [messages, setMessages] = useState([])
      const [inputValue, setInputValue] = useState('')
      const messagesEndRef = useRef(null)

      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

      useEffect(() => {
        scrollToBottom()
      }, [messages])

      const handleSendMessage = async () => {
        if (!inputValue.trim()) return

        const userMessage = { text: inputValue, sender: 'user' }
        setMessages(prev => [...prev, userMessage])
        setInputValue('')

        // Simulação de resposta da IA
        setTimeout(() => {
          const aiResponse = generateAIResponse(inputValue)
          setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }])
        }, 1000)
      }

      const generateAIResponse = (message) => {
        const lowerMessage = message.toLowerCase()
        
        if (lowerMessage.includes('ctr')) {
          return `O CTR da campanha "${selectedCampaign.name}" está em ${selectedCampaign.metrics.ctr}%. Isso é ${selectedCampaign.metrics.ctr > 7 ? 'acima' : 'abaixo'} da média do setor.`
        }

        if (lowerMessage.includes('orçamento') || lowerMessage.includes('budget')) {
          return 'Sugiro redistribuir o orçamento para focar nas plataformas que estão performando melhor.'
        }

        if (lowerMessage.includes('público')) {
          return 'Seu público mais engajado está na faixa de 25-34 anos. Recomendo criar anúncios específicos para esse grupo.'
        }

        return `Olá! Sou ${selectedExpert.name}, especialista em ${selectedExpert.expertise}. Como posso ajudar na análise da campanha "${selectedCampaign.name}"?`
      }

      return (
        <div className="p-8 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Insights e Análises</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Bloco de Campanha Selecionada */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Campanha Selecionada</h2>
                {selectedCampaign ? (
                  <div>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-800">{selectedCampaign.name}</h3>
                      <div className="mt-4 space-y-3">
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <p className="text-sm text-gray-600">CTR: <span className="font-medium text-gray-800">{selectedCampaign.metrics.ctr}%</span></p>
                        </div>
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <p className="text-sm text-gray-600">CPC: <span className="font-medium text-gray-800">R$ {selectedCampaign.metrics.cpc.toFixed(2)}</span></p>
                        </div>
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <p className="text-sm text-gray-600">Impressões: <span className="font-medium text-gray-800">{selectedCampaign.metrics.impressions.toLocaleString()}</span></p>
                        </div>
                        <div className="p-3 bg-white rounded-lg shadow-sm">
                          <p className="text-sm text-gray-600">Conversões: <span className="font-medium text-gray-800">{selectedCampaign.metrics.conversions.toLocaleString()}</span></p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCampaign(null)}
                      className="mt-4 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Alterar Campanha
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-6">Selecione uma campanha para análise:</p>
                    <div className="space-y-4">
                      {campaigns.map(campaign => (
                        <div
                          key={campaign.id}
                          onClick={() => setSelectedCampaign(campaign)}
                          className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <h3 className="font-medium text-gray-800">{campaign.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            CTR: {campaign.metrics.ctr}% | CPC: R$ {campaign.metrics.cpc.toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bloco de Especialista Selecionado */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Especialista Selecionado</h2>
                {selectedExpert ? (
                  <div>
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-800">{selectedExpert.name}</h3>
                      <p className="text-sm text-gray-600 mt-2">{selectedExpert.expertise}</p>
                    </div>
                    <button
                      onClick={() => setSelectedExpert(null)}
                      className="mt-4 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Alterar Especialista
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-6">Escolha um especialista para conversar:</p>
                    <div className="space-y-4">
                      {experts.map(expert => (
                        <div
                          key={expert.id}
                          onClick={() => setSelectedExpert(expert)}
                          className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <h3 className="font-medium text-gray-800">{expert.name}</h3>
                          <p className="text-sm text-gray-600">{expert.expertise}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bloco de Parametrizações do Especialista */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Parametrizações</h2>
                {selectedExpert ? (
                  <div className="space-y-4">
                    {Object.entries(expertParameters).map(([key, param]) => (
                      <div key={key} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-sm font-medium text-gray-700">{param.label}</h3>
                            <p className="text-xs text-gray-500">{param.description}</p>
                          </div>
                          <span className="text-sm font-semibold text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm">
                            {param.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-600 text-center">
                      Selecione um especialista para ver as parametrizações
                    </p>
                  </div>
                )}
              </div>

              {/* Seção de Chat */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 h-[600px] flex flex-col lg:col-span-3">
                <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-xl">
                  <h2 className="text-xl font-semibold text-gray-800">Conversa com Especialista</h2>
                  <p className="text-sm text-gray-600">
                    {selectedCampaign && selectedExpert ? (
                      `Analisando "${selectedCampaign.name}" com ${selectedExpert.name}`
                    ) : (
                      'Selecione uma campanha e um especialista para iniciar a conversa'
                    )}
                  </p>
                </div>
                <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
                  {selectedCampaign && selectedExpert ? (
                    messages.length > 0 ? (
                      messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`mb-4 ${
                            msg.sender === 'user' ? 'text-right' : 'text-left'
                          }`}
                        >
                          <div
                            className={`inline-block p-3 rounded-lg max-w-[80%] ${
                              msg.sender === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white shadow-sm text-gray-800'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-gray-600 text-center py-4">
                          Inicie a conversa com {selectedExpert.name} sobre a campanha "{selectedCampaign.name}"
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-gray-600 text-center py-4">
                        Selecione uma campanha e um especialista para iniciar a conversa
                      </p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t bg-white rounded-b-xl">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Digite sua mensagem..."
                      className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      disabled={!selectedCampaign || !selectedExpert}
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
                      disabled={!selectedCampaign || !selectedExpert}
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    export default Insights
