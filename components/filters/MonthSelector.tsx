import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";

export default function MonthSelector() {
  return (
    <Select defaultValue="Months">
      <SelectTrigger className="w-24">Months</SelectTrigger>
      <SelectContent>
        <SelectItem value="Jan">Jan</SelectItem>
        <SelectItem value="Feb">Feb</SelectItem>
        <SelectItem value="Mar">Mar</SelectItem>
      </SelectContent>
    </Select>
  );
}
