import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";

const PostActions = () => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");
  const [isScheduled, setIsScheduled] = useState(false);

  const handleSchedule = () => {
    const scheduledTime = new Date(date!);
    let hours = parseInt(hour);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    scheduledTime.setHours(hours, parseInt(minute));
    console.log("Scheduled for:", scheduledTime);
    setShowScheduler(false);
    setIsScheduled(true);
  };

  const resetSchedule = () => {
    setIsScheduled(false);
    setDate(undefined);
    setHour("12");
    setMinute("00");
    setPeriod("AM");
  };

  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  if (isScheduled && date) {
    const scheduledTime = new Date(date);
    let hours = parseInt(hour);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    scheduledTime.setHours(hours, parseInt(minute));

    return (
      <div className="flex items-center justify-between mt-4 border-t pt-4">
        <Button variant="outline" onClick={() => console.log("Saved as draft")}>
          Save as draft
        </Button>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2" 
            onClick={() => setShowScheduler(true)}
          >
            {format(scheduledTime, "EEE, MMMM d 'at' h:mm a")}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={resetSchedule}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={handleSchedule}>
          Schedule
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-end gap-2 mt-4 border-t pt-4">
      <Button variant="outline" onClick={() => console.log("Saved as draft")}>
        Save as draft
      </Button>
      <Button variant="outline" onClick={() => setShowScheduler(true)}>
        Schedule for later
      </Button>
      <Button onClick={() => console.log("Posted now")}>
        Post now
      </Button>

      <Dialog open={showScheduler} onOpenChange={setShowScheduler}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="flex gap-2">
              <Select value={hour} onValueChange={setHour}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="Hour" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={minute} onValueChange={setMinute}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="Min" />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="AM/PM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AM">AM</SelectItem>
                  <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowScheduler(false)}>
                Cancel
              </Button>
              <Button onClick={handleSchedule} disabled={!date}>
                Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostActions;