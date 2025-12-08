import React, { useState } from "react";
import "../styles/Dashboard.css"
function Sidebar({ patients, selectedPatient, setSelectedPatient }) {
  const [searchActive, setSearchActive] = useState(false);
  const toggleSearch = () => setSearchActive((prev) => !prev);

  return (
    <aside className="sidebar">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2>Patients</h2>
        <img
          src="./assets/search_FILL0_wght300_GRAD0_opsz24.svg"
          alt="Search"
          style={{ width: "24px", height: "24px", cursor: "pointer" }}
          onClick={toggleSearch}
        />
        <input
          type="text"
          className={`search-input ${searchActive ? "active" : ""}`}
          placeholder="Search patient..."
          onBlur={() => setSearchActive(false)}
        />
      </div>

      <div className="patient-list">
        {patients.map((p) => (
          <div
            key={p.id || p.name}
            className={`patient-card ${selectedPatient.name === p.name ? "active" : ""}`}
            onClick={() => setSelectedPatient(p)}
          >
            <img src={p.profile_picture} alt={p.name} className="patient-thumb-large" />
            <div className="patient-meta">
              <div className="patient-name">{p.name}</div>
              <div className="patient-sub">{p.gender}, {p.age}</div>
            </div>
            <img src="./assets/more_horiz_FILL0_wght300_GRAD0_opsz24.svg" alt="" />
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;