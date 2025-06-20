
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { User, Group, Binoculars, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AIScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateId: number;
}

type InterviewType = '1:1' | 'panel' | 'interviewer-observers';
type Step = 'setup' | 'review' | 'confirm';

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  role?: 'interviewer' | 'observer';
}

const teamMembers: TeamMember[] = [
  { id: 1, name: 'Rajesh Kumar', designation: 'Senior Engineering Manager' },
  { id: 2, name: 'Meera Gupta', designation: 'Tech Lead' },
  { id: 3, name: 'Sanjay Verma', designation: 'Principal Engineer' },
  { id: 4, name: 'Deepika Rao', designation: 'HR Business Partner' },
  { id: 5, name: 'Arun Nair', designation: 'Product Manager' },
  { id: 6, name: 'Shreya Jain', designation: 'Senior Developer' },
];

const AIScheduleModal: React.FC<AIScheduleModalProps> = ({ isOpen, onClose, candidateId }) => {
  const [currentStep, setCurrentStep] = useState<Step>('setup');
  const [interviewType, setInterviewType] = useState<InterviewType>('1:1');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [recurringSlots, setRecurringSlots] = useState(false);
  const [selectedParticipants, setSelectedParticipants] = useState<TeamMember[]>([]);

  const steps = [
    { id: 'setup', label: 'Setup' },
    { id: 'review', label: 'Review' },
    { id: 'confirm', label: 'Confirm' }
  ];

  const getStepIndex = (step: Step) => steps.findIndex(s => s.id === step);

  const addParticipant = (member: TeamMember, role: 'interviewer' | 'observer' = 'interviewer') => {
    if (!selectedParticipants.find(p => p.id === member.id)) {
      setSelectedParticipants([...selectedParticipants, { ...member, role }]);
    }
  };

  const removeParticipant = (memberId: number) => {
    setSelectedParticipants(selectedParticipants.filter(p => p.id !== memberId));
  };

  const getInterviewTypeIcon = () => {
    switch (interviewType) {
      case '1:1':
        return <User size={20} className="text-blue-600" />;
      case 'panel':
        return (
          <div className="flex items-center">
            <Group size={20} className="text-blue-600" />
            <span className="ml-1 text-sm font-medium">3+</span>
          </div>
        );
      case 'interviewer-observers':
        return (
          <div className="flex items-center space-x-1">
            <User size={20} className="text-blue-600" />
            <span className="text-gray-400">+</span>
            <div className="flex items-center">
              <User size={16} className="text-gray-600" />
              <Binoculars size={14} className="text-gray-600 -ml-1" />
            </div>
          </div>
        );
    }
  };

  const renderSetupStep = () => (
    <div className="space-y-8">
      {/* Interview Type Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">Interview Type</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { type: '1:1' as InterviewType, label: '1:1 Interview' },
            { type: 'panel' as InterviewType, label: 'Panel Interview' },
            { type: 'interviewer-observers' as InterviewType, label: 'Interviewer + Observers' }
          ].map(({ type, label }) => (
            <button
              key={type}
              onClick={() => setInterviewType(type)}
              className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-colors ${
                interviewType === type 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {type === '1:1' && <User size={24} className="text-blue-600" />}
              {type === 'panel' && (
                <div className="flex items-center">
                  <Group size={24} className="text-blue-600" />
                  <span className="ml-1 text-sm font-medium">3+</span>
                </div>
              )}
              {type === 'interviewer-observers' && (
                <div className="flex items-center space-x-1">
                  <User size={24} className="text-blue-600" />
                  <span className="text-gray-400">+</span>
                  <div className="flex items-center">
                    <User size={20} className="text-gray-600" />
                    <Binoculars size={18} className="text-gray-600 -ml-1" />
                  </div>
                </div>
              )}
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">Select Date</h3>
        <div className="flex flex-col space-y-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border pointer-events-auto"
            style={{
              '--rdp-cell-size': '40px',
              '--rdp-accent-color': '#2563EB',
              '--rdp-background-color': '#2563EB',
            } as React.CSSProperties}
          />
          <div className="flex items-center space-x-2">
            <Switch
              checked={recurringSlots}
              onCheckedChange={setRecurringSlots}
              style={{ backgroundColor: recurringSlots ? '#10B981' : '#6B7280' }}
            />
            <label className="text-sm font-medium">Recurring slots</label>
          </div>
        </div>
      </div>

      {/* Participant Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">Select Participants</h3>
        
        {/* Selected Participants */}
        {selectedParticipants.length > 0 && (
          <div className="mb-4">
            {interviewType === 'interviewer-observers' && (
              <>
                <h4 className="text-sm font-medium mb-2">Interviewer</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedParticipants
                    .filter(p => p.role === 'interviewer')
                    .map(participant => (
                      <div key={participant.id} className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{participant.name}</span>
                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#F3F4F6' }}>
                          Interviewer
                        </span>
                        <button
                          onClick={() => removeParticipant(participant.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                </div>
                
                <h4 className="text-sm font-medium mb-2">Observers</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedParticipants
                    .filter(p => p.role === 'observer')
                    .map(participant => (
                      <div key={participant.id} className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{participant.name}</span>
                        <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#F3F4F6' }}>
                          Observer
                        </span>
                        <button
                          onClick={() => removeParticipant(participant.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                </div>
              </>
            )}
            
            {interviewType !== 'interviewer-observers' && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedParticipants.map(participant => (
                  <div key={participant.id} className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{participant.name}</span>
                    <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#F3F4F6' }}>
                      {participant.role || 'Interviewer'}
                    </span>
                    <button
                      onClick={() => removeParticipant(participant.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Participant Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <Plus size={16} />
              <span>Add Participant</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80">
            {teamMembers
              .filter(member => !selectedParticipants.find(p => p.id === member.id))
              .map(member => (
                <DropdownMenuItem 
                  key={member.id} 
                  className="cursor-pointer"
                  onClick={() => {
                    if (interviewType === 'interviewer-observers') {
                      const interviewerCount = selectedParticipants.filter(p => p.role === 'interviewer').length;
                      const role = interviewerCount === 0 ? 'interviewer' : 'observer';
                      addParticipant(member, role);
                    } else {
                      addParticipant(member);
                    }
                  }}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.designation}</div>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  const renderProgressStepper = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                getStepIndex(currentStep) >= index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              getStepIndex(currentStep) >= index ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-16 h-0.5 mx-4 ${
              getStepIndex(currentStep) > index ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getInterviewTypeIcon()}
            <span>AI Schedule Interview</span>
          </DialogTitle>
        </DialogHeader>

        {renderProgressStepper()}

        <div className="mt-6">
          {currentStep === 'setup' && renderSetupStep()}
          {currentStep === 'review' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Review Details</h3>
              <div className="space-y-2">
                <p><strong>Interview Type:</strong> {interviewType.replace('-', ' + ')}</p>
                <p><strong>Date:</strong> {selectedDate?.toDateString()}</p>
                <p><strong>Recurring:</strong> {recurringSlots ? 'Yes' : 'No'}</p>
                <p><strong>Participants:</strong> {selectedParticipants.length}</p>
              </div>
            </div>
          )}
          {currentStep === 'confirm' && (
            <div className="text-center space-y-4">
              <h3 className="text-lg font-medium">Interview Scheduled!</h3>
              <p className="text-gray-600">The AI has successfully scheduled the interview.</p>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => {
              const currentIndex = getStepIndex(currentStep);
              if (currentIndex > 0) {
                setCurrentStep(steps[currentIndex - 1].id as Step);
              } else {
                onClose();
              }
            }}
          >
            {getStepIndex(currentStep) === 0 ? 'Cancel' : 'Back'}
          </Button>
          
          <Button
            onClick={() => {
              const currentIndex = getStepIndex(currentStep);
              if (currentIndex < steps.length - 1) {
                setCurrentStep(steps[currentIndex + 1].id as Step);
              } else {
                onClose();
              }
            }}
            style={{ backgroundColor: '#2563EB' }}
            className="text-white"
          >
            {getStepIndex(currentStep) === steps.length - 1 ? 'Close' : 'Next'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIScheduleModal;
