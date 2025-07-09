const SalesTable = ({ data }) => {
  return (
    <table border="1" style={{ color: 'black', margin: '0 auto', borderCollapse: 'collapse',  width: 'auto', fontSize: '10px',tableLayout: 'auto'  }}>
      <thead>
        <tr>
          <th>Sucursal</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Ingreso</th>
          <th>Vendedor</th>
          <th>Forma de Pago</th>
          <th>Canal de Pago</th>
          <th>Tipo de Cliente</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td style={{ textAlign: 'center', padding: '2px', wordWrap: 'break-word' }}>{row.Sucursal}</td>
            <td style={{ textAlign: 'center', padding: '2px', wordWrap: 'break-word' }}>{row.Cantidad}</td>
            <td style={{ textAlign: 'center', padding: '2px', wordWrap: 'break-word' }}>{row['Precio Unitario']}</td>
            <td style={{ textAlign: 'center', padding: '2px', wordWrap: 'break-word' }}>{row.Ingreso}</td>
            <td style={{ textAlign: 'center', padding: '2px', wordWrap: 'break-word' }}>{row.Vendedor}</td>
            <td style={{ textAlign: 'center', padding: '2px', wordWrap: 'break-word' }}>{row['Forma de Pago']}</td>
            <td style={{ textAlign: 'center', padding: '2px', wordWrap: 'break-word' }}>{row['Canal de Venta']}</td>
            <td style={{ textAlign: 'center', padding: '2px', wordWrap: 'break-word' }}>{row['Tipo de Cliente']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SalesTable;
