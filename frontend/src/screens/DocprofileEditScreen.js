import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { updateDocprofile, detailsDocprofile } from '../actions/docprofileActions';
import { DOCPROFILE_UPDATE_RESET } from '../constants/docprofileConstants';

function DocprofileEditScreen(props) {
  const docprofileId = props.match.params.id;
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [fees, setFees] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [experience, setExperience] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const docprofileUpdate = useSelector((state) => state.docprofileUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = docprofileUpdate;

  const docprofileDetails = useSelector((state) => state.docprofileDetails);
  const { loading, docprofile, error } = docprofileDetails;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DOCPROFILE_UPDATE_RESET });
      props.history.push(`/docprofilelist`);
    }
    if (!docprofile.name) {
      dispatch(detailsDocprofile(docprofileId));
    } else {
      setId(docprofile._id);
      setName(docprofile.name);
      setFees(docprofile.fees);
      setImage(docprofile.image);
      setImages(docprofile.images);
      setCategory(docprofile.category);
      setExperience(docprofile.experience);
      setDescription(docprofile.description);
      setCountInStock(docprofile.countInStock);
    }

    return () => {
      //
    };
  }, [docprofile, successUpdate, dispatch, props.history, docprofileId]);

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
      updateDocprofile({
        _id: id,
        name,
        fees,
        image,
        images,
        experience,
        category,
        countInStock,
        description,
      })
    );
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Docprofile {id}</h1>
        </div>

        {loadingUpdate && <LoadingBox />}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {errorUpload && <MessageBox variant="danger">{errorUpload}</MessageBox>}
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {docprofile.name && (
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
              <label htmlFor="fees">Fees</label>
              <input
                id="fees"
                type="number"
                placeholder="Enter fees"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
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
              <label>Experience</label>
              <input
                type="text"
                placeholder="Enter experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="countInStock">Count In Stock</label>
              <input
                id="countInStock"
                type="number"
                placeholder="Enter count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
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
                  onClick={() => props.history.push('/docprofilelist')}
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

export default DocprofileEditScreen;
