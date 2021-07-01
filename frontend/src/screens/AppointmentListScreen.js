import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listAppointments, deleteAppointment } from '../actions/appointmentActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function AppointmentListScreen(props) {
  const doctorMode = props.match.path.indexOf('/admin') >= 0;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointments } = appointmentList;

  const appointmentDelete = useSelector((state) => state.appointmentDelete);
  const { success: successDelete } = appointmentDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAppointments({ doctor: doctorMode ? userInfo._id : '' }));
    return () => {
      //
    };
  }, [dispatch, successDelete, doctorMode, userInfo]);

  const deleteHandler = (appointment) => {
    if (window.confirm('Are you sure to delete this appointment?')) {
      dispatch(deleteAppointment(appointment._id));
    }
  };
  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
           
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment._id}</td>
                <td>{appointment.createdAt}</td>
                <td>{appointment.totalPrice}</td>
              
                <td>{appointment.paidAt ? appointment.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {appointment.deliveredAt
                    ? appointment.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => props.history.push(`/appointment/${appointment._id}`)}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(appointment)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default AppointmentListScreen;
