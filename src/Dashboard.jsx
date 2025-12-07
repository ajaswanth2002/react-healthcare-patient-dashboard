import React, { useEffect, useState } from "react";
import axios from "axios";

import PatientCard from "./components/PatientCard";
import LabResults from "./components/LabResults";
import DiagonalTable from "./components/DiagonalTable";
import Navbar from "./components/Navbar";
import MiddleContainer from "./components/MiddleContainer";
import Sidebar from "./components/Sidebar";

// const Dashboard = () => {
//   const [patients, setPatients] = useState([]);
//   const [selectedPatient, setSelectedPatient] = useState(null);

//   useEffect(() => {
//     const controller = new AbortController();

//     const fetchPatients = async () => {
//       try {
//         const authKey = btoa("coalition:skills-test");
//         const response = await axios.get(
//           "https://fedskillstest.coalitiontechnologies.workers.dev",
//           {
//             headers: { Authorization: `Basic ${authKey}` },
//             signal: controller.signal,
//           }
//         );

//         setPatients(response.data || []);
//         if (response.data?.length) setSelectedPatient(response.data[0]);
//       } catch (err) {
//         console.error("Error fetching:", err);
//       }
//     };

//     fetchPatients();
//     return () => controller.abort();
//   }, []);

  

//   return (
//     <div className="dashboard">
//       <Navbar />

//       <Sidebar
//         patients={patients}
//         selectedPatient={selectedPatient}
//         setSelectedPatient={setSelectedPatient}
//       />

//       <section className="middle-section">
//         <MiddleContainer selectedPatient={selectedPatient} />
//         <DiagonalTable selectedPatient={selectedPatient} />
//       </section>

//       <aside className="right-section">
//         <PatientCard selectedPatient={selectedPatient} />
//         <LabResults selectedPatient={selectedPatient} />
//       </aside>
//     </div>
//   );
// };
const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchPatients = async () => {
      try {
        const authKey = btoa("coalition:skills-test");
        const response = await axios.get(
          "https://fedskillstest.coalitiontechnologies.workers.dev",
          {
            headers: { Authorization: `Basic ${authKey}` },
            signal: controller.signal,
          }
        );

        setPatients(response.data || []);
        if (response.data?.length) setSelectedPatient(response.data[0]);
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };

    fetchPatients();
    return () => controller.abort();
  }, []);

  // ⬇️ Add this
  if (!selectedPatient) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <Navbar />

      <Sidebar
        patients={patients}
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
      />

      <section className="middle-section">
        <MiddleContainer selectedPatient={selectedPatient} />
        <DiagonalTable selectedPatient={selectedPatient} />
      </section>

      <aside className="right-section">
        <PatientCard selectedPatient={selectedPatient} />
        <LabResults selectedPatient={selectedPatient} />
      </aside>
    </div>
  );
};
export default Dashboard;