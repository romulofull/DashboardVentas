import { BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, Legend, Cell, ResponsiveContainer } from 'recharts';

const Dashboard = ({ data }) => {
  const ingresosPorSucursal = Object.values(
    data.reduce((acc, cur) => {
      acc[cur.Sucursal] = acc[cur.Sucursal] || { name: cur.Sucursal, total: 0 };
      acc[cur.Sucursal].total += Number(cur.Ingreso);
      return acc;
    }, {})
  );

  const pagos = data.reduce((acc, row) => {
    acc[row['Forma de Pago']] = (acc[row['Forma de Pago']] || 0) + Number(row.Ingreso);
    return acc;
  }, {});

  const metodoPagoData = Object.entries(pagos).map(([key, value]) => ({ name: key, value }));
  const ventasPorVendedor = Object.values(
  data.reduce((acc, cur) => {
    acc[cur.Vendedor] = acc[cur.Vendedor] || { name: cur.Vendedor, total: 0 };
    acc[cur.Vendedor].total += Number(cur.Ingreso);
    return acc;
  }, {})
);

const productosPorSucursal = data.reduce((acc, cur) => {
  const sucursal = cur.Sucursal;
  const cantidad = Number(cur.Cantidad);
  acc[sucursal] = (acc[sucursal] || 0) + cantidad;
  return acc;
}, {});

const productosSucursalData = Object.entries(productosPorSucursal).map(
  ([sucursal, cantidad]) => ({ name: sucursal, total: cantidad })
);

 const canales = data.reduce((acc, row) => {
    acc[row['Canal de Venta']] = (acc[row['Canal de Venta']] || 0) + Number(row.Ingreso);
    return acc;
  }, {});
  const canalData = Object.entries(canales).map(([key, value]) => ({ name: key, value }));

  const tiposCliente = data.reduce((acc, row) => {
    acc[row['Tipo de Cliente']] = (acc[row['Tipo de Cliente']] || 0) + Number(row.Ingreso);
    return acc;
  }, {});
  const tipoClienteData = Object.entries(tiposCliente).map(([key, value]) => ({ name: key, value }));


  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  const getColorByCity = (city) => {
  switch (city) {
    case 'Quito': return '#1E3A8A';       
    case 'Guayaquil': return '#00BFFF';   
    case 'Cuenca': return '#B22222';      
         
  }
};

const getColorByVendedor = (name) => {
  switch (name) {
    case 'Pedro': return '#FF8C00';   
    case 'Carla': return '#1E90FF'; 
    case 'Luis': return '#32CD32';  
    case 'Ana': return '#FF69B4';    
    default: return '#CCCCCC';       
  }
};

  return (
<div >
<div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginBottom: '-1rem', }}>
<div style={{ width: '30%', margin: '0 auto', background: '#303030'}}>
   <div style={{ textAlign: 'center' }}>
        <h3 style= {{display: 'inline-block', color: 'white',  borderRadius: '12px',  padding: '0.5rem', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', textAlign: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', letterSpacing: '1px',  background: 'linear-gradient(to right, #545454, #7a7a7a)', marginBottom: '-1rem'}}>Ingresos por Sucursal</h3>
