import React, { useState, useEffect, use } from 'react';
import '../../css/FinanceTable.css';
import {useNavigate} from 'react-router-dom'
import { FaCheck, FaTimes } from 'react-icons/fa';

function FinanceTable({ financeData, userData, userEmail }) {
  // Initialize local state with an `isEditing` flag for each record
//   const [tableData, setTableData] = useState(
//     financeData.map(item => ({ ...item, isEditing: false }))
//   );
  
  const [tableData, setTableData] = useState([]);

  console.log("User Email in finance table: ",userEmail)

  let navigate = useNavigate();

  useEffect(() => {
    setTableData(financeData.map(item => ({ ...item, isEditing: false, // Keep a draft copy of each field
      draftIncome: item.income,
      draftAssets: item.assets,
      draftLiabilities: item.liabilities,
      draftExpenses: item.expenses,
      isSelected: false })));
  }, [financeData]);

  useEffect(() => {

    console.log("Table after change: ",tableData)
    },[tableData])

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
      const response = await fetch('https://asset-finance-specialist-backend.onrender.com/deleteFinanceApplication', {
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

      setTableData(prevData => prevData.filter(record => !record.isSelected));
  
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

  const handleDraftChange = (index, field, value) => {
    setTableData(prevData => {
      const newData = [...prevData];
      newData[index][`draft${capitalize(field)}`] = value;
      //newData[index][field] = value
      return newData;
    });
  };

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Confirm the change (tick icon)
  const handleConfirmChange = (index, field) => {
    console.log("Table Data in confirm change:",tableData)
    const updatedValue = tableData[index][`draft${capitalize(field)}`];
    console.log("Updated value in confirm change:",updatedValue);
    const attributes = [field];
    const updatedRecord = { 
      ...tableData[index],
      
    };
  
    const values = [updatedValue];
    handleUpdateRecord(updatedRecord, attributes, values, index);
    // const updatedValue = tableData[index][`draft${capitalize(field)}`];
    // const updatedRecord = { 
    //   ...tableData[index],
    //   [field]: updatedValue
    // };
    // setTableData(prevData => {
    //   const newData = [...prevData];
    //   // 1) Update the original field with the draft
    //   //newData[index][field] = newData[index][`draft${capitalize(field)}`]; //changed command

    //   // 2) Build arrays of attributes & values for the *single* updated field
    //   const attributes = [field];
    //   const values = [newData[index][`draft${capitalize(field)}`]];

    //   console.log("new Data being passed to update record:",newData[index])

    //   // 3) Call function to send updated data to backend
    //   //handleUpdateRecord(newData[index], attributes, values);

    //   (async () => {
    //     await handleUpdateRecord(newData[index], attributes, values);
    //   })();

    //   return newData;
    // });
  };

  // Revert the change (cross icon)
  const handleCancelChange = (index, field) => {
    setTableData(prevData => {
      const newData = [...prevData];
      // Revert draft back to the original
      newData[index][`draft${capitalize(field)}`] = newData[index][field];
      return newData;
    });
  };

  const handleUpdateRecord = async (record, attributes, values, index) => {
    // Build payload

    console.log("Record in handleUpdateRecord:",record)
    console.log("Attributes in handleUpdateRecord:",attributes)
    console.log("Values in handleUpdateRecord:",values)


    const payload = {
      email: userData.email,
      records: [
        {
          // The identifying fields in your DB
          income: record.income,
          assets: record.assets,
          liabilities: record.liabilities,
          expenses: record.expenses, // If relevant
          attributes,
          values
        }
      ]
    };

    console.log("Payload for update:", payload);
    try {
    const response = await fetch('https://asset-finance-specialist-backend.onrender.com/updateFinanceApplication', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error("Error updating records");
    }

    const result = await response.json();
    console.log("Updation result:", result);
     
    record[attributes[0]] = values[0];
    console.log("Record after updation:",record)

    setTableData(prevData => {
      const newData = [...prevData];
      // Replace the row at the given index with the updated record.
      // Optionally, you can update isEditing to false or make other changes.
      newData[index] = { ...record };
      return newData;
    });
  }catch (error) {
    console.error("Error in updating:", error); 

  }

  navigate('/',{ state: { email: userEmail } })
  
  

}


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
                <div className="input-with-icons">
                <input
                  type="text"
                  value={record.draftIncome}
                  onChange={(e) => handleDraftChange(index, 'income', e.target.value)}
                />
                {/* Show icons only if the draft differs from the original */}
                {record.draftIncome !== record.income && (
                  <div className="icons-container">
                    <FaCheck onClick={() => handleConfirmChange(index, 'income')} />
                    <FaTimes onClick={() => handleCancelChange(index, 'income')} />
                  </div>
                )}
              </div>
            )  : (
                record.income
              )}
            </td>
            <td>
              {record.isEditing ? (
                <div className="input-with-icons">
                <input
                  type="text"
                  value={record.draftAssets}
                  onChange={(e) => handleDraftChange(index, 'assets', e.target.value)}
                />
                {record.draftAssets !== record.assets && (
                  <div className="icons-container">
                    <FaCheck onClick={() => handleConfirmChange(index, 'assets')} />
                    <FaTimes onClick={() => handleCancelChange(index, 'assets')} />
                  </div>
                )}
              </div>
              ) : (
                record.assets
              )}
            </td>
            <td>
              {record.isEditing ? (
                <div className="input-with-icons">
                <input
                  type="text"
                  value={record.draftLiabilities}
                  onChange={(e) => handleDraftChange(index, 'liabilities', e.target.value)}
                />
                {record.draftLiabilities !== record.liabilities && (
                  <div className="icons-container">
                    <FaCheck onClick={() => handleConfirmChange(index, 'liabilities')} />
                    <FaTimes onClick={() => handleCancelChange(index, 'liabilities')} />
                  </div>
                )}
              </div>
              ) : (
                record.liabilities
              )}
            </td>

            <td>
              {record.isEditing ? (
               <div className="input-with-icons">
               <input
                 type="text"
                 value={record.draftExpenses}
                 onChange={(e) => handleDraftChange(index, 'expenses', e.target.value)}
               />
               {record.draftExpenses !== record.expenses && (
                 <div className="icons-container">
                   <FaCheck onClick={() => handleConfirmChange(index, 'expenses')} />
                   <FaTimes onClick={() => handleCancelChange(index, 'expenses')} />
                 </div>
               )}
             </div>
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
    
    <div className="bottom-buttons">
      <button onClick={addRecord}>
        Add Application
      </button>
    </div>
    </div>
  );
}

export default FinanceTable;
