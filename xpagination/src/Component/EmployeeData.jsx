import React from "react";

function EmployeeData({empinfo, currentPage, totalpages, handleNext, handlePrev}){
  return(<>
    <h2>Employee Data Table</h2>
    <table style={{borderCollapse: "collapse", textAlign: "left", width: "100%"}} className="emptbl">
      
      <thead>
        <tr className="tblheading">
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {
          empinfo.length>0?
          (empinfo.map((emp)=>(
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))
          ):(<tr>
            <td>No Employee data available</td>
            </tr>)
        }
        
      </tbody>
    </table>
    <div className="paginationwrap">    
    <button
    onClick={handlePrev}
    disabled={currentPage===1}
    aria-label="Go to previous page"
    >Previous</button>
    <p>{currentPage}</p>
    <button
    onClick={handleNext}
    disabled={currentPage>=totalpages}
    aria-label="Go to next page"
    >Next</button>
    </div>
  </>)


}export default EmployeeData;