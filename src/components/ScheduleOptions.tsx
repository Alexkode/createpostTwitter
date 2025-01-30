import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

interface TwitterAccount {
  id: string;
  handle: string;
}

interface ScheduleOptionsProps {
  twitterAccounts: TwitterAccount[];
  selectedTwitterAccounts: string[];
  setSelectedTwitterAccounts: (accounts: string[]) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  time: string;
  setTime: (time: string) => void;
  onCancel: () => void;
  onSchedule: () => void;
}

const ScheduleOptions = ({
  twitterAccounts,
  selectedTwitterAccounts,
  setSelectedTwitterAccounts,
  date,
  setDate,
  time,
  setTime,
  onCancel,
  onSchedule
}: ScheduleOptionsProps) => {
  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Twitter Accounts</label>
          {twitterAccounts.map((account) => (
            <div key={account.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={account.id}
                checked={selectedTwitterAccounts.includes(account.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTwitterAccounts([...selectedTwitterAccounts, account.id]);
                  } else {
                    setSelectedTwitterAccounts(selectedTwitterAccounts.filter(id => id !== account.id));
                  }
                }}
                className="rounded border-gray-300"
              />
              <label htmlFor={account.id} className="text-sm text-gray-600">
                {account.handle}
              </label>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSchedule}>
          Schedule Post
        </Button>
      </div>
    </div>
  );
};

export default ScheduleOptions;