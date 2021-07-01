import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsLostpet, updateLostpetReview } from '../actions/lostpetActions';
import Rating from '../components/Rating';
import { LOSTPET_REVIEW_SAVE_RESET } from '../constants/lostpetConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function LostpetScreen(props) {
  const lostpetId = props.match.params.id;
  const [selectedImage, setSelectedImage] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const lostpetDetails = useSelector((state) => state.lostpetDetails);
  const { lostpet, loading, error } = lostpetDetails;
  const lostpetReviewSave = useSelector((state) => state.lostpetReviewSave);
  const { success: lostpetUpdateSuccess } = lostpetReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (lostpetUpdateSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: LOSTPET_REVIEW_SAVE_RESET });
    }
    dispatch(detailsLostpet(lostpetId));
    return () => {
      //
    };
  }, [lostpetUpdateSuccess, dispatch, lostpetId]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      updateLostpetReview(lostpetId, {
        name: userInfo.name,
        rating,
        comment,
      })
    );
  };
  
  const changeImage = (image) => {
    setSelectedImage(image);
  };
  return (
    <>
      <Link to="/">Back to result</Link>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={selectedImage || lostpet.image}
                alt={lostpet.name}
              />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{lostpet.name}</h1>
                </li>
                {/* <li>
                  <a href="#reviews">
                    <Rating
                      value={lostpet.rating}
                      text={`${lostpet.numReviews} reviews`}
                    />
                  </a>
                </li> */}
                <li>
                  Description:
                  <p>{lostpet.description}</p>
                </li>
                <li>
                  Images:
                  <ul className="images">
                    {[lostpet.image, ...lostpet.images].map((x) => (
                      <li key={x}>
                        <button
                          type="button"
                          className="light"
                          onClick={() => changeImage(x)}
                        >
                          <img src={x} alt="lostpet" className="small" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    Seller
                    <h2>
                      <Link to={`/seller/${lostpet.seller._id}`}>
                        {lostpet.seller.seller.name}
                      </Link>
                    </h2>
                    {/* <Rating
                      value={lostpet.seller.seller.rating}
                      text={`${lostpet.seller.seller.numReviews} reviews`}
                    /> */}
                  </li>
                  <li>
                   
                
                  </li>
                 
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h2 id="reviews">Details</h2>
              {!lostpet.reviews.length && (
                <MessageBox>If you find this, please write below your contact number and description</MessageBox>
              )}
              <ul>
                {lostpet.reviews.map((review) => (
                  <li key={review._id}>
                    <strong>{review.name}</strong>

                    <Rating value={review.rating} />

                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </li>
                ))}

                <li>
                  {userInfo ? (
                    <form className="form" onSubmit={submitHandler}>
                      <div>
                        <h2>Please write derails in Comment Box</h2>
                      </div>
                    
                      <div>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                      <div>
                        <div />
                        <button className="primary" type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  ) : (
                    <MessageBox>
                      Please <Link to="/signin">Sign-in</Link> to write a
                      review.
                    </MessageBox>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default LostpetScreen;
