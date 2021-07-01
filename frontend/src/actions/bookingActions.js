import axios from 'axios';
import {
  BOOKING_ADD_ITEM,
  BOOKING_REMOVE_ITEM,
  BOOKING_SAVE_SHIPPING_ADDRESS,
  // BOOKING_SAVE_PAYMENT_METHOD,
  BOOKING_ADD_ITEM_FAIL,
  BOOKING_SAVE_SHIPPING_ADDRESSA,
} from '../constants/bookingConstants'

export const addToBooking = (docprofileId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/docprofiles/${docprofileId}`);
  const {
    booking: { bookingItems },
  } = getState();
  if ( data.doctor._id !== bookingItems[0].doctor) {
    dispatch({
      type: BOOKING_ADD_ITEM_FAIL,
      payload: "Can't Add To BOOKING. Buy from one doctor at a time",
    });
  } else {
    dispatch({
      type: BOOKING_ADD_ITEM,
      payload: {
        docprofile: data._id,
        doctor: data.doctor._id,
        name: data.name,
        image: data.image,
        price: data.price,     
      },
    });
    localStorage.setItem(
      'bookingItems',
      JSON.stringify(getState().booking.bookingItems)
    );
  }
};
export const removeFromBooking = (docprofileId) => (dispatch, getState) => {
  dispatch({ type: BOOKING_REMOVE_ITEM, payload: docprofileId });

  const {
    booking: { bookingItems },
  } = getState();
  localStorage.setItem('bookingItems', JSON.stringify(bookingItems));
};
export const saveShippingAddressA = (data) => (dispatch) => {
  dispatch({ type: BOOKING_SAVE_SHIPPING_ADDRESSA, payload: data });
  localStorage.setItem('sAddress', JSON.stringify(data));
};
