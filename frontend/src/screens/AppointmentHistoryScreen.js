import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAppointmentMine } from '../actions/appointmentActions'
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function AppointmentHistoryScreen(props) {
  const dispatch = useDispatch();

  const appointmentMineList = useSelector((state) => state.appointmentMineList);
  const { loading, appointments, error } = appointmentMineList;
  useEffect(() => {
    dispatch(listAppointmentMine());
    return () => {};
  }, [dispatch]);
  return (
    <div>
      <h1>Appointment History</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : appointments.length === 0 ? (
        <MessageBox variant="info">No Appointment Found</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment._id}</td>
                <td>{appointment.createdAt.substring(0, 10)}</td>
                <td>{appointment.totalPrice}</td>
                <td>{appointment.isPaid ? appointment.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      props.history.push(`/appointment/${appointment._id}`);
                    }}
                    className="small"
                  >
                    Details
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

export default AppointmentHistoryScreen;
