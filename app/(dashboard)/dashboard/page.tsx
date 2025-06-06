"use client";

import DashboardFilters from "@/components/filters/DashboardFilters";
import MetricCard from "@/components/ui/MetricCard";
import ReplyRatePieChart from "@/components/charts/ReplyRatePieChart";
import MonthSelector from "@/components/filters/MonthSelector";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { calculateClientAggregateStats } from "@/lib/queries/calculateStats";
import BounceAnalysisPieChart from "@/components/charts/BounceAnalysisPieChart";

export default function DashboardPage() {
  const [selectedSequencer, setSelectedSequencer] = useState("SupaMail");
  //const [selectedClient, setSelectedClient] = useState("All");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState("Last 30 Days");

  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState([]);
  const [aggregatedStats, setAggregatedStats] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedClientId) return;

      const { data: campaignsData } = await supabase
        .from("campaigns")
        .select("*")
        .eq("client_id", selectedClientId);

      const campaignIds = (campaignsData ?? []).map((c) => c.id);
      console.log("Campaign IDs:", campaignIds);
      
      const { data: statsData } = await supabase
        .from("campaign_stats")
        .select("*")
        .in("campaign_id", campaignIds);
      console.log("Stats Data:", statsData);
      setCampaigns(campaignsData);
      setStats(statsData);
      if(statsData && statsData.length > 0) {
        const aggregatedStats = calculateClientAggregateStats(statsData);
        console.log("Aggregated Stats:", aggregatedStats);
        setAggregatedStats(aggregatedStats);
        
      }
    };

    fetchData();
  }, [selectedClientId]);

  return (
    <>
        <DashboardFilters
          setSelectedSequencer={setSelectedSequencer}
          setSelectedDate={setSelectedDate}
          setSelectedClientId={setSelectedClientId}
        />

      <div className="grid grid-cols-3 gap-6 mt-8">
        <MetricCard title="Reply Rate">
          <div className="flex items-center justify-between">

            <ReplyRatePieChart rawData={aggregatedStats?.replyRate} />
            
            <MonthSelector />
          </div>
        </MetricCard>
        <MetricCard title="Bounce Rate">
          <div className="flex items-center justify-between">

            <BounceAnalysisPieChart rawData={aggregatedStats?.bounceRate} />
            
            <MonthSelector />
          </div>
        </MetricCard>
       

        <MetricCard title="Send Volume">
          <div className="h-24 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-500">
            Stacked Bar Chart Placeholder
          </div>
        </MetricCard>
      </div>
      </>
  );
}
