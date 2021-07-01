import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser } from '../actions/userActions';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import Rating from '../components/Rating';
import DocprofileScreen from './DocprofileScreen';
import Docprofile from '../components/Docprofile'
import { listDocprofiles } from '../actions/docprofileActions';

function DoctorScreen(props) {
  const dispatch = useDispatch();
  const doctorId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;
  const docprofileList = useSelector((state) => state.docprofileList);
  const {
    loading: loadingDocprofiles,
    docprofiles,
    error: errorDocprofiles,
  } = docprofileList;
  useEffect(() => {
    dispatch(detailsUser(doctorId));
    dispatch(listDocprofiles({ doctor: doctorId }));

    return () => {};
  }, [dispatch, doctorId]);

  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul className="card card-body">
            <li>
              <div className="row">
                <div>
                  <img
                    src={user.doctor.logo}
                    alt={user.doctor.name}
                    className="small"
                  />
                </div>
                <div>
                  <h1>{user.doctor.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating
                value={user.doctor.rating}
                text={`${user.doctor.numReviews} reviews`}
              />
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Contact Doctor</a>
            </li>
            <li>{user.doctor.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingDocprofiles ? (
          <LoadingBox />
        ) : errorDocprofiles ? (
          <MessageBox>{errorDocprofiles}</MessageBox>
        ) : (
          <>
            {docprofiles.length === 0 && (
              <MessageBox>No Doctor Found.</MessageBox>
            )}
            <div className="row">
              {docprofiles.map((docprofile) => (
                <div key={docprofile._id}>
                  <Docprofile docprofile={docprofile} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DoctorScreen;
