import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { detailsAppointment,  deliverAppointment } from '../actions/appointmentActions'
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import {
  APPOINTMENT_DELIVER_RESET,
} from '../constants/appointmentConstants'

function AppointmentScreen(props) {
  const appointmentId = props.match.params.id;

  const appointmentDeliver = useSelector((state) => state.appointmentDeliver);
  const { success: successDeliver } = appointmentDeliver;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const appointmentDetails = useSelector((state) => state.appointmentDetails);
  const { loading, appointment, error } = appointmentDetails;


  const dispatch = useDispatch();
  useEffect(() => {
 
    if (
      appointment &&
      (!appointment._id || appointment._id !== appointmentId || successDeliver)
    ) {
      // dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: APPOINTMENT_DELIVER_RESET });
      dispatch(detailsAppointment(appointmentId));
    }
   
    return () => {};
  }, [appointment,  successDeliver, dispatch, appointmentId]);

  
  const handleDeliver = () => {
    dispatch(deliverAppointment(appointment));
  };
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <>
      <h1> Appointment {appointment._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li className="card card-body">
              <h2>Shipping</h2>
              <p>
                <strong>Full Name:</strong> {appointment.sAddress.fullName}{' '}
                <a href={`mailto:${appointment.user.email}`}>{appointment.user.email}</a>
                <br />
                <strong>Address:</strong> {appointment.sAddress.address},{' '}
                {appointment.sAddress.city},{appointment.sAddress.postalCode},{' '}
                {appointment.sAddress.country},
              </p>
              {appointment.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {appointment.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </li>
           
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul variant="flush">
              <li>
                <h2>Appointment Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>{appointment.itemsPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>{appointment.shippingPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>{appointment.taxPrice}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Appointment Total</strong>
                  </div>
                  <div>
                    <strong>{appointment.totalPrice}</strong>
                  </div>
                </div>
              </li>
          
              {userInfo.isDoctor  && !appointment.isDelivered && (
                <li>
                  <button
                    onClick={handleDeliver}
                    type="button"
                    className="block"
                  >
                    Deliver Appointment
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentScreen;
