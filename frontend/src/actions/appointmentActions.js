import axios from 'axios';
import {
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
 
  APPOINTMENT_MINE_LIST_REQUEST,
  APPOINTMENT_MINE_LIST_SUCCESS,
  APPOINTMENT_MINE_LIST_FAIL,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DELETE_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_DELIVER_FAIL,
  APPOINTMENT_DELIVER_SUCCESS,
  APPOINTMENT_DELIVER_REQUEST,
  APPOINTMENT_SUMMARY_REQUEST,
  APPOINTMENT_SUMMARY_SUCCESS,
} from '../constants/appointmentConstants'
import { BOOKING_EMPTY } from '../constants/bookingConstants'

export const createAppointment = (appointment) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPOINTMENT_CREATE_REQUEST, payload: appointment });
    const {
      userSignin: { userInfo },
    } = getState();
    const {
      data: { data: newAppointment },
    } = await axios.post('/api/appointments', appointment, {
      headers: {
        Authorization: ` Bearer ${userInfo.token}`,
      },
    });
    localStorage.removeItem('bookingItems');
    dispatch({ type: BOOKING_EMPTY });
    dispatch({ type: APPOINTMENT_CREATE_SUCCESS, payload: newAppointment });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAppointmentMine = () => async (dispatch, getState) => {
  try {
    dispatch({ type: APPOINTMENT_MINE_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get('/api/appointments/mine', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: APPOINTMENT_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_MINE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const summaryAppointment = () => async (dispatch, getState) => {
  try {
    dispatch({ type: APPOINTMENT_SUMMARY_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get('/api/apointments/summary', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: APPOINTMENT_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listAppointments = ({ doctor = '' }) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPOINTMENT_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(`/api/appointments?doctor=${doctor}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: APPOINTMENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsAppointment = (appointmentId) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPOINTMENT_DETAILS_REQUEST, payload: appointmentId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get(`/api/appointments/${appointmentId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: APPOINTMENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const deliverAppointment = (appointment) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPOINTMENT_DELIVER_REQUEST, payload: {} });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.put(
      `/api/appointments/${appointment._id}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: APPOINTMENT_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteAppointment = (appointmentId) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPOINTMENT_DELETE_REQUEST, payload: appointmentId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.delete(`/api/appointments/${appointmentId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: APPOINTMENT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
