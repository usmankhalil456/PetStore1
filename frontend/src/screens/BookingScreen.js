import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToBooking, removeFromBooking } from '../actions/bookingActions';
//import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

function BookingScreen(props) {
  const booking = useSelector((state) => state.booking);

  const { bookingItems, error } = booking;

  const doctorprofileId = props.match.params.id;
  const hospital = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const dispatch = useDispatch();
  const removeFromBookingHandler = (id) => {
    dispatch(removeFromBooking(id));
  };
  useEffect(() => {
    if (doctorprofileId) {
      dispatch(addToBooking(doctorprofileId, hospital));
    }
  }, [doctorprofileId, dispatch, hospital]);

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=address');
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Appointment Booking</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}

        {bookingItems.length === 0 ? (
          <MessageBox>
            No Appointment is booked. <Link to="/">Book Here</Link>
          </MessageBox>
        ) : (
          <ul>
            {bookingItems.map((item) => (
              <li key={item.doctorprofile}>
                <div className="row">
                  <div>
                    <img src={item.image} alt={item.name} className="small" />
                  </div>
                  <div className="min-30">
                    <Link to={`/doctorprofile/${item.doctorprofile}`}>{item.name}</Link>
                  </div>

                  {/* <div>
                    <select
                      value={item.hospital}
                      onChange={(e) =>
                        dispatch(
                          addToBooking(item.doctorprofile, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div> */}
                  {/* <div> {item.price} </div> */}
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromBookingHandler(item.doctorprofile)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            {/* <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : 
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li> */}
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
               // disabled={bookingItems.length === 0}
              >
                Proceed to Booking Appointment
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BookingScreen;
