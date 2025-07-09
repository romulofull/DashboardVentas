import { useState } from 'react';
import FileUpload from './components/FileUpload';
import SalesTable from './components/SalesTable';
import Dashboard from './components/Dashboard';

function App() {
  const [salesData, setSalesData] = useState([]);

  return (
     <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '1320px', padding: '2rem', background: '#303030', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)',margin: '0 auto', fontSize: '14px', }}>
      <h1 style={{ textAlign: 'center' }}>📊 Dashboard de Ventas</h1>
      <FileUpload onDataLoaded={setSalesData} />
      {salesData.length > 0 && (
        <>
          <SalesTable data={salesData} />
          <Dashboard data={salesData} />
        </>
      )}
    </div>
    </div>
  );
}

export default App;
