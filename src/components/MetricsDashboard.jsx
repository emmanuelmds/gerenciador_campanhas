import React from 'react'

    function MetricsDashboard({ totalMetrics }) {
      const totalPlatforms = 8 // 2 campanhas * 4 plataformas
      const averageCtr = (totalMetrics.ctr / totalPlatforms).toFixed(1)
      const averageCpc = (totalMetrics.cpc / totalPlatforms).toFixed(2)

      return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Orçamento Total</h3>
            <p className="text-2xl font-bold">R$ {totalMetrics.budget.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Impressões Totais</h3>
            <p className="text-2xl font-bold">{totalMetrics.impressions.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">Cliques Totais</h3>
            <p className="text-2xl font-bold">{totalMetrics.clicks.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">CTR Médio</h3>
            <p className="text-2xl font-bold">{averageCtr}%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">CPC Médio</h3>
            <p className="text-2xl font-bold">R$ {averageCpc}</p>
          </div>
        </div>
      )
    }

    export default MetricsDashboard
