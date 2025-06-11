'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Topbar() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="w-full bg-white border-b px-6 py-3 flex justify-between items-center shadow-sm">
      <h1 className="text-lg font-semibold text-gray-700">📊 Email Dashboard</h1>
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 text-sm"
      >
        Sign Out
      </button>
    </div>
  );
}
