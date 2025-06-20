
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Calendar, Bot, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AIScheduleModal from './AIScheduleModal';

interface ActionButtonProps {
  candidateId: number;
  isReschedule?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ candidateId, isReschedule = false }) => {
  const { toast } = useToast();
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const handleManualSchedule = () => {
    toast({
      title: isReschedule ? "Manual Reschedule" : "Manual Schedule",
      description: `Opening manual ${isReschedule ? 'rescheduling' : 'scheduling'} for candidate ${candidateId}`,
    });
    console.log(`Manual ${isReschedule ? 'reschedule' : 'schedule'} clicked for candidate ${candidateId}`);
  };

  const handleAISchedule = () => {
    setIsAIModalOpen(true);
    console.log(`AI ${isReschedule ? 'reschedule' : 'schedule'} clicked for candidate ${candidateId}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="hover:bg-gray-50">
            {isReschedule ? (
              <>
                <RotateCcw size={14} className="mr-1" />
                Reschedule
              </>
            ) : (
              <>
                <Calendar size={14} className="mr-1" />
                Schedule
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleManualSchedule} className="cursor-pointer">
            <div className="flex items-center justify-center w-6 h-6 rounded-md mr-3" style={{ backgroundColor: '#F3F4F6' }}>
              {isReschedule ? (
                <RotateCcw size={14} className="text-gray-600" />
              ) : (
                <Calendar size={14} className="text-gray-600" />
              )}
            </div>
            <span>Manual {isReschedule ? 'Reschedule' : 'Schedule'}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleAISchedule} className="cursor-pointer">
            <div className="flex items-center justify-center w-6 h-6 rounded-md mr-3" style={{ backgroundColor: '#2563EB' }}>
              <Bot size={14} className="text-white" />
            </div>
            <span>AI {isReschedule ? 'Reschedule' : 'Schedule'}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AIScheduleModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
        candidateId={candidateId}
      />
    </>
  );
};

export default ActionButton;
