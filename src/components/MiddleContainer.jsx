import {useState } from "react";
import "./Dashboard.css"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from "recharts";
function MiddleContainer({ selectedPatient }) {
   const [filterYear, setFilterYear] = useState("All");

  if (!selectedPatient) return <div className="loading">Loading...</div>;

  const allData = selectedPatient?.diagnosis_history || [];
  const uniqueYears = [...new Set(allData.map((it) => it.year))].sort((a, b) => a - b);

  let filteredData = allData;
  if (filterYear === "Past6Months") filteredData = allData.slice(-6);
  else if (filterYear !== "All") filteredData = allData.filter((d) => `${d.year}` === `${filterYear}`);

  const avgSystolic = filteredData.length
    ? Math.round(filteredData.reduce((acc, d) => acc + d.blood_pressure.systolic.value, 0) / filteredData.length)
    : 0;

  const avgDiastolic = filteredData.length
    ? Math.round(filteredData.reduce((acc, d) => acc + d.blood_pressure.diastolic.value, 0) / filteredData.length)
    : 0;

  const latest = allData[allData.length - 1];


  return (
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
  );
}
export default MiddleContainer;