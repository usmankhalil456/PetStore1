import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  listDocprofiles,
  deleteDocprofile,
  createDocprofile,
} from '../actions/docprofileActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  DOCPROFILE_CREATE_RESET,
  DOCPROFILE_DETAILS_RESET,
} from '../constants/docprofileConstants';

function DocprofileListScreen(props) {
  const docprofileMode = props.match.path.indexOf('/doctor') >= 0;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const docprofileList = useSelector((state) => state.docprofileList);
  const { loading, docprofiles, error } = docprofileList;

  const docprofileCreate = useSelector((state) => state.docprofileCreate);
  const {
    success: successCreate,
    error: errorCreate,
    docprofile: createdDocprofile,
  } = docprofileCreate;

  const docprofileDelete = useSelector((state) => state.docprofileDelete);
  const { success: successDelete } = docprofileDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: DOCPROFILE_CREATE_RESET });
      props.history.push(`/docprofile/${createdDocprofile._id}/edit`);
    }
    dispatch(listDocprofiles({ docprofile: docprofileMode ? userInfo._id : '' }));
    dispatch({ type: DOCPROFILE_DETAILS_RESET });
    return () => {
      //
    };
  }, [
    successDelete,
    successCreate,
    dispatch,
    props.history,
    createdDocprofile,
    userInfo,
    docprofileMode,
  ]);

  const deleteHandler = (docprofile) => {
    if (window.confirm('Are you sure to delete this docprofile?')) {
      dispatch(deleteDocprofile(docprofile._id));
    }
  };

  const createHandler = () => {
    dispatch(createDocprofile());
  };
  return (
    <div>
      <div className="row">
        <h1>Doctor profiles</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Doctor profile
        </button>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : docprofiles.length === 0 ? (
        <MessageBox variant="info">No Appointment Found</MessageBox>
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
                <th>FEES</th>
                <th>CATEGORY</th>
                <th>HOSPITAL</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {docprofiles.map((docprofile) => (
                <tr key={docprofile._id}>
                  <td>{docprofile._id}</td>
                  <td>{docprofile.name}</td>
                  <td>{docprofile.price}</td>
                  <td>{docprofile.category}</td>
                  <td>{docprofile.brand}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() =>
                        props.history.push(`/docprofile/${docprofile._id}/edit`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(docprofile)}
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
export default DocprofileListScreen;
