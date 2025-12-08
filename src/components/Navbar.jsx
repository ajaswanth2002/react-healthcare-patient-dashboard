import "../styles/Dashboard.css";
function Navbar() {
  return (
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
  );
}
export default Navbar;