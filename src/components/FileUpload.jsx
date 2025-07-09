import * as XLSX from 'xlsx';

const FileUpload = ({ onDataLoaded }) => {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer(); 

    const workbook = XLSX.read(data, { type: 'array' }); 
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const parsedData = XLSX.utils.sheet_to_json(sheet);
    
    onDataLoaded(parsedData);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
    </div>
  );
};

export default FileUpload;
