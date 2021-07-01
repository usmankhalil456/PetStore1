import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { updateLostpet, detailsLostpet } from '../actions/lostpetActions';
import { LOSTPET_UPDATE_RESET } from '../constants/lostpetConstants'

function LostpetEditScreen(props) {
  const lostpetId = props.match.params.id;
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const lostpetUpdate = useSelector((state) => state.lostpetUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = lostpetUpdate;

  const lostpetDetails = useSelector((state) => state.lostpetDetails);
  const { loading, lostpet, error } = lostpetDetails;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: LOSTPET_UPDATE_RESET });
      props.history.push(`/lostpetlist`);
    }
    if (!lostpet.name) {
      dispatch(detailsLostpet(lostpetId));
    } else {
      setId(lostpet._id);
      setName(lostpet.name);
      setImage(lostpet.image);
      setImages(lostpet.images);
      setCategory(lostpet.category);
      setDescription(lostpet.description);
    }

    return () => {
      //
    };
  }, [lostpet, successUpdate, dispatch, props.history, lostpetId]);

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    try {
      const { data } = await axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (forImages) {
        setImages([...images, data]);
      } else {
        setImage(data);
      }
      setUploading(false);
    } catch (err) {
      console.log(err);
      setErrorUpload(err);
      setUploading(false);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateLostpet({
        _id: id,
        name,
        image,
        images,
        category,
        description,
      })
    );
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Lostpet {id}</h1>
        </div>

        {loadingUpdate && <LoadingBox />}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {lostpet.name && (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
         
            <div>
              <label htmlFor="image">Image Url</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image-file">Image File</label>
              <input
                type="file"
                id="image-file"
                label="Choose Image"
                onChange={uploadFileHandler}
              />

              {uploading && <LoadingBox />}
            </div>
            <div>
              <label htmlFor="image-file">Additional Images</label>
              <div>
                <ul>
                  {images.length === 0 && <li>No image</li>}
                  {images.map((x) => (
                    <li>{x}</li>
                  ))}
                </ul>
                <input
                  type="file"
                  id="additional-image-file"
                  label="Choose Image"
                  onChange={(e) => uploadFileHandler(e, true)}
                />
              </div>
              {uploading && <LoadingBox />}
            </div>
        
        
            <div>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <div />
              <div>
                <button
                  onClick={() => props.history.push('/lostpetlist')}
                  type="button"
                >
                  Back
                </button>{' '}
                <button className="primary" type="submit">
                  Update
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default LostpetEditScreen;
