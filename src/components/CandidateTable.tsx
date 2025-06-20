
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
  status: 'available' | 'consent-expiring';
  stage: 'Schedule interview' | 'Short list' | 'Screen';
  location: string;
  experience: string;
}

const mockCandidates: Candidate[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    position: 'Senior Frontend Developer',
    status: 'available',
    stage: 'Schedule interview',
    location: 'San Francisco, CA',
    experience: '5+ years'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    position: 'Full Stack Engineer',
    status: 'consent-expiring',
    stage: 'Schedule interview',
    location: 'New York, NY',
    experience: '3+ years'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    position: 'UX Designer',
    status: 'available',
    stage: 'Schedule interview',
    location: 'Austin, TX',
    experience: '4+ years'
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@email.com',
    position: 'Backend Developer',
    status: 'available',
    stage: 'Short list',
    location: 'Seattle, WA',
    experience: '6+ years'
  },
  {
    id: 5,
    name: 'Jessica Taylor',
    email: 'jessica.taylor@email.com',
    position: 'Product Manager',
    status: 'consent-expiring',
    stage: 'Short list',
    location: 'Boston, MA',
    experience: '7+ years'
  },
  {
    id: 6,
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    position: 'Data Scientist',
    status: 'available',
    stage: 'Screen',
    location: 'Chicago, IL',
    experience: '2+ years'
  }
];

const CandidateTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCandidates = mockCandidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full shadow-lg">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-6">
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
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidate
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stage
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCandidates.map((candidate) => (
              <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {candidate.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {candidate.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{candidate.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={candidate.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {candidate.stage}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {candidate.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {candidate.experience}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ActionButton candidateId={candidate.id} />
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
