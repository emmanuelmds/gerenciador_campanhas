import React, { useState } from 'react'
    import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'

    const platforms = [
      { id: 'facebook', name: 'Facebook' },
      { id: 'instagram', name: 'Instagram' },
      { id: 'linkedin', name: 'LinkedIn' },
      { id: 'googleAds', name: 'Google Ads' }
    ]

    function Registration() {
      const [formData, setFormData] = useState({
        campaignName: '',
        startDate: '',
        endDate: '',
        budget: '',
        selectedPlatforms: [],
        platformSettings: {}
      })

      const [errors, setErrors] = useState({})
      const [isSubmitting, setIsSubmitting] = useState(false)

      const handlePlatformChange = (platformId) => {
        setFormData(prev => ({
          ...prev,
          selectedPlatforms: prev.selectedPlatforms.includes(platformId)
            ? prev.selectedPlatforms.filter(id => id !== platformId)
            : [...prev.selectedPlatforms, platformId],
          platformSettings: {
            ...prev.platformSettings,
            [platformId]: prev.platformSettings[platformId] || {
              budget: '',
              targetAudience: '',
              adFormat: ''
            }
          }
        }))
      }

      const handlePlatformSettingChange = (platformId, field, value) => {
        setFormData(prev => ({
          ...prev,
          platformSettings: {
            ...prev.platformSettings,
            [platformId]: {
              ...prev.platformSettings[platformId],
              [field]: value
            }
          }
        }))
      }

      const validateForm = () => {
        const newErrors = {}
        
        if (!formData.campaignName.trim()) {
          newErrors.campaignName = 'Nome da campanha é obrigatório'
        }
        
        if (!formData.startDate) {
          newErrors.startDate = 'Data de início é obrigatória'
        }
        
        if (!formData.endDate) {
          newErrors.endDate = 'Data de término é obrigatória'
        } else if (new Date(formData.endDate) < new Date(formData.startDate)) {
          newErrors.endDate = 'Data de término deve ser posterior à data de início'
        }
        
        if (!formData.budget || isNaN(formData.budget) || formData.budget <= 0) {
          newErrors.budget = 'Orçamento deve ser um valor positivo'
        }
        
        if (formData.selectedPlatforms.length === 0) {
          newErrors.platforms = 'Selecione pelo menos uma plataforma'
        }
        
        formData.selectedPlatforms.forEach(platformId => {
          const settings = formData.platformSettings[platformId]
          if (!settings.budget || isNaN(settings.budget) || settings.budget <= 0) {
            newErrors[`${platformId}_budget`] = 'Orçamento da plataforma inválido'
          }
        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
      }

      const handleSubmit = (e) => {
        e.preventDefault()
        if (validateForm()) {
          setIsSubmitting(true)
          // Simulação de envio do formulário
          setTimeout(() => {
            setIsSubmitting(false)
            alert('Campanha criada com sucesso!')
            // Aqui você pode adicionar a lógica para enviar os dados para o backend
          }, 2000)
        }
      }

      return (
        <div className="p-8 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Cadastro de Campanha</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Informações Gerais */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Informações Gerais</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Campanha</label>
                    <input
                      type="text"
                      value={formData.campaignName}
                      onChange={(e) => setFormData({...formData, campaignName: e.target.value})}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.campaignName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.campaignName && (
                      <p className="text-sm text-red-500 mt-1">{errors.campaignName}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
                      <input
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.startDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.startDate && (
                        <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data de Término</label>
                      <input
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.endDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.endDate && (
                        <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Orçamento Total (R$)</label>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.budget ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.budget && (
                      <p className="text-sm text-red-500 mt-1">{errors.budget}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Seleção de Plataformas */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Plataformas</h2>
                {errors.platforms && (
                  <p className="text-sm text-red-500 mb-4">{errors.platforms}</p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {platforms.map(platform => (
                    <div
                      key={platform.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        formData.selectedPlatforms.includes(platform.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => handlePlatformChange(platform.id)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-800">{platform.name}</h3>
                        {formData.selectedPlatforms.includes(platform.id) ? (
                          <CheckCircleIcon className="h-5 w-5 text-blue-500" />
                        ) : (
                          <XCircleIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Configurações por Plataforma */}
              {formData.selectedPlatforms.map(platformId => (
                <div key={platformId} className="bg-white p-6 rounded-xl shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Configurações para {platforms.find(p => p.id === platformId).name}
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Orçamento (R$)</label>
                      <input
                        type="number"
                        value={formData.platformSettings[platformId].budget}
                        onChange={(e) => handlePlatformSettingChange(platformId, 'budget', e.target.value)}
                        className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors[`${platformId}_budget`] ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors[`${platformId}_budget`] && (
                        <p className="text-sm text-red-500 mt-1">{errors[`${platformId}_budget`]}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Público-Alvo</label>
                      <input
                        type="text"
                        value={formData.platformSettings[platformId].targetAudience}
                        onChange={(e) => handlePlatformSettingChange(platformId, 'targetAudience', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Formato do Anúncio</label>
                      <select
                        value={formData.platformSettings[platformId].adFormat}
                        onChange={(e) => handlePlatformSettingChange(platformId, 'adFormat', e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Selecione...</option>
                        <option value="image">Imagem</option>
                        <option value="video">Vídeo</option>
                        <option value="carousel">Carrossel</option>
                        <option value="story">Story</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              {/* Botão de Envio */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSubmitting ? 'Criando Campanha...' : 'Criar Campanha'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    }

    export default Registration
