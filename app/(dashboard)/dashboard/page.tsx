"use client";


import DashboardFilters from "@/components/filters/DashboardFilters";
import MetricCard from "@/components/ui/MetricCard";
import MonthlySentChart from "@/components/charts/MonthlySentChart";
import MonthSelector from "@/components/filters/MonthSelector";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { calculateClientAggregateStats } from "@/lib/queries/calculateStats";

import { useDashboardStore } from "@/stores/dashboardStore";
import Replyrate from "@/components/charts/Replyrate";
import BounceRatePieChart from "@/components/charts/BounceRate";
import { filterStatsByDateRange } from "@/lib/queries/filterStats";
import { calculateOverallSentRate } from "@/lib/queries/calculateFilteredStsts";
export default function DashboardPage() {
  const [selectedSequencer, setSelectedSequencer] = useState("SupaMail");
  const {dateRange,stats, setStats,selectedReplyRateMonth,setSelectedReplyRateMonth,selectedClientID,selectedBounceRateMonth,setSelectedBounceRateMonth}= useDashboardStore();
  
  const [selectedDate, setSelectedDate] = useState("Last 30 Days");

 
const [sent, setSent] = useState(0);
  const [aggregatedStats, setAggregatedStats] = useState();

 
  useEffect(() => {
    const fetchData = async () => {
      if (!selectedClientID) return;
      console.log("Fetching data for Client ID:", selectedClientID);
      const { data: campaignsData } = await supabase
        .from("campaigns")
        .select("*")
        .eq("client_id", selectedClientID);
      console.log("Campaigns Data:", campaignsData);
      
      const campaignIds = (campaignsData ?? []).map((c) => c.id);
    
      const { data: statsData } = await supabase
        .from("campaign_stats")
        .select("*")
        .in("campaign_id", campaignIds);
     
      console.log("Date Range:", dateRange);
      
      setStats(statsData);
      const data = calculateOverallSentRate(statsData);

      console.log("Overall Sent Rate Data:", data);
      setSent(data);
      console.log("Stats from store:", statsData);
      if(statsData && statsData.length > 0) {
        console.log("date range", dateRange);
        if(!dateRange || dateRange.startDate === dateRange.endDate) {

        }
        const aggregatedStats = filterStatsByDateRange(statsData, dateRange);
        console.log("Aggregated Stats:", aggregatedStats);
        setAggregatedStats(aggregatedStats);
        
      }
    };

    fetchData();
  }, [selectedClientID, setStats]);
  
  return (
    <>
        <DashboardFilters
          setSelectedSequencer={setSelectedSequencer}
         
          
        />

      <div className="grid grid-cols-3 gap-6 mt-8">
        <MetricCard title="Reply Rate">
          <div className="flex items-center justify-between">

            <Replyrate stats={stats} />
            <MonthSelector selectedMonth={selectedReplyRateMonth} setSelectedMonth={setSelectedReplyRateMonth} />
          </div>
        </MetricCard>
        <MetricCard title="Bounce Rate">
          <div className="flex items-center justify-between">

            <BounceRatePieChart stats={stats} />
            
            <MonthSelector selectedMonth={selectedBounceRateMonth} setSelectedMonth={setSelectedBounceRateMonth} />
          </div>
        </MetricCard>
       

        <MetricCard title="SentData  "> 
          <div className="flex items-center justify-between">
            <div className="text-1xl font-bold text-gray-800"> Overall SentData : {sent?.totalSent}</div>
            <MonthSelector selectedMonth={selectedReplyRateMonth} setSelectedMonth={setSelectedReplyRateMonth} />
          </div>
  <div className="h-64 px-4 pt-2">
   
    <MonthlySentChart stats={stats} />
  </div>
</MetricCard>
      </div>
      </>
  );
}
