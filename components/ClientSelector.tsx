'use client';

import { useEffect, useState } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { getClients } from '@/lib/queries/getClients';

export default function ClientSelector({ onChange }: { onChange: (id: string) => void }) {
  const [clients, setClients] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    async function fetchClients() {
      const data = await getClients();
      setClients(data);
    }

    fetchClients();
  }, []);

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-48">Select Client</SelectTrigger>
      <SelectContent>
        {clients.map((client) => (
          <SelectItem key={client.id} value={client.id.toString()}>
            {client.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