</div>
      <BarChart width={400} height={350} data={ingresosPorSucursal}>
      <XAxis dataKey="name" stroke="#ffffff" tick={{ fill: '#ffffff' }} />
      <YAxis stroke="#ffffff" tick={{ fill: '#ffffff' }} />
      <Tooltip />
       <Bar dataKey="total">
    {ingresosPorSucursal.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={getColorByCity(entry.name)} />
    ))}
  </Bar>
      </BarChart>
      </div>

  <div style={{ width: '30%', margin: '0 auto',  background: '#303030'}}>
     <div style={{ textAlign: 'center' }}>
       <h3 style= {{display: 'inline-block', color: 'white',  borderRadius: '12px',  padding: '0.5rem', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', textAlign: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', letterSpacing: '1px',  background: 'linear-gradient(to right, #545454, #7a7a7a)', marginBottom: '-1rem'}}>Forma de Pago</h3>
       </div>
      <PieChart width={450} height={350}>
      <Pie
      data={metodoPagoData}
      dataKey="value"
      nameKey="name"
      outerRadius={140}
      label>
           {
        metodoPagoData.map((entry, index) => {
          const color = entry.name === 'Efectivo' ? '#FFA500' : '#1E90FF'; // Naranja y Azul
          return <Cell key={`cell-${index}`} fill={color} />;
        })
      }
            <Legend wrapperStyle={{ color: 'black', fontSize: '14px' }}/>
          </Pie>
          </PieChart>
          </div>

 <div style={{  width: '30%', margin: '0 auto', background: '#303030'}}>
  <div style={{ textAlign: 'center' }}>
  <h3 style= {{display: 'inline-block', color: 'white',  borderRadius: '12px',  padding: '0.5rem', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', textAlign: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', letterSpacing: '1px', background: 'linear-gradient(to right, #545454, #7a7a7a)', marginBottom: '-1rem',}}>
    Ventas por Vendedor
  </h3>
  </div>
  <BarChart width={350} height={350} data={ventasPorVendedor}>
    <XAxis dataKey="name" stroke="#ffffff" tick={{ fill: '#ffffff' }} />
     <YAxis stroke="#ffffff" tick={{ fill: '#ffffff' }} />
    <Tooltip />
   <Bar dataKey="total">
    {ventasPorVendedor.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={getColorByVendedor(entry.name)} />
    ))}
  </Bar>
  </BarChart>
  </div>
</div>
<div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem', }}>
<div style={{ width: '30%', margin: '0 auto', background: '#303030' }}>
    <div style={{ textAlign: 'center' }}>
 <h3 style= {{ display: 'inline-block', color: 'white',  borderRadius: '12px',  padding: '0.5rem', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', textAlign: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', letterSpacing: '1px',  background: 'linear-gradient(to right, #545454, #7a7a7a)', marginBottom: '-1rem'}}>
    Canal de Venta
  </h3>
  </div>
  <PieChart width={450} height={350}>
   <Pie data={canalData} dataKey="value" nameKey="name" outerRadius={140} label>
  {canalData.map((entry, index) => {
    const color = entry.name === 'Online' ? '#2196F3' : '#4CAF50'; // Azul y Verde
    return <Cell key={`cell-${index}`} fill={color} />;
  })}
</Pie>
    <Legend wrapperStyle={{ color: 'white', fontSize: '14px' }} />
    <Tooltip />
  </PieChart>
</div>
<div style={{ width: '30%', margin: '0 auto',  background: '#303030' }}>
    <div style={{ textAlign: 'center' }}>
  <h3 style= {{ display: 'inline-block', color: 'white',  borderRadius: '12px',  padding: '0.5rem', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', textAlign: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', letterSpacing: '1px',  background: 'linear-gradient(to right, #545454, #7a7a7a)', marginBottom: '-1rem'}}>
    Productos Vendidos por Sucursal
  </h3>
  </div>
  <BarChart width={380} height={350} data={productosSucursalData}>
       <XAxis dataKey="name" stroke="#ffffff" tick={{ fill: '#ffffff' }} />
     <YAxis stroke="#ffffff" tick={{ fill: '#ffffff' }} />
    <Tooltip />
     <Bar dataKey="total">
    {ingresosPorSucursal.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={getColorByCity(entry.name)} />
    ))}
  </Bar>
  </BarChart>
</div>
<div style={{ width: '30%', margin: '0 auto',  background: '#303030'}}>
    <div style={{ textAlign: 'center' }}>
  <h3 style= {{ display: 'inline-block', color: 'white',  borderRadius: '12px',  padding: '0.5rem', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', textAlign: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)', letterSpacing: '1px',  background: 'linear-gradient(to right, #545454, #7a7a7a)', marginBottom: '-1rem' }}>
    Tipo de Cliente
  </h3>
  </div>
  <PieChart width={450} height={350}>
    <Pie data={tipoClienteData} dataKey="value" nameKey="name" outerRadius={140} label>
      {tipoClienteData.map((entry, index) => {
        const color = entry.name === 'Natural' ? '#1E90FF' : '#32CD32'; 
        return <Cell key={`cell-${index}`} fill={color} />;
      })}
    </Pie>
    <Legend wrapperStyle={{ color: 'white', fontSize: '14px' }} />
    <Tooltip />
  </PieChart>
</div>
</div>
      </div>
  );
};

export default Dashboard;
