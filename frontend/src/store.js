import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import {
  productListReducer,
  productDetailsReducer,
  productUpdateReducer,
  productDeleteReducer,
  productReviewSaveReducer,
  productCategoryListReducer,
  productCreateReducer,
} from './reducers/productReducers';

import {
  lostpetListReducer,
  lostpetDetailsReducer,
  lostpetUpdateReducer,
  lostpetDeleteReducer,
  lostpetReviewSaveReducer,
  lostpetCategoryListReducer,
  lostpetCreateReducer,
} from './reducers/lostpetReducers';

import { cartReducer } from './reducers/cartReducers';
import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDetailsReducer,
  userUpdateReducer,
  userDeleteReducer,
  userTopSellersReducer,
  userAddressMapReducer,
} from './reducers/userReducers';
import {
  orderCreateReducer,
  orderDetailsReducer,
  // orderPayReducer,
  orderMineListReducer,
  orderListReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderSummaryReducer,
} from './reducers/orderReducers';
import { bookingReducer } from './reducers/bookingReducers';
import { docprofileCreateReducer, docprofileDeleteReducer, docprofileDetailsReducer, docprofileListReducer,
   docprofileReviewSaveReducer, docprofileUpdateReducer } from './reducers/docprofileReducers';
import { appointmentDeliverReducer, appointmentCreateReducer, appointmentDeleteReducer,
   appointmentDetailsReducer, appointmentListReducer, appointmentMineListReducer,
    appointmentSummaryReducer } from './reducers/appointmentReducers';


const shippingAddress = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

  const address = localStorage.getItem('address')
  ? JSON.parse(localStorage.getItem('address'))
  : {};

const cartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

  const bookingItems = localStorage.getItem('booking')
  ? JSON.parse(localStorage.getItem('bookingItems'))
  : [];

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  cart: { cartItems, shippingAddress, paymentMethod: 'Cash on Delivery' },
  booking: { bookingItems, address, paymentMethod: 'Cash on Delivery' },
  userSignin: { userInfo },
};

const finalState = {
  userSignin: { userInfo },
};
const reducer = combineReducers({
  
  cart: cartReducer,
  
  userAddressMap: userAddressMapReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  userSignin: userSigninReducer,
  userTopSellers: userTopSellersReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userRegister: userRegisterReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productReviewSave: productReviewSaveReducer,
  productCreate: productCreateReducer,
  orderCreate: orderCreateReducer,
  productCategoryList: productCategoryListReducer,
  orderDetails: orderDetailsReducer,
  // orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderMineList: orderMineListReducer,
  orderList: orderListReducer,
  orderSummary: orderSummaryReducer,
  orderDelete: orderDeleteReducer,
  appointmentDetails: appointmentDetailsReducer,
  appointmentDeliver: appointmentDeliverReducer,
  appointmentMineList: appointmentMineListReducer,
  appointmentList: appointmentListReducer,
  appointmentSummary: appointmentSummaryReducer,
  appointmentDelete: appointmentDeleteReducer,
  booking: bookingReducer,
  docprofileList: docprofileListReducer,
  docprofileDetails: docprofileDetailsReducer,
  docprofileUpdate: docprofileUpdateReducer,
  docprofileDelete: docprofileDeleteReducer,
  docprofileReviewSave: docprofileReviewSaveReducer,
  docprofileCreate: docprofileCreateReducer,
  appointmentCreate: appointmentCreateReducer,
  //petlost
  lostpetList: lostpetListReducer,
  lostpetDetails: lostpetDetailsReducer,
  lostpetUpdate: lostpetUpdateReducer,
  lostpetDelete: lostpetDeleteReducer,
  lostpetReviewSave: lostpetReviewSaveReducer,
  lostpetCreate: lostpetCreateReducer,
  lostpetCategoryList: lostpetCategoryListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
