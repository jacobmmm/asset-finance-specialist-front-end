import React, { useState, useEffect } from 'react';
import '../../css/FinanceTable.css';
import {useNavigate} from 'react-router-dom'

function FinanceTable({ financeData, userData, userEmail }) {
  // Initialize local state with an `isEditing` flag for each record
//   const [tableData, setTableData] = useState(
//     financeData.map(item => ({ ...item, isEditing: false }))
//   );
  
  const [tableData, setTableData] = useState([]);

  console.log("User Email in finance table: ",userEmail)

  let navigate = useNavigate();

  useEffect(() => {
    setTableData(financeData.map(item => ({ ...item, isEditing: false, isSelected: false })));
  }, [financeData]);

  console.log("Finance data in finance table: ",financeData)
  console.log("User data in finance table: ",userData)
  console.log("Table data in finance table: ",tableData)


  function addRecord () { 

        console.log("Add application clicked in Finance Table")
        console.log("Navigating to finance registration with email:", userEmail)

        //navigate('/financeRegistration',{ state: { email: userEmail } });
        navigate(`/financeRegistration?email=${encodeURIComponent(userEmail)}`);


  };

  const handleDelete = async () => {
    // Filter the table data for selected records
    const selectedRecords = tableData.filter(record => record.isSelected);

    console.log("Selected records for deletion:", selectedRecords);
  
    // Check if any records are selected
    if (selectedRecords.length === 0) {
      console.log("No records selected for deletion");
      return;
    }
  
    // Build the payload.
    // Adjust the fields if your backend expects different field names or additional info.
    const payload = {
      email: userData.email,
      records: selectedRecords.map(record => ({
        income: record.income,
        assets: record.assets,
        liabilities: record.liabilities,
        expenses: record.expenses,
      })),
    };

    console.log("Payload for deletion:", payload);
  
    try {
      const response = await fetch('http://localhost:5000/deleteFinanceApplication', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error("Error deleting records");
      }
  
      const result = await response.json();
      console.log("Deletion result:", result);
  
      // Optionally update your state or refresh the table after deletion
    } catch (error) {
      console.error("Error in deletion:", error);
    }

    navigate('/',{ state: { email: userEmail } })
  };
  

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


        <div className="top-right-buttons">
          <button onClick={addRecord}>
            Add Application
          </button>
          {anyRowSelected && (    
          <button onClick={handleDelete}>
            Delete
          </button>)}
          </div>
        
        
      
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
          <th>Expenses</th>
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

            <td>
              {record.isEditing ? (
                <input
                  type="text"
                  value={record.expenses}
                  onChange={(e) => handleInputChange(e, index, 'expenses')}
                />
              ) : (
                record.expenses
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
