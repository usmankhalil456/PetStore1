import {
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_DETAILS_REQUEST,
  APPOINTMENT_DETAILS_SUCCESS,
  APPOINTMENT_DETAILS_FAIL,
  // APPOINTMENT_PAY_REQUEST,
  // APPOINTMENT_PAY_SUCCESS,
  // APPOINTMENT_PAY_FAIL,
  APPOINTMENT_MINE_LIST_REQUEST,
  APPOINTMENT_MINE_LIST_SUCCESS,
  APPOINTMENT_MINE_LIST_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DELETE_FAIL,
  APPOINTMENT_CREATE_RESET,
  APPOINTMENT_PAY_RESET,
  APPOINTMENT_DELIVER_REQUEST,
  APPOINTMENT_DELIVER_SUCCESS,
  APPOINTMENT_DELIVER_FAIL,
  APPOINTMENT_DELIVER_RESET,
  APPOINTMENT_SUMMARY_REQUEST,
  APPOINTMENT_SUMMARY_SUCCESS,
  APPOINTMENT_SUMMARY_FAIL,
} from '../constants/appointmentConstants'

export const appointmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_CREATE_RESET:
      return {};
    case APPOINTMENT_CREATE_REQUEST:
      return { loading: true };
    case APPOINTMENT_CREATE_SUCCESS:
      return { loading: false, appointment: action.payload, success: true };
    case APPOINTMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export function appointmentDetailsReducer(
  state = {
    loading: true,
    appointment: {
      appointmentItems: [],
      sAddress: {},
    },
  },
  action
) {
  switch (action.type) {
    case APPOINTMENT_DETAILS_REQUEST:
      return { loading: true };
    case APPOINTMENT_DETAILS_SUCCESS:
      return { loading: false, appointment: action.payload };
    case APPOINTMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const appointmentMineListReducer = (
  state = {
    appointments: [],
  },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_MINE_LIST_REQUEST:
      return { loading: true };
    case APPOINTMENT_MINE_LIST_SUCCESS:
      return { loading: false, appointments: action.payload };
    case APPOINTMENT_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentSummaryReducer = (
  state = { loading: true, summary: {} },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_SUMMARY_REQUEST:
      return { loading: true };
    case APPOINTMENT_SUMMARY_SUCCESS:
      return { loading: false, summary: action.payload };
    case APPOINTMENT_SUMMARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentListReducer = (
  state = { loading: true, appointments: [] },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_LIST_REQUEST:
      return { loading: true };
    case APPOINTMENT_LIST_SUCCESS:
      return { loading: false, appointments: action.payload };
    case APPOINTMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const appointmentDeliverReducer = (
  state = {
    appointment: {
      appointmentItems: [],
      sAddress: {},
    },
  },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_DELIVER_REQUEST:
      return { loading: true };
    case APPOINTMENT_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case APPOINTMENT_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_DELIVER_RESET:
      return {
        appointment: {
          appointmentItems: [],
          sAddress: {},
        },
      };
    default:
      return state;
  }
};

export const appointmentDeleteReducer = (
  state = {
    appointment: {
      appointmentItems: [],
      sAddress: {},
      // paymentMethod: {},
    },
  },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_DELETE_REQUEST:
      return { loading: true };
    case APPOINTMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case APPOINTMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
