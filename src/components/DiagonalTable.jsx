import "./Dashboard.css"
function MiddleContainer({ selectedPatient }) {
  return (
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

  );
}

export default MiddleContainer;