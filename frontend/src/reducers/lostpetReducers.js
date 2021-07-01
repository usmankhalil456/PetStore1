import {
  LOSTPET_LIST_REQUEST,
  LOSTPET_LIST_SUCCESS,
  LOSTPET_LIST_FAIL,
  LOSTPET_DETAILS_REQUEST,
  LOSTPET_DETAILS_SUCCESS,
  LOSTPET_DETAILS_FAIL,
  LOSTPET_DETAILS_RESET,
  LOSTPET_UPDATE_REQUEST,
  LOSTPET_UPDATE_SUCCESS,
  LOSTPET_UPDATE_FAIL,
  LOSTPET_UPDATE_RESET,
  LOSTPET_DELETE_REQUEST,
  LOSTPET_DELETE_SUCCESS,
  LOSTPET_DELETE_FAIL,
  LOSTPET_REVIEW_SAVE_SUCCESS,
  LOSTPET_REVIEW_SAVE_REQUEST,
  LOSTPET_REVIEW_SAVE_FAIL,
  LOSTPET_REVIEW_SAVE_RESET,
  LOSTPET_CREATE_REQUEST,
  LOSTPET_CREATE_SUCCESS,
  LOSTPET_CREATE_FAIL,
  LOSTPET_CREATE_RESET,
  LOSTPET_CATEGORY_LIST_REQUEST,
  LOSTPET_CATEGORY_LIST_SUCCESS,
  LOSTPET_CATEGORY_LIST_FAIL,
} from '../constants/lostpetConstants'

export const lostpetListReducer = (state = { lostpets: [] }, action) => {
  switch (action.type) {
    case LOSTPET_LIST_REQUEST:
      return { loading: true, lostpets: [] };
    case LOSTPET_LIST_SUCCESS:
      return { loading: false, lostpets: action.payload };
    case LOSTPET_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const lostpetCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LOSTPET_CREATE_REQUEST:
      return { loading: true };
    case LOSTPET_CREATE_SUCCESS:
      return { loading: false, lostpet: action.payload, success: true };
    case LOSTPET_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case LOSTPET_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const lostpetDetailsReducer = (
  state = { loading: true, lostpet: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case LOSTPET_DETAILS_REQUEST:
      return { ...state, loading: true };
    case LOSTPET_DETAILS_SUCCESS:
      return { loading: false, lostpet: action.payload };
    case LOSTPET_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOSTPET_DETAILS_RESET:
      return { lostpet: { reviews: [] } };
    default:
      return state;
  }
};

export const lostpetDeleteReducer = (state = { lostpet: {} }, action) => {
  switch (action.type) {
    case LOSTPET_DELETE_REQUEST:
      return { loading: true };
    case LOSTPET_DELETE_SUCCESS:
      return { loading: false, lostpet: action.payload, success: true };
    case LOSTPET_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const lostpetUpdateReducer = (state = { lostpet: {} }, action) => {
  switch (action.type) {
    case LOSTPET_UPDATE_REQUEST:
      return { loading: true };
    case LOSTPET_UPDATE_SUCCESS:
      return { loading: false, success: true, lostpet: action.payload };
    case LOSTPET_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case LOSTPET_UPDATE_RESET:
      return { lostpet: {} };
    default:
      return state;
  }
};


export const lostpetCategoryListReducer = (
  state = { categories: [] },
  action
) => {
  switch (action.type) {
    case LOSTPET_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case LOSTPET_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case LOSTPET_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const lostpetReviewSaveReducer = (state = {}, action) => {
  switch (action.type) {
    case LOSTPET_REVIEW_SAVE_REQUEST:
      return { loading: true };
    case LOSTPET_REVIEW_SAVE_SUCCESS:
      return { loading: false, review: action.payload, success: true };
    case LOSTPET_REVIEW_SAVE_FAIL:
      return { loading: false, errror: action.payload };
    case LOSTPET_REVIEW_SAVE_RESET:
      return {};
    default:
      return state;
  }
};
