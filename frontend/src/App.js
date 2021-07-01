import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from './components/SearchBox';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import DoctorScreen from './screens/DoctorScreen';

import DocprofileScreen from './screens/DocprofileScreen';

import LostpetScreen from './screens/LostpetScreen';

import CartScreen from './screens/CartScreen';
import BookingScreen from './screens/BookingScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';

import SearchScreen from './screens/SearchScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import AppointmentScreen from './screens/AppointmentScreen';

import ProfileScreen from './screens/ProfileScreen';
import ProductListScreen from './screens/ProductListScreen';
import LostpetListScreen from './screens/LostpetListScreen';

import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import DocprofileEditScreen from './screens/DocprofileEditScreen';
import LostpetEditScreen from './screens/LostpetEditScreen';

import SellerScreen from './screens/SellerScreen';
import { signout } from './actions/userActions';
import { listProductCategories } from './actions/productActions';
import { listDocprofileCategories } from './actions/docprofileActions';
import { listLostpetCategories } from './actions/lostpetActions';

import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import AppointmentHistoryScreen from './screens/AppointmentHistoryScreen';

import PrivateRoute from './components/PrivateRoute';
import SellerRoute from './components/SellerRoute';
import DoctorRoute from './components/DoctorRoute';
import AdminRoute from './components/AdminRoute';
import DashboardScreen from './screens/DashboardScreen';
import ChatBox from './components/ChatBox';
import SupportScreen from './screens/SupportScreen';

import DocprofileListScreen from './screens/DocprofileListScreen';
import AppointmentListScreen from './screens/AppointmentListScreen';
import PlaceAppointmentScreen from './screens/PlaceAppointmentScreen';
import AddressScreen from './screens/AddressScreen';
// import ForumScreen from './screens/ForumScreen';



