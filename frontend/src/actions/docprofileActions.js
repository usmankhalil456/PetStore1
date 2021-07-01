import axios from 'axios';
import {
  DOCPROFILE_LIST_REQUEST,
  DOCPROFILE_LIST_SUCCESS,
  DOCPROFILE_LIST_FAIL,
  DOCPROFILE_DETAILS_REQUEST,
  DOCPROFILE_DETAILS_SUCCESS,
  DOCPROFILE_DETAILS_FAIL,
  DOCPROFILE_UPDATE_REQUEST,
  DOCPROFILE_UPDATE_SUCCESS,
  DOCPROFILE_UPDATE_FAIL,
  DOCPROFILE_DELETE_SUCCESS,
  DOCPROFILE_DELETE_FAIL,
  DOCPROFILE_DELETE_REQUEST,
  DOCPROFILE_REVIEW_SAVE_REQUEST,
  DOCPROFILE_REVIEW_SAVE_FAIL,
  DOCPROFILE_REVIEW_SAVE_SUCCESS,
  DOCPROFILE_CREATE_REQUEST,
  DOCPROFILE_CREATE_SUCCESS,
  DOCPROFILE_CREATE_FAIL,
  DOCPROFILE_CATEGORY_LIST_REQUEST,
  DOCPROFILE_CATEGORY_LIST_SUCCESS,
  DOCPROFILE_CATEGORY_LIST_FAIL,
} from '../constants/docprofileConstants';

export const listDocprofiles = ({
  category = '',
  name = '',
  appointment = '',
  doctor = '',
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
  try {
    dispatch({ type: DOCPROFILE_LIST_REQUEST });
    const { data } = await axios.get(
    `/api/docprofiles?category=${category}&doctor=${doctor}&name=${name}&appointment=${appointment}&min=${min}&max=${max}&rating=${rating}`
    );
    dispatch({ type: DOCPROFILE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DOCPROFILE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDocprofile = (docprofile) => async (dispatch, getState) => {
  try {
    dispatch({ type: DOCPROFILE_UPDATE_REQUEST, payload: docprofile });

    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();

    const { data } = await axios.put(`/api/docprofiles/${docprofile._id}`, docprofile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: DOCPROFILE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DOCPROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsDocprofile = (docprofileId) => async (dispatch) => {
  try {
    dispatch({ type: DOCPROFILE_DETAILS_REQUEST, payload: docprofileId });
    const { data } = await axios.get(`/api/docprofiles/${docprofileId}`);
    dispatch({ type: DOCPROFILE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DOCPROFILE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteDocprofile = (docprofileId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: DOCPROFILE_DELETE_REQUEST, payload: docprofileId });
    const { data } = await axios.delete(`/api/docprofiles/${docprofileId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: DOCPROFILE_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({
      type: DOCPROFILE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createDocprofile = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: DOCPROFILE_CREATE_REQUEST });
    const { data } = await axios.post(
      '/api/docprofiles',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({
      type: DOCPROFILE_CREATE_SUCCESS,
      payload: data.docprofile,
      success: true,
    });
  } catch (error) {
    dispatch({
      type: DOCPROFILE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listDocprofileCategories = () => async (dispatch) => {
  dispatch({ type: DOCPROFILE_CATEGORY_LIST_REQUEST, loading: true });
  try {
    const result = await axios.get('/api/docprofiles/categories');
    dispatch({ type: DOCPROFILE_CATEGORY_LIST_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DOCPROFILE_CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateDocprofileReview = (docprofileId, review) => async (
  dispatch,
  getState
) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: DOCPROFILE_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(
      `/api/docprofiles/${docprofileId}/reviews`,
      review,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: DOCPROFILE_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({
      type: DOCPROFILE_REVIEW_SAVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
