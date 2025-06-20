
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Calendar, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AIScheduleModal from './AIScheduleModal';

interface ActionButtonProps {
  candidateId: number;
}

const ActionButton: React.FC<ActionButtonProps> = ({ candidateId }) => {
  const { toast } = useToast();
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const handleManualSchedule = () => {
    toast({
      title: "Manual Schedule",
      description: `Opening manual scheduling for candidate ${candidateId}`,
    });
    console.log(`Manual schedule clicked for candidate ${candidateId}`);
  };

  const handleAISchedule = () => {
    setIsAIModalOpen(true);
    console.log(`AI schedule clicked for candidate ${candidateId}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="hover:bg-gray-50">
            Schedule
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={handleManualSchedule} className="cursor-pointer">
            <div className="flex items-center justify-center w-8 h-8 rounded-md mr-3" style={{ backgroundColor: '#F3F4F6' }}>
              <Calendar size={16} className="text-gray-600" />
            </div>
            <span>Manual Schedule</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleAISchedule} className="cursor-pointer">
            <div className="flex items-center justify-center w-8 h-8 rounded-md mr-3" style={{ backgroundColor: '#2563EB' }}>
              <Bot size={16} className="text-white" />
            </div>
            <span>AI Schedule</span>
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
