import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsDocprofile, updateDocprofileReview } from '../actions/docprofileActions';
import Rating from '../components/Rating';
import { DOCPROFILE_REVIEW_SAVE_RESET } from '../constants/docprofileConstants'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function DocprofileScreen(props) {
  const docprofileId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const docprofileDetails = useSelector((state) => state.docprofileDetails);
  const { docprofile, loading, error } = docprofileDetails;
  const docprofileReviewSave = useSelector((state) => state.docprofileReviewSave);
  const { success: docprofileUpdateSuccess } = docprofileReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (docprofileUpdateSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: DOCPROFILE_REVIEW_SAVE_RESET });
    }
    dispatch(detailsDocprofile(docprofileId));
    return () => {
      //
    };
  }, [docprofileUpdateSuccess, dispatch, docprofileId]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      updateDocprofileReview(docprofileId, {
        name: userInfo.name,
        rating,
        comment,
      })
    );
  };
  const handleAddToBooking = () => {
    props.history.push(`/booking/${props.match.params.id}?qty=${qty}`);
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
                src={selectedImage || docprofile.image}
                alt={docprofile.name}
              />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{docprofile.name}</h1>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating
                      value={docprofile.rating}
                      text={`${docprofile.numReviews} reviews`}
                    />
                  </a>
                </li>
                <li>fees: {docprofile.fees}</li>
                <li>
                  Description:
                  <p>{docprofile.description}</p>
                </li>
                <li>
                  Images:
                  <ul className="images">
                    {[docprofile.image, ...docprofile.images].map((x) => (
                      <li key={x}>
                        <button
                          type="button"
                          className="light"
                          onClick={() => changeImage(x)}
                        >
                          <img src={x} alt="docprofile" className="small" />
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
                    doctor
                    <h2>
                      <Link to={`/doctor/${docprofile.doctor._id}`}>
                        {docprofile.doctor.doctor.name}
                      </Link>
                    </h2>
                    <Rating
                      value={docprofile.doctor.doctor.rating}
                      text={`${docprofile.doctor.doctor.numReviews} reviews`}
                    />
                  </li>
                  <li>
                    <div className="row">
                      <div>fees</div>
                      <div>
                        <div className="fees">{docprofile.fees}</div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      {/* <div>Status</div> */}
                      <div>
                        {/* {docprofile.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )} */}
                      </div>
                    </div>
                  </li>

                  <li>
                        <button
                          className="block primary"
                          type="button"
                          onClick={handleAddToBooking}
                        >
                          Book Appointment
                        </button>
                      </li>

                  {/* {docprofile.countInStocks > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => {
                                setQty(e.target.value);
                              }}
                            >
                              {[...Array(docprofile.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          className="block primary"
                          type="button"
                          onClick={handleAddToBooking}
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )} */}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h2 id="reviews">Reviews</h2>
              {!docprofile.reviews.length && (
                <MessageBox>There is no review</MessageBox>
              )}
              <ul>
                {docprofile.reviews.map((review) => (
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
                        <h2>Write a customer review</h2>
                      </div>
                      <div>
                        <label htmlFor="rating">Rating</label>
                        <select
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
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
export default DocprofileScreen;
