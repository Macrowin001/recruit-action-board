
import CandidateTable from "@/components/CandidateTable";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidates</h1>
          <p className="text-gray-600">Manage your candidate pipeline</p>
        </div>
        <CandidateTable />
      </div>
    </div>
  );
};

export default Index;
