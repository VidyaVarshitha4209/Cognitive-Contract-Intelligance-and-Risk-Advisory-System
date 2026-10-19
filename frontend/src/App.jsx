import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import UploadContract from './pages/UploadContract.jsx';
import PolicyRules from './pages/PolicyRules.jsx';
import ContractDetail from './pages/ContractDetail.jsx';
import MyContracts from './pages/MyContracts.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedContract, setSelectedContract] = useState(null);

  return (
    <div className="flex min-h-screen bg-brand-dark text-brand-text">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 ml-64 flex flex-col">
        <Navbar onUploadClick={() => setActiveTab('upload')} />

        <main className="flex-1">
          {activeTab === 'dashboard' && (
            <Dashboard onSelectContract={(c) => {
              setSelectedContract(c);
              setActiveTab('contract-detail');
            }} />
          )}

          {activeTab === 'contracts' && (
            <MyContracts onSelectContract={(c) => {
              setSelectedContract(c);
              setActiveTab('contract-detail');
            }} />
          )}

          {activeTab === 'upload' && (
            <UploadContract onUploadSuccess={() => setActiveTab('dashboard')} />
          )}

          {activeTab === 'policy' && <PolicyRules />}

          {activeTab === 'contract-detail' && (
            <ContractDetail 
              contract={selectedContract} 
              onBack={() => setActiveTab('dashboard')} 
            />
          )}
        </main>
      </div>
    </div>
  );
}