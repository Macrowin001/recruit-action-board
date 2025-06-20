import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { User, Group, Binoculars, Plus, Pencil, MessageCircle, Calendar as CalendarIcon, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DateRange } from 'react-day-picker';

interface AIScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateId: number;
}

type InterviewType = '1:1' | 'panel' | 'interviewer-observers';
type Step = 'setup' | 'review';

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  role?: 'interviewer' | 'observer';
  hasCalendarAccess: boolean;
  hasAvailability: boolean;
}

const teamMembers: TeamMember[] = [
  { id: 1, name: 'Rajesh Kumar', designation: 'Senior Engineering Manager', hasCalendarAccess: true, hasAvailability: true },
  { id: 2, name: 'Meera Gupta', designation: 'Tech Lead', hasCalendarAccess: true, hasAvailability: true },
  { id: 3, name: 'Sanjay Verma', designation: 'Principal Engineer', hasCalendarAccess: false, hasAvailability: true },
  { id: 4, name: 'Deepika Rao', designation: 'HR Business Partner', hasCalendarAccess: true, hasAvailability: false },
  { id: 5, name: 'Arun Nair', designation: 'Product Manager', hasCalendarAccess: true, hasAvailability: true },
  { id: 6, name: 'Shreya Jain', designation: 'Senior Developer', hasCalendarAccess: true, hasAvailability: true },
];

// Mock candidate data
const candidateData = {
  name: 'Priya Sharma',
  jobTitle: 'Senior Frontend Developer',
  consentStatus: 'available',
  interviewStatus: 'to-be-scheduled', // or 'reschedule-request'
  rescheduleReason: 'Previous interviewer unavailable due to emergency',
  suggestedTime: 'Tomorrow 2:00 PM - 3:00 PM'
};

