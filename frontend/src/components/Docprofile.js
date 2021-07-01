import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Docprofile(props) {
  const { docprofile } = props;
  return (
    <div className="card">
      <Link to={`/docprofile/${docprofile._id}`}>
        <img className="medium" src={docprofile.image} alt={docprofile.name} />
      </Link>
      <div className="card-body">
        <Link to={`/docprofile/${docprofile._id}`}>
          <h2>{docprofile.name}</h2>
        </Link>

        <Rating value={docprofile.rating} text={`${docprofile.numReviews} reviews`} />

        <div className="row">
          <div className="fees">{docprofile.fees}</div>
          <div>
            {/* <Link to={`/seller/${docprofile.seller._id}`}>
              {docprofile.seller.seller.name}
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
