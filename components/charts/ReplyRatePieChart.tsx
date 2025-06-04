
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const replyRateData = [
  { name: "Instantly", value: 60 },
  { name: "SASMail", value: 25 },
  { name: "SmartLead", value: 15 },
];
const COLORS = ["#3b82f6", "#22c55e", "#facc15"];
export default function ReplyRatePieChart() {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <PieChart>
        <Pie data={replyRateData} cx="50%" cy="50%" outerRadius={45} fill="#8884d8" dataKey="value">
          {replyRateData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}