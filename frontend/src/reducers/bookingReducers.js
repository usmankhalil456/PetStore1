/* eslint-disable import/prefer-default-export */
import {
  BOOKING_ADD_ITEM,
  BOOKING_REMOVE_ITEM,
  BOOKING_SAVE_SHIPPING_ADDRESSA,
  BOOKING_SAVE_PAYMENT_METHOD,
  BOOKING_EMPTY,
  BOOKING_ADD_ITEM_FAIL,
} from '../constants/bookingConstants'

export const bookingReducer = (
  state = { bookingItems: [], sAddress: {}, paymentMethod: 'paypal' },
  action
) => {
  switch (action.type) {
    case BOOKING_ADD_ITEM_FAIL:
      return { ...state, error: action.payload };
    case BOOKING_ADD_ITEM: {
      const item = action.payload;
      const docprofile = state.bookingItems.find((x) => x.docprofile === item.docprofile);
      if (docprofile) {
        return {
          ...state,
          error: '',
          bookingItems: state.bookingItems.map((x) =>
            x.docprofile === docprofile.docprofile ? item : x
          ),
        };
      }
      return {
        ...state,
        error: '',
        bookingItems: [...state.bookingItems, item],
      };
    }
    case BOOKING_REMOVE_ITEM:
      return {
        ...state,
        error: '',
        bookingItems: state.bookingItems.filter((x) => x.docprofile !== action.payload),
      };
    case BOOKING_EMPTY:
      return {
        ...state,
        error: '',
        bookingItems: [],
      };
    case BOOKING_SAVE_SHIPPING_ADDRESSA:
      return { ...state, sAddress: action.payload };
    case BOOKING_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};
