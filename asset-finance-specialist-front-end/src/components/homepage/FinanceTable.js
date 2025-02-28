import React, { useState, useEffect } from 'react';
import '../../css/FinanceTable.css';

function FinanceTable({ financeData, userData }) {
  // Initialize local state with an `isEditing` flag for each record
//   const [tableData, setTableData] = useState(
//     financeData.map(item => ({ ...item, isEditing: false }))
//   );
  
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(financeData.map(item => ({ ...item, isEditing: false, isSelected: false })));
  }, [financeData]);

  console.log("Finance data in finance table: ",financeData)
  console.log("User data in finance table: ",userData)
  console.log("Table data in finance table: ",tableData)

  // Toggle edit mode for a specific row
  const handleEditToggle = (index) => {

    
    setTableData(prevData =>
      prevData.map((item, i) =>
        i === index
          ? { ...item, isEditing: !item.isEditing, isSelected: !item.isSelected }
          : item
      )
    );
  };

  // Handle changes for editable fields (income, assets, liabilities)
  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    setTableData(prevData =>
      prevData.map((item, i) =>
        i === index
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  // Toggle row selection for 'Add Application' or 'Delete'
  const handleSelectionToggle = (index) => {
    setTableData(prevData =>
      prevData.map((item, i) =>
        i === index
          ? { ...item, isSelected: !item.isSelected }
          : item
      )
    );
  };

  // Check if any rows are selected
  const anyRowSelected = tableData.some(item => item.isSelected);

  return (
    <div className="finance-table-container">

{anyRowSelected && (
        <div className="top-right-buttons">
          <button onClick={() => console.log('Add Application')}>
            Add Application
          </button>
          <button onClick={() => console.log('Delete')}>
            Delete
          </button>
        </div>
        
      )}
    <br></br>
    <br></br>
    <br></br>
    <table className="finance-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
          <th>Income</th>
          <th>Assets</th>
          <th>Liabilities</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((record, index) => (
          <tr key={index}>
            {/* Non-editable user fields */}
            <td>{userData.name}</td>
            <td>{userData.age}</td>
            <td>{userData.address}</td>

            {/* Editable finance fields */}
            <td>
              {record.isEditing ? (
                <input
                  type="text"
                  value={record.income}
                  onChange={(e) => handleInputChange(e, index, 'income')}
                />
              ) : (
                record.income
              )}
            </td>
            <td>
              {record.isEditing ? (
                <input
                  type="text"
                  value={record.assets}
                  onChange={(e) => handleInputChange(e, index, 'assets')}
                />
              ) : (
                record.assets
              )}
            </td>
            <td>
              {record.isEditing ? (
                <input
                  type="text"
                  value={record.liabilities}
                  onChange={(e) => handleInputChange(e, index, 'liabilities')}
                />
              ) : (
                record.liabilities
              )}
            </td>

            {/* Checkbox to toggle edit mode */}
            <td className="checkbox-cell">
              <input
                type="checkbox"
                checked={record.isEditing}
                onChange={() => handleEditToggle(index)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default FinanceTable;
