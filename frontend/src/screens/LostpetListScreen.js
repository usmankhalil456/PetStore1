import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  listLostpets,
  deleteLostpet,
  createLostpet,
} from '../actions/lostpetActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  LOSTPET_CREATE_RESET,
  LOSTPET_DETAILS_RESET,
} from '../constants/lostpetConstants'

function LostpetListScreen(props) {
  const sellerMode = props.match.path.indexOf('/admin') >= 0;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const lostpetList = useSelector((state) => state.lostpetList);
  const { loading, lostpets, error } = lostpetList;

  const lostpetCreate = useSelector((state) => state.lostpetCreate);
  const {
    success: successCreate,
    error: errorCreate,
    lostpet: createdLostpet,
  } = lostpetCreate;

  const lostpetDelete = useSelector((state) => state.lostpetDelete);
  const { success: successDelete } = lostpetDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: LOSTPET_CREATE_RESET });
      props.history.push(`/lostpet/${createdLostpet._id}/edit`);
    }
    dispatch(listLostpets({ seller: sellerMode ? userInfo._id : '' }));
    dispatch({ type: LOSTPET_DETAILS_RESET });
    return () => {
      //
    };
  }, [
    successDelete,
    successCreate,
    dispatch,
    props.history,
    createdLostpet,
    userInfo,
    sellerMode,
  ]);

  const deleteHandler = (lostpet) => {
    if (window.confirm('Are you sure to delete this lostpet?')) {
      dispatch(deleteLostpet(lostpet._id));
    }
  };

  const createHandler = () => {
    dispatch(createLostpet());
  };
  return (
    <div>
      <div className="row">
        <h1>lostpets</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create lostpet
        </button>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : lostpets.length === 0 ? (
        <MessageBox variant="info">No Lostpet information Found</MessageBox>
      ) : (
        <>
          {errorCreate && (
            <MessageBox variant="danger">{errorCreate}</MessageBox>
          )}
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {lostpets.map((lostpet) => (
                <tr key={lostpet._id}>
                  <td>{lostpet._id}</td>
                  <td>{lostpet.name}</td>
                  <td>{lostpet.category}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/lostpet/${lostpet._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(lostpet)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
export default LostpetListScreen;
