import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./Dashboard.css";
import jwtEncode from "jwt-encode";

const username = "coalition";
const password = "skills-test";

const payload = { username, password };

// Use a secret for demo. In production, this must be on backend only
const secret = "your-very-strong-secret";

const token = jwtEncode(payload, secret);
console.log("Encoded JWT token:", token);
const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filterYear, setFilterYear] = useState("All");
  const [searchActive, setSearchActive] = useState(false);
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
      
      // Log patient names here
      response.data.forEach(p => console.log(p.name));
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Fetch aborted");
      } else {
        console.error("Error fetching:", err);
      }
    }
  };

  fetchPatients();

  return () => controller.abort();
}, []);



  if (!selectedPatient) return <div className="loading">Loading...</div>;
  const toggleSearch = () => setSearchActive((prev) => !prev);
  const allData = selectedPatient.diagnosis_history || [];
  const uniqueYears = [...new Set(allData.map((it) => it.year))].sort((a, b) => a - b);
  let filteredData = allData;
  if (filterYear === "Past6Months") filteredData = allData.slice(-6);
  else if (filterYear !== "All") filteredData = allData.filter((d) => `${d.year}` === `${filterYear}`);

  const latest = allData[allData.length - 1];

  const genderIcon =
    selectedPatient.gender?.toLowerCase().startsWith("m")
      ? "/assets/MaleIcon.svg"
      : "/assets/FemaleIcon.svg";

  const avgSystolic = filteredData.length
    ? Math.round(filteredData.reduce((acc, d) => acc + d.blood_pressure.systolic.value, 0) / filteredData.length)
    : 0;
  const avgDiastolic = filteredData.length
    ? Math.round(filteredData.reduce((acc, d) => acc + d.blood_pressure.diastolic.value, 0) / filteredData.length)
    : 0;

  return (
    <div className="dashboard">
      <nav className="navbar">
        <img src="./assets/TestLogo.svg" alt="TechCareLogo" id="i1" />
        <div className="nav-items">
          <div className="navtext">
            <img src="./assets/home_FILL0_wght300_GRAD0_opsz24.svg" alt="" />
            <p>Overview</p>
          </div>
          <div className="navtext">
            <img src="./assets/group_FILL0_wght300_GRAD0_opsz24.svg" alt="" />
            <p>Patients</p>
          </div>
          <div className="navtext">
            <img src="./assets/calendar_today_FILL0_wght300_GRAD0_opsz24.svg" alt="" />
            <p>Schedule</p>
          </div>
          <div className="navtext">
            <img src="./assets/chat_bubble_FILL0_wght300_GRAD0_opsz24.svg" alt="" />
            <p>Message</p>
          </div>
          <div className="navtext">
            <img src="./assets/credit_card_FILL0_wght300_GRAD0_opsz24.svg" alt="" />
            <p>Transactions</p>
          </div>
        </div>
        <div className="nav-items">
          <img
            src="./assets/doctor.png"
            alt="Profile"
            style={{ height: 40, width: 40, borderRadius: "50%" }}
          />
          <img src="./assets/settings_FILL0_wght300_GRAD0_opsz24.svg" alt="SettingsLogo" />
        </div>
      </nav>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2>Patients</h2>
          <img src="./assets/search_FILL0_wght300_GRAD0_opsz24.svg" alt="Search" style={{ width: "24px", height: "24px", cursor: "pointer" }} onClick={toggleSearch} />
          <input type="text" className={`search-input ${searchActive ? "active" : ""}`} placeholder="Search patient..." onBlur={() => setSearchActive(false)} />
        </div>
        <div className="patient-list">
          {patients.map((p) => (
            <div key={p.id || p.name} className={`patient-card ${selectedPatient.name === p.name ? "active" : ""}`} onClick={() => setSelectedPatient(p)}>
              <img src={p.profile_picture} alt={p.name} className="patient-thumb-large" />
              <div className="patient-meta">
                <div className="patient-name">{p.name}</div>
                <div className="patient-sub">
                  {p.gender}, {p.age}
                </div>
              </div>
              <img src="./assets/more_horiz_FILL0_wght300_GRAD0_opsz24.svg" alt="" />
            </div>
          ))}
        </div>
      </aside>

      {/* MIDDLE SECTION */}
      <section className="middle-section">
        <div id="middlescontainer1">
          <h2>Diagnosis History</h2>
          <div className="chart-classification-container">
            <div className="chart-classification-inner">
              {/* CHART LEFT */}
              <div className="chart-left">
                <div className="header-row">
                  <p>Blood Pressure Overview</p>
                  <select
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                    style={{
                      appearance: "none",
                      WebkitAppearance: "none",
                      MozAppearance: "none",
                      background: `url("/assets/ArrowDown.svg") no-repeat right 60px center`
                    }}
                  >
                    <option value="All">All Years</option>
                    <option value="Past6Months">Past 6 Months</option>
                    {uniqueYears.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <ResponsiveContainer width="100%" height={298}>
                  <LineChart data={filteredData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                    <XAxis dataKey="month" interval={Math.ceil(filteredData.length / 6)}  tickFormatter={(tick) => { const item = filteredData.find(d => d.month === tick);
                    return item ? `${tick} '${item.year.toString().slice(-2)}` : tick;}} tickLine={false}/>
                    <YAxis ticks={[60, 80, 100, 120, 140, 160, 180]} axisLine={{ stroke: "#afa4a4ff" }} tick={{ fill: "#666" }} tickLine={false} />
                    <Tooltip />
                    <CartesianGrid vertical={false} horizontal={true} />
                    <Line type="monotone" dataKey="blood_pressure.systolic.value" name="Systolic" stroke="#E66FD2" strokeWidth={3} dot={{ r: 6, strokeWidth: 0, fill: "#E66FD2" }} />
                    <Line type="monotone" dataKey="blood_pressure.diastolic.value" name="Diastolic" stroke="#8C6FE6" strokeWidth={3} dot={{ r: 6, strokeWidth: 0, fill: "#8C6FE6" }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* CLASSIFICATION RIGHT */}
              <div className="classification-right" >
                <div className="classification-card-vertical">
                  <div className="classification-circle" style={{ backgroundColor: "#E66FD2" }}></div>
                  <div className="classification-info">
                    <h5>Systolic</h5>
                    <h2>{avgSystolic}</h2>
                    <p>
                      {avgSystolic > 120 ? (
                        <>Higher than Average <img src="./assets/ArrowUp.svg" alt="up" className="arrow-icon" /></>
                      ) : avgSystolic < 90 ? (
                        <>Lower than Average<img src="./assets/ArrowDown.svg" alt="down" className="arrow-icon" /></>
                      ) : avgSystolic >= 90 && avgSystolic <= 120 ? (
                        <>Normal <img src="./assets/ArrowRight.svg" alt="normal" className="arrow-icon" /></>
                      ) : null}
                    </p>
                  </div>
                </div>
                <div className="horizontal-divider"></div> 
                <div className="classification-card-vertical">
                  <div className="classification-circle" style={{ backgroundColor: "#8C6FE6" }}></div>
                  <div className="classification-info">
                    <h5>Diastolic</h5>
                    <h2>{avgDiastolic}</h2>
                    <p>
                      {avgDiastolic > 80 ? (
                        <>Higher than Average<img src="/assets/ArrowUp.svg" alt="up" className="arrow-icon" /></>
                      ) : avgDiastolic < 60 ? (
                        <>Lower than Average<img src="/assets/ArrowDown.svg" alt="down" className="arrow-icon" /></>
                      ) : avgDiastolic >= 60 && avgDiastolic <= 80 ? (
                        <>Normal <img src="/assets/ArrowRight.svg" alt="normal" className="arrow-icon" /></>
                      ) : null}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rate-section">
            <div className="rate-cards">
              <div className="vital-card" id="heart">
                <img src="./assets/HeartBPM.svg" alt="Heart" />
                <div id="card">
                  <p className="type">Heart Rate</p>
                  <h3 className="value">{latest ? `${latest.heart_rate.value} bpm` : "--"}</h3>
                  <p className="level">{latest ? `${latest.heart_rate.levels} bpm` : "--"}</p>
                </div>
              </div>
              <div className="vital-card" id="resp">
                <img src="./assets/respiratory rate.svg" alt="Resp" />
                <div id="card">
                  <p className="type">Respiratory Rate</p>
                  <h3 className="value">{latest ? `${latest.respiratory_rate.value} bpm` : "--"}</h3>
                  <p className="level">{latest ? `${latest.respiratory_rate.levels} bpm` : "--"}</p>
                </div>
              </div>
              <div className="vital-card" id="temp">
                <img src="./assets/temperature.svg" alt="Temp" />
                <div id="card">
                  <p className="type">Temperature</p>
                  <h3 className="value">{latest ? `${latest.temperature.value} °F` : "--"}</h3>
                  <p className="level">{latest ? `${latest.temperature.levels} bpm` : "--"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* DIAGNOSTIC TABLE */}
        <div className="diagonisis-section">
          <h2 className="diagnostic-title">Diagnostic List</h2>
          <div className="diagnostic-table-container">
            <table className="diagnostic-table">
              <thead>
                <tr>
                  <th>Problem / Diagnosis</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedPatient.diagnostic_list?.length ? (
                  selectedPatient.diagnostic_list.map((d, idx) => (
                    <tr key={idx}>
                      <td>{d.name}</td>
                      <td>{d.description}</td>
                      <td>{d.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      No diagnostics
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* RIGHT SECTION */}
      <aside className="right-section">
        <div className="patient-details">
          <img src={selectedPatient.profile_picture} alt={selectedPatient.name} className="profile-img-large" />
          <div className="patient-info-top">
            <h2>{selectedPatient.name}</h2>

            <div className="info-row">
              <img src="/assets/BirthIcon.svg" alt="" className="inline-icon" />
              <div className="info-text">
                <strong>Date of Birth</strong>
                <div className="info-value">{selectedPatient.date_of_birth}</div>
              </div>
            </div>

            <div className="info-row">
              <img src={genderIcon} alt="" className="inline-icon" />
              <div className="info-text">
                <strong>Gender</strong>
                <div className="info-value">{selectedPatient.gender}</div>
              </div>
            </div>

            <div className="info-row">
              <img src="/assets/PhoneIcon.svg" alt="" className="inline-icon" />
              <div className="info-text">
                <strong>Contact Info</strong>
                <div className="info-value">{selectedPatient.phone_number}</div>
              </div>
            </div>
            <div className="info-row">
              <img src="/assets/PhoneIcon.svg" alt="" className="inline-icon" />
              <div className="info-text">
                <strong>Emergency Contacts</strong>
                <div className="info-value">{selectedPatient.emergency_contact}</div>
              </div>
            </div>
            <div className="info-row">
              <img src="/assets/InsuranceIcon.svg" alt="" className="inline-icon" />
              <div className="info-text">
                <strong>Insurance</strong>
                <div className="info-value">{selectedPatient.insurance_type}</div>
              </div>
            </div>
          </div>
          <button>Show All Information</button>
        </div>

        <div className="lab-section">
          <h3>Lab Results</h3>
          <ul>
            {selectedPatient.lab_results?.length ? (
              selectedPatient.lab_results.map((r, i) => (
                <li key={i}>
                  {r}
                  <button className="lab-download">
                    <img src="/assets/download_FILL0_wght300_GRAD0_opsz24.svg" alt="Download" />
                  </button>
                </li>
              ))
            ) : (
              <li>No labs</li>
            )}
          </ul>
          <button className="download-btn">Download All</button>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;