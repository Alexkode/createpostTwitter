import { useState } from "react";
import ScheduleDialog from "./post-actions/ScheduleDialog";
import ScheduledActions from "./post-actions/ScheduledActions";
import UnscheduledActions from "./post-actions/UnscheduledActions";

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
    setShowScheduler(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-50">
      {isScheduled && date ? (
        <ScheduledActions
          scheduledTime={new Date(date)}
          setShowScheduler={setShowScheduler}
          resetSchedule={resetSchedule}
          handleSchedule={handleSchedule}
        />
      ) : (
        <UnscheduledActions setShowScheduler={setShowScheduler} />
      )}

      <ScheduleDialog
        showScheduler={showScheduler}
        setShowScheduler={setShowScheduler}
        date={date}
        setDate={setDate}
        hour={hour}
        setHour={setHour}
        minute={minute}
        setMinute={setMinute}
        period={period}
        setPeriod={setPeriod}
        handleSchedule={handleSchedule}
      />
    </div>
  );
};

export default PostActions;