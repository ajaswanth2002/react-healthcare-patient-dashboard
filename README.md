# 🏥 React Healthcare Patient Dashboard

A fully interactive **Patient Monitoring Dashboard** built with **React**, featuring real-time health analytics, charts, diagnostic reports, lab results, and searching/filtering of patients.  
The UI is responsive, clean, and well-structured with reusable components.

---

## 🚀 Features

### 🧑‍⚕️ Patient Dashboard
- Fetches real patient data with secure API authentication.
- View and switch between patients.
- Patient details: demographics, insurance, emergency contacts.

### 📊 Health Analytics (Recharts)
- Line chart visualization of **Systolic & Diastolic Blood Pressure**
- Filter by **Year** or **Last 6 Months**
- Summary of **Heart Rate**, **Respiratory Rate**, and **Temperature** status

### 📝 Diagnostics & Lab Results
- Dynamic diagnostic table with status details
- Lab reports with download button

### 🖥️ UI / UX Features
- Fully responsive layout (Sidebar + Middle Content + Right Panel)
- Modern component-based code structure
- Reusable components & clean CSS design

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React | UI framework |
| JavaScript (ES6+) | Logic & component handling |
| Axios | API calls |
| Recharts | Data visualization charts |
| CSS / Flexbox / Grid | Styling |
| Git & GitHub | Version control |

---

## 📂 Folder Structure

.
├── App.css
├── App.jsx
├── App.test.js
├── components
│   ├── Dashboard.css
│   ├── DiagonalTable.jsx
│   ├── LabResults.jsx
│   ├── MiddleContainer.jsx
│   ├── Navbar.jsx
│   ├── PatientCard.jsx
│   └── Sidebar.jsx
├── Dashboard.css
├── Dashboard.jsx
├── index.css
├── index.js
├── logo.svg
├── reportWebVitals.js
└── setupTests.js

---

## ▶️ Run Locally

```sh
npm install
npm start

📌 Future Enhancements
	•	Dark / light theme mode
	•	Add login authentication (JWT)
	•	Pagination & sorting for patients list
	•	Graph comparison between patients

⸻

🤝 Contributing

Pull requests are welcome.
For major changes, please open an issue to discuss improvements.
