import "../styles/Dashboard.css";
function LabResults({ selectedPatient }) {
  return (
    <div className="lab-section">
      <h3>Lab Results</h3>
      <ul>
        {selectedPatient?.lab_results?.length ? (
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
  );
}

export default LabResults;