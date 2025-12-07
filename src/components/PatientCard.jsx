import "./Dashboard.css"
function PateintCard({selectedPatient}){
  const genderIcon =
    selectedPatient.gender?.toLowerCase().startsWith("m")
      ? "/assets/MaleIcon.svg"
      : "/assets/FemaleIcon.svg";
  
    return (
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
    );
}
export default PateintCard;