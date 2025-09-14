import { useEffect, useState } from 'react';
import './App.css';
import EmployeeData from "./Component/EmployeeData";

function App() {
  const [empData, setEmpData] = useState("");
  const [currentPage, setCurrentPage] = useState(1);  
  const [error, setError] = useState(null);
  const maxrecordsperpage = 10;  

  const handleNext = () => {
    setCurrentPage((prevPage)=>Math.min(prevPage+1, totalPages));
  }
  const handlePrev = () => {
    setCurrentPage((prevPage)=>Math.max(prevPage-1, 1));
  }

  const getempData = async() => {
      try {
        const url = " https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const resobj = await res.json();
        //console.log("Employee data : " + resobj.map((emp)=>emp.name));
        setEmpData(resobj);       

      } catch (error) {
        //console.log("Error" + error);
        setError(error.message);
        alert("Failed to fetch data");
      }
  }

  
  useEffect(()=>{
    getempData();    
  }, [])
  //console.log("length of empData usestate var " + empData.length);
  const totalPages = Math.ceil((empData.length)/maxrecordsperpage);
 // console.log("number of total pages var " + totalPages);
  const endindx = currentPage*maxrecordsperpage;
  const startindx = endindx-maxrecordsperpage;
  //console.log("Start index var " + startindx + "End index var " + endindx);
  const currentEmpData = empData.slice(startindx, endindx);

  return (<div style={{padding:"20px", background: "rgba(247, 246, 247, 1)", height: "100vh"}}> 
  {
    error?(<p>Error: {error}</p>):
    (<EmployeeData empinfo={currentEmpData}
    currentPage={currentPage} 
    totalpages={totalPages} 
    handleNext={handleNext}
    handlePrev={handlePrev}
    />)
  }  
  </div>);

}

export default App;