const AIScheduleModal: React.FC<AIScheduleModalProps> = ({ isOpen, onClose, candidateId }) => {
  const [currentStep, setCurrentStep] = useState<Step>('setup');
  const [interviewType, setInterviewType] = useState<InterviewType>('1:1');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showCalendar, setShowCalendar] = useState(true);
  const [selectedParticipants, setSelectedParticipants] = useState<TeamMember[]>([]);

  const steps = [
    { id: 'setup', label: 'Setup' },
    { id: 'review', label: 'Review' }
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

  const getAvailabilityStatus = () => {
    const interviewers = selectedParticipants.filter(p => p.role === 'interviewer');
    const observers = selectedParticipants.filter(p => p.role === 'observer');
    
    const interviewersAvailable = interviewers.every(p => p.hasCalendarAccess && p.hasAvailability);
    const observersAvailable = observers.every(p => p.hasCalendarAccess && p.hasAvailability);
    
    if (interviewersAvailable && observersAvailable) {
      return { status: 'green', message: 'All participants available' };
    } else if (interviewersAvailable && !observersAvailable) {
      return { status: 'orange', message: 'Interviewers available, observers may have conflicts' };
    } else {
      return { status: 'red', message: 'Some interviewers unavailable' };
    }
  };

  const formatDateRange = () => {
    if (!dateRange?.from || !dateRange?.to) return 'Select date range';
    return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`;
  };

  const renderSetupStep = () => (
    <div className="space-y-3">
      {/* Candidate Context */}
      <div className="bg-gray-50 rounded-lg p-3">
        <h3 className="text-lg font-medium mb-2">Interview Details</h3>
        <div className="space-y-1 text-sm">
          <div><span className="font-medium">Candidate:</span> {candidateData.name}</div>
          <div><span className="font-medium">Position:</span> {candidateData.jobTitle}</div>
          <div><span className="font-medium">Consent Status:</span> 
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
              candidateData.consentStatus === 'available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
            }`}>
              {candidateData.consentStatus === 'available' ? 'Available' : 'Consent Expiring'}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-medium">Current Status:</span> 
            <span className="ml-2">{candidateData.interviewStatus === 'to-be-scheduled' ? 'To be scheduled' : 'Reschedule request'}</span>
            {candidateData.interviewStatus === 'reschedule-request' && (
              <div className="ml-2 cursor-pointer">
                <MessageCircle size={16} className="text-blue-600" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interview Type Selection */}
      <div>
        <h3 className="text-lg font-medium mb-2">Interview Type</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { type: '1:1' as InterviewType, label: '1:1 Interview' },
            { type: 'panel' as InterviewType, label: 'Panel Interview' },
            { type: 'interviewer-observers' as InterviewType, label: 'Interviewer + Observers' }
          ].map(({ type, label }) => (
            <button
              key={type}
              onClick={() => setInterviewType(type)}
              className={`p-2 border-2 rounded-lg flex flex-col items-center space-y-1 transition-colors ${
                interviewType === type 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {type === '1:1' && <User size={20} className="text-blue-600" />}
              {type === 'panel' && (
                <div className="flex items-center">
                  <Group size={20} className="text-blue-600" />
                  <span className="ml-1 text-xs font-medium">3+</span>
                </div>
              )}
              {type === 'interviewer-observers' && (
                <div className="flex items-center space-x-1">
                  <User size={20} className="text-blue-600" />
                  <span className="text-gray-400 text-xs">+</span>
                  <div className="flex items-center">
                    <User size={16} className="text-gray-600" />
                    <Binoculars size={14} className="text-gray-600 -ml-1" />
                  </div>
                </div>
              )}
              <span className="text-xs font-medium text-center">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Date Selection */}
      <div>
        <h3 className="text-lg font-medium mb-2">Select Interview Date Range</h3>
        {showCalendar ? (
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={(range: DateRange | undefined) => {
              setDateRange(range);
              if (range?.from && range?.to) {
                setShowCalendar(false);
              }
            }}
            className="rounded-md border"
          />
        ) : (
          <div className="flex items-center justify-between p-2 border rounded-lg bg-gray-50">
            <span className="text-sm">{formatDateRange()}</span>
            <button onClick={() => setShowCalendar(true)}>
              <Pencil size={16} className="text-blue-600" />
            </button>
          </div>
        )}
      </div>

      {/* Participant Selection */}
      <div>
        <h3 className="text-lg font-medium mb-2">
          {interviewType === '1:1' ? 'Select Interviewer' : 'Select Participants'}
        </h3>
        
        {/* Selected Participants */}
        {selectedParticipants.length > 0 && (
          <div className="mb-2">
            {(interviewType === 'panel' || interviewType === 'interviewer-observers') && (
              <>
                <h4 className="text-sm font-medium mb-1">Interviewers</h4>
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedParticipants
                    .filter(p => p.role === 'interviewer')
                    .map(participant => (
                      <div key={participant.id} className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-1">
                        <Avatar className="w-4 h-4">
                          <AvatarFallback className="text-xs">
                            {participant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs">{participant.name}</span>
                        {!participant.hasCalendarAccess && (
                          <div className="cursor-pointer">
                            <CalendarIcon size={12} className="text-orange-500" />
                          </div>
                        )}
                        <button
                          onClick={() => removeParticipant(participant.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                </div>
                
                {interviewType === 'interviewer-observers' && (
                  <>
                    <h4 className="text-sm font-medium mb-1">Observers</h4>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {selectedParticipants
                        .filter(p => p.role === 'observer')
                        .map(participant => (
                          <div key={participant.id} className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-1">
                            <Avatar className="w-4 h-4">
                              <AvatarFallback className="text-xs">
                                {participant.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{participant.name}</span>
                            {!participant.hasCalendarAccess && (
                              <div className="cursor-pointer">
                                <CalendarIcon size={12} className="text-orange-500" />
                              </div>
                            )}
                            <button
                              onClick={() => removeParticipant(participant.id)}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </>
            )}
            
            {interviewType === '1:1' && (
              <div className="flex flex-wrap gap-1 mb-2">
                {selectedParticipants.map(participant => (
                  <div key={participant.id} className="flex items-center space-x-1 bg-gray-100 rounded-full px-2 py-1">
                    <Avatar className="w-4 h-4">
                      <AvatarFallback className="text-xs">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs">{participant.name}</span>
                    {!participant.hasCalendarAccess && (
                      <div className="cursor-pointer">
                        <CalendarIcon size={12} className="text-orange-500" />
                      </div>
                    )}
                    <button
                      onClick={() => removeParticipant(participant.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
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
            <Button variant="outline" className="flex items-center space-x-2" size="sm">
              <Plus size={14} />
              <span>{interviewType === '1:1' ? 'Add Interviewer' : 'Add Participant'}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-72">
            {teamMembers
              .filter(member => !selectedParticipants.find(p => p.id === member.id))
              .filter(member => interviewType !== '1:1' || selectedParticipants.length === 0)
              .map(member => (
                <DropdownMenuItem 
                  key={member.id} 
                  className="cursor-pointer p-2"
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
                  <div className="flex items-center space-x-2 w-full">
                    <Avatar className="w-5 h-5">
                      <AvatarFallback className="text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{member.name}</div>
                      <div className="text-xs text-gray-500">{member.designation}</div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {!member.hasCalendarAccess && (
                        <CalendarIcon size={12} className="text-orange-500" />
                      )}
                      {member.hasAvailability ? (
                        <CheckCircle size={12} className="text-green-500" />
                      ) : (
                        <XCircle size={12} className="text-red-500" />
                      )}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Availability Status */}
        {selectedParticipants.length > 0 && (
          <div className="mt-2 flex items-center space-x-2">
            {(() => {
              const status = getAvailabilityStatus();
              const IconComponent = status.status === 'green' ? CheckCircle : 
                                  status.status === 'orange' ? AlertCircle : XCircle;
              const colorClass = status.status === 'green' ? 'text-green-500' : 
                               status.status === 'orange' ? 'text-orange-500' : 'text-red-500';
              
              return (
                <>
                  <IconComponent size={16} className={colorClass} />
                  <span className="text-sm">{status.message}</span>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );

  const renderProgressStepper = () => (
    <div className="flex items-center justify-center mb-4">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
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
            <div className={`w-12 h-0.5 mx-3 ${
              getStepIndex(currentStep) > index ? 'bg-blue-600' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getInterviewTypeIcon()}
            <span>AI Schedule Interview</span>
          </DialogTitle>
        </DialogHeader>

        {renderProgressStepper()}

        <div className="mt-2">
          {currentStep === 'setup' && renderSetupStep()}
          {currentStep === 'review' && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Review Details</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Candidate:</strong> {candidateData.name}</p>
                <p><strong>Position:</strong> {candidateData.jobTitle}</p>
                <p><strong>Interview Type:</strong> {interviewType.replace('-', ' + ')}</p>
                <p><strong>Date Range:</strong> {formatDateRange()}</p>
                <p><strong>Participants:</strong> {selectedParticipants.length}</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between mt-4">
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
            {getStepIndex(currentStep) === steps.length - 1 ? 'Schedule' : 'Next'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIScheduleModal;
