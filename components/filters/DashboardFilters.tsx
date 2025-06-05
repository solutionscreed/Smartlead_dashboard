'use client';

import { useEffect, useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { getClients } from '@/lib/queries/getClients';
const Months=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export default function DashboardFilters({
  setSelectedSequencer,
  setSelectedClientId,
  setSelectedDate,
}: {
  setSelectedSequencer: (v: string) => void;
  setSelectedClientId: (id: string | null) => void;
  setSelectedDate: (v: string) => void;
}) {
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    async function fetchClients() {
      const data = await getClients();
      setClients(data);
    }
    fetchClients();
  }, []);

  return (
    <div className="flex space-x-4">
      <Select onValueChange={setSelectedSequencer} defaultValue="Instantly">
        <SelectTrigger>Sequencers</SelectTrigger>
        <SelectContent>
          <SelectItem value="Instantly">Instantly</SelectItem>
          <SelectItem value="SASMail">SASMail</SelectItem>
          <SelectItem value="SmartLead">SmartLead</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setSelectedDate} defaultValue="Last 30 Days">
        <SelectTrigger>Dates</SelectTrigger>
        <SelectContent>
          <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
          <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
          <SelectItem value="Custom">Custom</SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => {
          if (value === 'All') setSelectedClientId(null);
          else setSelectedClientId(value);
        }}
        defaultValue="All"
      >
        <SelectTrigger>Client</SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Clients</SelectItem>
          {clients.map((client) => (
            <SelectItem key={client.id} value={client.id}>
              {client.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
