
import React from 'react';
import { Check, Clock } from 'lucide-react';

interface StatusBadgeProps {
  status: 'available' | 'consent-expiring';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  if (status === 'available') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: '#10B981' }}>
        <Check size={12} className="mr-1" />
        Available
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: '#F59E0B' }}>
      <Clock size={12} className="mr-1" />
      Consent expiring
    </span>
  );
};

export default StatusBadge;
