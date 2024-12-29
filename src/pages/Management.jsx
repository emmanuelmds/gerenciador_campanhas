import React from 'react'
    import { useCampaigns } from '../hooks/useCampaigns'
    import MetricsDashboard from '../components/MetricsDashboard'
    import CampaignTable from '../components/CampaignTable'
    import { Line, Bar } from 'react-chartjs-2'
    import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      BarElement,
      Title,
      Tooltip,
      Legend
    } from 'chart.js'

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      BarElement,
      Title,
      Tooltip,
      Legend
    )

    function Management() {
      const { campaigns, getTotalMetrics } = useCampaigns()
      const totalMetrics = getTotalMetrics()

      const chartData = {
        labels: ['Facebook', 'Instagram', 'LinkedIn', 'Google Ads'],
        datasets: [
          {
            label: 'Impressões',
            data: [15000, 8000, 3000, 25000],
            borderColor: 'rgb(99, 102, 241)',
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
          },
          {
            label: 'Cliques',
            data: [1200, 600, 150, 1800],
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
          }
        ]
      }

      return (
        <div>
          <h1 className="text-2xl font-bold mb-6">Gerenciamento de Campanhas</h1>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <select
              className="p-2 border rounded-md"
              defaultValue="all"
            >
              <option value="all">Todos status</option>
              <option value="Ativa">Ativa</option>
              <option value="Pausada">Pausada</option>
              <option value="Finalizada">Finalizada</option>
            </select>
            <select
              className="p-2 border rounded-md"
              defaultValue="all"
            >
              <option value="all">Todas plataformas</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="googleAds">Google Ads</option>
            </select>
            <input
              type="date"
              className="p-2 border rounded-md"
            />
            <input
              type="date"
              className="p-2 border rounded-md"
            />
          </div>

          <MetricsDashboard totalMetrics={totalMetrics} />

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Desempenho por Plataforma</h3>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Evolução de Métricas</h3>
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>

          <CampaignTable campaigns={campaigns} />
        </div>
      )
    }

    export default Management
