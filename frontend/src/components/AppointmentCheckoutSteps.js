import React from 'react';

const AppointmentCheckoutSteps = (props) => (
  <div className="row checkout-steps">
    <div className={props.step1 ? 'active' : ''}>Sign-In</div>
    <div className={props.step2 ? 'active' : ''}>Personal Information</div>
    {/* <div className={props.step3 ? 'active' : ''}>Payment</div> */}
    <div className={props.step4 ? 'active' : ''}>Book Appointment</div>
  </div>
);
export default AppointmentCheckoutSteps;