function App() {
  const dispatch = useDispatch();

  //const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const docprofileCategoryList = useSelector((state) => state.docprofileCategoryList);
  const { categories, loading, error } = productCategoryList;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //appointment
  const booking = useSelector((state) => state.booking);
  const { bookingItems } = booking;

  const handleSignout = () => {
    dispatch(signout());
  };
  useEffect(() => {
    dispatch(listProductCategories());
    return () => {
      //
    };
  }, [dispatch]);
  useEffect(() => {
    dispatch(listDocprofileCategories());
    return () => {
      //
    };
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
         
            <Link className="brand" to="/">
              Pet Store
            </Link>
          </div>
          <div>
            <Route render={({ history }) => <SearchBox history={history} />} />
          </div>
          <div>
          {/* <Link to="/forum">
              Forum
           
            </Link> */}

            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>

            {/* <Link to="/booking">
              Appointment
              {bookingItems.length > 0 && (
                <span className="badge">{bookingItems.length}</span>
              )}
            </Link> */}
            {userInfo ? (
              <div className="dropdown">
                <Link to="#admin">
                  {userInfo.name}{' '}
                  <i
                    className="fa fa-caret-down	
"
                  />
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory"> Order History </Link>
                  </li>
                  <li>
                    <Link to="/appointmenthistory"> Appointments </Link>
                  </li>
                  <li>
                    <Link to="/signin" onClick={handleSignout}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin"> Sign In</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#seller">
                  Seller{' '}
                  <i
                    className="fa fa-caret-down	"
                  />
                </Link>
                <ul className="dropdown-content">
                  {/* <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li> */}
                  <li>
                    <Link to="/orderlist/seller"> Orders</Link>
                  </li>
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                  <Link to="/lostpetlist/seller">Lostpets</Link>
                  </li>
                  <li>
                    <Link to="/support">ChatBox</Link>
                  </li>
                  <li>
                  <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory"> Order History </Link>
                  </li>
                  <li>
                    <Link to="/appointmenthistory"> Appointments </Link>
                  </li>
                  <li>
                    <Link to="/signin" onClick={handleSignout}>
                      Sign Out
                    </Link>
                    </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isDoctor && (
              <div className="dropdown">
                {/* <Link to="#doctor">
                  Doctor{' '}
                  <i
                    className="fa fa-caret-down	
"
                  />
                </Link> */}
                <ul className="dropdown-content">
                  <li>
                    <Link to="/appointmentlist/doctor">Appointments</Link>
                  </li>
                  <li>
                    <Link to="/docprofilelist/doctor">Doctors</Link>
                  </li>
                </ul>
              </div>
            )}
 

           

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="/dashboard">
                  SuperAdmin{' '}
                  <i
                    className="fa fa-caret-down	
"
                  />
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard"> Dashboard</Link>
                  </li>
                  {/* <li>
                    <Link to="/orderlist"> Orders</Link>
                  </li> */}
                  <li>
                    <Link to="/appointmentlist"> Appointments</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/docprofilelist">Doctors</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                
                  
                </ul>
              </div>
            )}
          </div>
        </header>
      
        

        <main>
          {/* Customer  */}
          <PrivateRoute path="/placeorder" component={PlaceOrderScreen} />
          <PrivateRoute path="/placeappointment" component={PlaceAppointmentScreen} />
          <PrivateRoute path="/shipping" component={ShippingAddressScreen} />
          <PrivateRoute path="/booking" component={AddressScreen} />
          <PrivateRoute path="/address" component={AddressScreen} />
          <PrivateRoute path="/profile" component={ProfileScreen} />
          <PrivateRoute path="/orderhistory" component={OrderHistoryScreen} />
          <PrivateRoute path="/appointmenthistory" component={AppointmentHistoryScreen} />
          <PrivateRoute path="/appointment/:id" component={AppointmentScreen} />
          


          {/* Seller  */}
          <SellerRoute path="/orderlist/seller" component={OrderListScreen} />
          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          />
          <SellerRoute path="/order/:id/" component={OrderScreen}></SellerRoute>
          {/* doctor */}
          <DoctorRoute path="/appointmentlist/seller" component={AppointmentListScreen} />
          <DoctorRoute
            path="/docprofilelist/doctor"
            component={DocprofileListScreen}
          />
          <DoctorRoute path="/appointment/:id" component={AppointmentScreen}></DoctorRoute>

          <SellerRoute path="/product/:id/edit" component={ProductEditScreen} />
          <DoctorRoute path="/docprofile/:id/edit" component={DocprofileEditScreen} />

          <SellerRoute
            path="/lostpetlist/seller"
            component={LostpetListScreen}
          />
          <SellerRoute path="/lostpet/:id/edit" component={LostpetEditScreen} />
          <SellerRoute path="/support" component={SupportScreen} />
          <SellerRoute path="/dashboard" component={DashboardScreen} />

        

          {/* Admin  */}
          {/* <AdminRoute path="/support" component={SupportScreen} /> */}
          <AdminRoute path="/dashboard" component={DashboardScreen} />
          <AdminRoute path="/userlist" component={UserListScreen} />
          <AdminRoute path="/user/:id/edit" component={UserEditScreen} />
          <AdminRoute path="/orderlist" component={OrderListScreen} exact />
          <AdminRoute path="/productlist" component={ProductListScreen} exact />
          <AdminRoute path="/docprofilelist" component={DocprofileListScreen} exact />

          <AdminRoute path="/lostpetlist" component={LostpetListScreen} exact />


          
          

          {/* Public  */}
          <Route
            path="/search/category/:category/name/:name/order/:order/min/:min/max/:max/rating/:rating"
            component={SearchScreen}
          />
          
          <Route path="/search/name/:name?" component={SearchScreen} exact />
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          />
          <Route path="/product/:id" component={ProductScreen} exact />
          <Route path="/docprofile/:id" component={DocprofileScreen} exact />

          <Route path="/lostpet/:id" component={LostpetScreen} exact />

          <Route path="/register" component={RegisterScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/booking/:id?" component={BookingScreen} />
          <Route path="/seller/:id" component={SellerScreen} />
          <Route path="/doctor/:id" component={DoctorScreen} />

          <Route path="/search" component={SearchScreen} exact />
          <Route path="/" exact component={HomeScreen} />
          {/* <PrivateRoute path="/" component={ForumScreen}></PrivateRoute> */}

        </main>
        <footer className="row center">
          {userInfo && !userInfo.isSeller && <ChatBox userInfo={userInfo} />}

          <div>FINAL YEAR PROJECT</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
