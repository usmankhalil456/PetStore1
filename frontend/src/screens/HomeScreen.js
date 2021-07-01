import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import { listDocprofiles } from '../actions/docprofileActions';

import { listLostpets } from '../actions/lostpetActions';
import Lostpet from '../components/Lostpet'
import Product from '../components/Product';
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { listTopSellers } from '../actions/userActions';
import Docprofile from '../components/Docprofile';

import Row from 'react-bootstrap/Row';
 import Button from 'react-bootstrap/Button';
 import Col from 'react-bootstrap/Col';
 import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';
 import CardDeck from 'react-bootstrap/CardDeck';
 import CardGroup from 'react-bootstrap/CardGroup';


function HomeScreen() {
  const productList = useSelector((state) => state.productList);
  const lostpetList = useSelector((state) => state.lostpetList);
  const docprofileList = useSelector((state) => state.docprofileList);


  const { products, loading, error } = productList;
  const { lostpets } = lostpetList;
  const { docprofiles } = docprofileList;


  
  const userTopSellers = useSelector((state) => state.userTopSellers);
  const {
    sellers,
    loading: loadingSellers,
    error: errorSellers,
  } = userTopSellers;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listLostpets({ feaured: true }));

    dispatch(listProducts({ feaured: true }));
    dispatch(listDocprofiles({ feaured: true }));

    dispatch(listTopSellers());

    return () => {
      //
    };
  }, [dispatch]);
  return (
    <div>
      <div className="welcome" >
      <h1 > Welcome to Pet Store </h1>
      </div>
      
     

          <Carousel showArrows autoPlay showThumbs={false}>
          <img  src="https://images.unsplash.com/photo-1585491270131-e87735109444?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBldHN8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
        <img src="https://cdn.shopify.com/s/files/1/0430/9093/5965/articles/5-single-default_1024x1024.jpg?v=1594451688" width="100" />
        <img src="https://cdn.shopify.com/s/files/1/0430/9093/5965/articles/5-single-default_1024x1024.jpg?v=1594451688" />
          </Carousel>
        
        
      
      
      
    <h2>Lostpets</h2>

{loading ? (
  <LoadingBox />
) : error ? (
  <MessageBox variant="danger">{error}</MessageBox>
) : (
  <>
    {lostpets.length === 0 && <MessageBox>No lostpet Found</MessageBox>}
    <div className="row center">
      {lostpets.map((lostpet) => (
        <Lostpet key={lostpet._id} lostpet={lostpet} />
      ))}
    </div>
  </>
)}
  
      <h2>Products</h2>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>

  );
}
export default HomeScreen;
