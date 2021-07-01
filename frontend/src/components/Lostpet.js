import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Lostpet(props) {
  const { lostpet} = props;
  return (
    <div className="card">
      <Link to={`/lostpet/${lostpet._id}`}>
        <img className="medium" src={lostpet.image} alt={lostpet.name} />
      </Link>
      <div className="card-body">
        <Link to={`/lostpet/${lostpet._id}`}>
          <h2>{lostpet.name}</h2>
        </Link>

        <Rating value={lostpet.rating} text={`${lostpet.numReviews} reviews`} />

        <div className="row">
          <div className="price">{lostpet.price}</div>
          <div>
        
          </div>
        </div>
      </div>
    </div>
  );
}
