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
import { Save, Clock, Send, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const PostActions = () => {
  const [showScheduler, setShowScheduler] = useState(false);
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");
  const [isScheduled, setIsScheduled] = useState(false);
  const isMobile = useIsMobile();

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
    setShowScheduler(false);
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2" 
                onClick={() => setShowScheduler(true)}
              >
                <span className="whitespace-nowrap">
                  {format(scheduledTime, isMobile ? "MMM d, h:mm a" : "EEE, MMMM d 'at' h:mm a")}
                </span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={resetSchedule}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => console.log("Saved as draft")} 
              className="flex-1"
            >
              {isMobile ? <Save className="h-4 w-4" /> : "Save as draft"}
            </Button>
            <Button onClick={handleSchedule} className="flex-1">
              {isMobile ? <Send className="h-4 w-4" /> : "Schedule"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-50">
      <div className="max-w-[1200px] mx-auto">
        <div className={`flex ${isMobile ? 'flex-row' : 'flex-col sm:flex-row'} items-center justify-end gap-4`}>
          <Button 
            variant="outline" 
            onClick={() => console.log("Saved as draft")} 
            className={`${isMobile ? 'flex-1' : 'w-full sm:w-auto'}`}
          >
            {isMobile ? <Save className="h-4 w-4" /> : "Save as draft"}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowScheduler(true)} 
            className={`${isMobile ? 'flex-1' : 'w-full sm:w-auto'}`}
          >
            {isMobile ? <Clock className="h-4 w-4" /> : "Schedule for later"}
          </Button>
          <Button 
            onClick={() => console.log("Posted now")} 
            className={`${isMobile ? 'flex-1' : 'w-full sm:w-auto'}`}
          >
            {isMobile ? <Send className="h-4 w-4" /> : "Post now"}
          </Button>
        </div>

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
    </div>
  );
};

export default PostActions;