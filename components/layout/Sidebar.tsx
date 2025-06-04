import { LayoutGrid, Mail, RefreshCcw, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-16 bg-white border-r flex flex-col items-center py-4 space-y-6 shadow-sm">
      <LayoutGrid className="w-6 h-6 text-blue-600" />
      <Mail className="w-6 h-6 text-gray-400" />
      <RefreshCcw className="w-6 h-6 text-gray-400" />
      <Settings className="w-6 h-6 text-gray-400 mt-auto mb-4" />
    </div>
  );
}