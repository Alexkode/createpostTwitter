import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Save, Trash2, Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScheduledActionsProps {
  scheduledTime: Date;
  setShowScheduler: (show: boolean) => void;
  resetSchedule: () => void;
  handleSchedule: () => void;
}

const ScheduledActions = ({
  scheduledTime,
  setShowScheduler,
  resetSchedule,
  handleSchedule,
}: ScheduledActionsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="max-w-[1200px] mx-auto">
      {isMobile ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2" 
                onClick={() => setShowScheduler(true)}
              >
                <span className="whitespace-nowrap">
                  {format(scheduledTime, "MMM d, h:mm a")}
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
              <Save className="h-4 w-4" />
            </Button>
            <Button onClick={handleSchedule} className="flex-1">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => console.log("Saved as draft")} 
            className="flex items-center gap-2"
          >
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
            <Button onClick={handleSchedule}>
              Schedule
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduledActions;