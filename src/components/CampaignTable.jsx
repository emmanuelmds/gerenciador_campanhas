import React from 'react'

    function CampaignTable({ campaigns }) {
      return (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Campanha</th>
              <th className="p-3 text-left">Provedor</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Orçamento</th>
              <th className="p-3 text-left">Impressões</th>
              <th className="p-3 text-left">Cliques</th>
              <th className="p-3 text-left">CTR</th>
              <th className="p-3 text-left">CPC</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map(campaign => (
              Object.entries(campaign.platforms).map(([platform, data]) => (
                <tr key={`${campaign.id}-${platform}`} className="border-b hover:bg-gray-50">
                  <td className="p-3">{campaign.name}</td>
                  <td className="p-3 capitalize">{platform}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      data.status === 'Ativa' ? 'bg-green-100 text-green-800' :
                      data.status === 'Pausada' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {data.status}
                    </span>
                  </td>
                  <td className="p-3">R$ {data.budget.toLocaleString()}</td>
                  <td className="p-3">{data.impressions.toLocaleString()}</td>
                  <td className="p-3">{data.clicks.toLocaleString()}</td>
                  <td className="p-3">{data.ctr}%</td>
                  <td className="p-3">R$ {data.cpc.toFixed(2)}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      )
    }

    export default CampaignTable
