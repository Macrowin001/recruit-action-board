
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import ActionButton from './ActionButton';

interface Candidate {
  id: number;
  name: string;
  email: string;
  position: string;
  status: 'shortlisting' | 'screening' | 'process-ongoing';
  consentStatus: 'available' | 'consent-expiring';
  stage: 'Schedule interview' | 'Short list' | 'Screen' | 'Reschedule';
  location: string;
  experience: string;
  hasInterviewScheduled?: boolean;
}

const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    position: 'Senior Frontend Developer',
    status: 'process-ongoing',
    consentStatus: 'available',
    stage: 'Schedule interview',
    location: 'Bangalore, Karnataka',
    experience: '5+ years',
    hasInterviewScheduled: false
  },
  {
    id: 2,
    name: 'Arjun Patel',
    email: 'arjun.patel@email.com',
    position: 'Full Stack Engineer',
    status: 'process-ongoing',
    consentStatus: 'consent-expiring',
    stage: 'Reschedule',
    location: 'Mumbai, Maharashtra',
    experience: '3+ years',
    hasInterviewScheduled: true
  },
  {
    id: 3,
    name: 'Kavya Reddy',
    email: 'kavya.reddy@email.com',
    position: 'UX Designer',
    status: 'process-ongoing',
    consentStatus: 'available',
    stage: 'Schedule interview',
    location: 'Hyderabad, Telangana',
    experience: '4+ years',
    hasInterviewScheduled: false
  },
  {
    id: 4,
    name: 'Rohit Kumar',
    email: 'rohit.kumar@email.com',
    position: 'Backend Developer',
    status: 'shortlisting',
    consentStatus: 'available',
    stage: 'Short list',
    location: 'Delhi, NCR',
    experience: '6+ years'
  },
  {
    id: 5,
    name: 'Ananya Singh',
    email: 'ananya.singh@email.com',
    position: 'Product Manager',
    status: 'screening',
    consentStatus: 'consent-expiring',
    stage: 'Screen',
    location: 'Pune, Maharashtra',
    experience: '7+ years'
  },
  {
    id: 6,
    name: 'Vikram Joshi',
    email: 'vikram.joshi@email.com',
    position: 'Data Scientist',
    status: 'process-ongoing',
    consentStatus: 'available',
    stage: 'Schedule interview',
    location: 'Chennai, Tamil Nadu',
    experience: '2+ years',
    hasInterviewScheduled: false
  },
  {
    id: 7,
    name: 'Neha Agarwal',
    email: 'neha.agarwal@email.com',
    position: 'DevOps Engineer',
    status: 'process-ongoing',
    consentStatus: 'available',
    stage: 'Schedule interview',
    location: 'Gurgaon, Haryana',
    experience: '4+ years',
    hasInterviewScheduled: false
  },
  {
    id: 8,
    name: 'Rahul Mishra',
    email: 'rahul.mishra@email.com',
    position: 'QA Engineer',
    status: 'process-ongoing',
    consentStatus: 'consent-expiring',
    stage: 'Reschedule',
    location: 'Noida, Uttar Pradesh',
    experience: '3+ years',
    hasInterviewScheduled: true
  },
  {
    id: 9,
    name: 'Sunita Kapoor',
    email: 'sunita.kapoor@email.com',
    position: 'Business Analyst',
    status: 'process-ongoing',
    consentStatus: 'available',
    stage: 'Schedule interview',
    location: 'Kolkata, West Bengal',
    experience: '5+ years',
    hasInterviewScheduled: false
  },
  {
    id: 10,
    name: 'Amit Sharma',
    email: 'amit.sharma@email.com',
    position: 'Mobile Developer',
    status: 'process-ongoing',
    consentStatus: 'available',
    stage: 'Schedule interview',
    location: 'Jaipur, Rajasthan',
    experience: '4+ years',
    hasInterviewScheduled: false
  },
  {
    id: 11,
    name: 'Pooja Gupta',
    email: 'pooja.gupta@email.com',
    position: 'UI/UX Designer',
    status: 'process-ongoing',
    consentStatus: 'consent-expiring',
    stage: 'Schedule interview',
    location: 'Ahmedabad, Gujarat',
    experience: '3+ years',
    hasInterviewScheduled: false
  },
  {
    id: 12,
    name: 'Deepak Singh',
    email: 'deepak.singh@email.com',
    position: 'Cloud Architect',
    status: 'process-ongoing',
    consentStatus: 'available',
    stage: 'Reschedule',
    location: 'Bhopal, Madhya Pradesh',
    experience: '8+ years',
    hasInterviewScheduled: true
  },
  {
    id: 13,
    name: 'Ritu Verma',
    email: 'ritu.verma@email.com',
    position: 'Scrum Master',
    status: 'shortlisting',
    consentStatus: 'available',
    stage: 'Short list',
    location: 'Lucknow, Uttar Pradesh',
    experience: '6+ years'
  },
  {
    id: 14,
    name: 'Karan Mehta',
    email: 'karan.mehta@email.com',
    position: 'Security Engineer',
    status: 'process-ongoing',
    consentStatus: 'available',
    stage: 'Schedule interview',
    location: 'Indore, Madhya Pradesh',
    experience: '5+ years',
    hasInterviewScheduled: false
  },
  {
    id: 15,
    name: 'Swati Rao',
    email: 'swati.rao@email.com',
    position: 'Technical Writer',
    status: 'process-ongoing',
    consentStatus: 'consent-expiring',
    stage: 'Schedule interview',
    location: 'Kochi, Kerala',
    experience: '2+ years',
    hasInterviewScheduled: false
  },
  {
    id: 16,
    name: 'Manoj Kumar',
    email: 'manoj.kumar@email.com',
    position: 'Machine Learning Engineer',
    status: 'screening',
    consentStatus: 'available',
    stage: 'Screen',
    location: 'Coimbatore, Tamil Nadu',
    experience: '4+ years'
  }
];

const CandidateTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCandidates = mockCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'process-ongoing':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: '#2563EB' }}>
            Process Ongoing
          </span>
        );
      case 'shortlisting':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: '#10B981' }}>
            Shortlisting
          </span>
        );
      case 'screening':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white" style={{ backgroundColor: '#6B7280' }}>
            Screening
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full shadow-lg" style={{ backgroundColor: '#F9FAFB' }}>
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Candidate Pipeline</h2>
          <div className="w-80">
            <Input
              type="text"
              placeholder="Find candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidate
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stage
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Consent Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {candidate.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {candidate.email}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{candidate.position}</div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {getStatusBadge(candidate.status)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {candidate.stage}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {candidate.location}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {candidate.experience}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusBadge status={candidate.consentStatus} />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {candidate.status === 'process-ongoing' && (
                    <ActionButton 
                      candidateId={candidate.id} 
                      isReschedule={candidate.hasInterviewScheduled || false}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No candidates found matching your search.</p>
        </div>
      )}
    </Card>
  );
};

export default CandidateTable;
