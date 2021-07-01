import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DoctorRoute = ({ component: Component, ...rest }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, signout } = userSignin;

  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isDoctor === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={
              signout
                ? '/signin?message=You signed out successfully.'
                : '/signin?message=Error. Please signin as doctor to see this screen.'
            }
          />
        )
      }
    />
  );
};

export default DoctorRoute;
