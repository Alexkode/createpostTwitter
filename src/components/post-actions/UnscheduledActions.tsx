import { Button } from "@/components/ui/button";
import { Save, Clock, Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface UnscheduledActionsProps {
  setShowScheduler: (show: boolean) => void;
}

const UnscheduledActions = ({ setShowScheduler }: UnscheduledActionsProps) => {
  const isMobile = useIsMobile();

  return (
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
    </div>
  );
};

export default UnscheduledActions;