import {
  DOCPROFILE_LIST_REQUEST,
  DOCPROFILE_LIST_SUCCESS,
  DOCPROFILE_LIST_FAIL,
  DOCPROFILE_DETAILS_REQUEST,
  DOCPROFILE_DETAILS_SUCCESS,
  DOCPROFILE_DETAILS_FAIL,
  DOCPROFILE_DETAILS_RESET,
  DOCPROFILE_UPDATE_REQUEST,
  DOCPROFILE_UPDATE_SUCCESS,
  DOCPROFILE_UPDATE_FAIL,
  DOCPROFILE_UPDATE_RESET,
  DOCPROFILE_DELETE_REQUEST,
  DOCPROFILE_DELETE_SUCCESS,
  DOCPROFILE_DELETE_FAIL,
  DOCPROFILE_REVIEW_SAVE_SUCCESS,
  DOCPROFILE_REVIEW_SAVE_REQUEST,
  DOCPROFILE_REVIEW_SAVE_FAIL,
  DOCPROFILE_REVIEW_SAVE_RESET,
  DOCPROFILE_CREATE_REQUEST,
  DOCPROFILE_CREATE_SUCCESS,
  DOCPROFILE_CREATE_FAIL,
  DOCPROFILE_CREATE_RESET,
  DOCPROFILE_CATEGORY_LIST_REQUEST,
  DOCPROFILE_CATEGORY_LIST_SUCCESS,
  DOCPROFILE_CATEGORY_LIST_FAIL,
} from '../constants/docprofileConstants';

export const docprofileListReducer = (state = { docprofiles: [] }, action) => {
  switch (action.type) {
    case DOCPROFILE_LIST_REQUEST:
      return { loading: true, docprofiles: [] };
    case DOCPROFILE_LIST_SUCCESS:
      return { loading: false, docprofiles: action.payload };
    case DOCPROFILE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const docprofileCreateReducer = (state = {docprofile: null}, action) => {
  switch (action.type) {
    case DOCPROFILE_CREATE_REQUEST:
      return { loading: true };
    case DOCPROFILE_CREATE_SUCCESS:
      return { loading: false, docprofile: action.payload, success: true };
    case DOCPROFILE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DOCPROFILE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const docprofileDetailsReducer = (
  state = { loading: true, docprofile: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case DOCPROFILE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case DOCPROFILE_DETAILS_SUCCESS:
      return { loading: false, docprofile: action.payload };
    case DOCPROFILE_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DOCPROFILE_DETAILS_RESET:
      return { docprofile: { reviews: [] } };
    default:
      return state;
  }
};

export const docprofileDeleteReducer = (state = { docprofile: {} }, action) => {
  switch (action.type) {
    case DOCPROFILE_DELETE_REQUEST:
      return { loading: true };
    case DOCPROFILE_DELETE_SUCCESS:
      return { loading: false, docprofile: action.payload, success: true };
    case DOCPROFILE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const docprofileUpdateReducer = (state = { docprofile: {} }, action) => {
  switch (action.type) {
    case DOCPROFILE_UPDATE_REQUEST:
      return { loading: true };
    case DOCPROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true, docprofile: action.payload };
    case DOCPROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DOCPROFILE_UPDATE_RESET:
      return { docprofile: {} };
    default:
      return state;
  }
};

export const docprofileCategoryListReducer = (
  state = { categories: [] },
  action
) => {
  switch (action.type) {
    case DOCPROFILE_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case DOCPROFILE_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case DOCPROFILE_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const docprofileReviewSaveReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCPROFILE_REVIEW_SAVE_REQUEST:
      return { loading: true };
    case DOCPROFILE_REVIEW_SAVE_SUCCESS:
      return { loading: false, review: action.payload, success: true };
    case DOCPROFILE_REVIEW_SAVE_FAIL:
      return { loading: false, errror: action.payload };
    case DOCPROFILE_REVIEW_SAVE_RESET:
      return {};
    default:
      return state;
  }
};
