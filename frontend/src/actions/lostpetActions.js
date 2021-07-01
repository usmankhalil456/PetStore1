import axios from 'axios';
import {
  LOSTPET_LIST_REQUEST,
  LOSTPET_LIST_SUCCESS,
  LOSTPET_LIST_FAIL,
  LOSTPET_DETAILS_REQUEST,
  LOSTPET_DETAILS_SUCCESS,
  LOSTPET_DETAILS_FAIL,
  LOSTPET_UPDATE_REQUEST,
  LOSTPET_UPDATE_SUCCESS,
  LOSTPET_UPDATE_FAIL,
  LOSTPET_DELETE_SUCCESS,
  LOSTPET_DELETE_FAIL,
  LOSTPET_DELETE_REQUEST,
  LOSTPET_REVIEW_SAVE_REQUEST,
  LOSTPET_REVIEW_SAVE_FAIL,
  LOSTPET_REVIEW_SAVE_SUCCESS,
  LOSTPET_CREATE_REQUEST,
  LOSTPET_CREATE_SUCCESS,
  LOSTPET_CREATE_FAIL,
  LOSTPET_CATEGORY_LIST_REQUEST,
  LOSTPET_CATEGORY_LIST_SUCCESS,
  LOSTPET_CATEGORY_LIST_FAIL,
} from '../constants/lostpetConstants'

export const listLostpets = ({
  category = '',
  name = '',
  // order = '',
  seller = '',
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  try {
    dispatch({ type: LOSTPET_LIST_REQUEST });
    const { data } = await axios.get(
      `/api/lostpets?category=${category}&seller=${seller}&name=${name}&min=${min}&max=${max}&rating=${rating}`
    );
    dispatch({ type: LOSTPET_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOSTPET_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateLostpet = (lostpet) => async (dispatch, getState) => {
  try {
    dispatch({ type: LOSTPET_UPDATE_REQUEST, payload: lostpet });

    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();

    const { data } = await axios.put(`/api/lostpets/${lostpet._id}`, lostpet, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: LOSTPET_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOSTPET_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsLostpet = (LOSTPETId) => async (dispatch) => {
  try {
    dispatch({ type: LOSTPET_DETAILS_REQUEST, payload: LOSTPETId });
    const { data } = await axios.get(`/api/LOSTPETs/${LOSTPETId}`);
    dispatch({ type: LOSTPET_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOSTPET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteLostpet = (LOSTPETId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: LOSTPET_DELETE_REQUEST, payload: LOSTPETId });
    const { data } = await axios.delete(`/api/LOSTPETs/${LOSTPETId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type:LOSTPET_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type:LOSTPET_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createLostpet = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: LOSTPET_CREATE_REQUEST });
    const { data } = await axios.post(
      '/api/lostpets',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: LOSTPET_CREATE_SUCCESS,
      payload: data.lostpet,
      success: true,
    });
  } catch (error) {
    dispatch({
      type:LOSTPET_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listLostpetCategories = () => async (dispatch) => {
  dispatch({ type: LOSTPET_CATEGORY_LIST_REQUEST, loading: true });
  try {
    const result = await axios.get('/api/lostpets/categories');
    dispatch({ type: LOSTPET_CATEGORY_LIST_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: LOSTPET_CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateLostpetReview = (lostpetId, review) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: LOSTPET_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(
      `/api/lostpets/${lostpetId}/reviews`,
      review,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: LOSTPET_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({
      type: LOSTPET_REVIEW_SAVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
