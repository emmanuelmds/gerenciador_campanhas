import { useState } from 'react'
    import { initialCampaigns } from '../data/campaigns'

    export function useCampaigns() {
      const [campaigns] = useState(initialCampaigns)

      const getTotalMetrics = () => {
        return campaigns.reduce((acc, campaign) => {
          Object.values(campaign.platforms).forEach(platform => {
            acc.budget += platform.budget
            acc.impressions += platform.impressions
            acc.clicks += platform.clicks
            acc.ctr += platform.ctr
            acc.cpc += platform.cpc
          })
          return acc
        }, {
          budget: 0,
          impressions: 0,
          clicks: 0,
          ctr: 0,
          cpc: 0
        })
      }

      return {
        campaigns,
        getTotalMetrics
      }
    }
