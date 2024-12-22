import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts,getAllImgProducts } from '../actions/productAction';
import Product from '../components/product';
import Loading from '../components/Loading';
import Error from '../components/Error';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import feather from 'feather-icons';





export default function Homescreen() {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector(state => state.products);
  const { imgProducts = [] } = useSelector(state => state.imgProducts); 
  React.useEffect(() => {
    feather.replace();
  }, []);

  // Filtre
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('CAFE GRAIN');
  const [selectedSubCategorie, setSelectedSubCategorie] = useState(''); // New state for subfamily

  // Get products
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllImgProducts());
  }, [dispatch]);

  const productsWithImages = products.map(product => {
    const imgProduct = imgProducts.find(img => img.Reference === product.ITMREF_0);
    return {
      ...product,
      Image: imgProduct ? imgProduct.Image : '/defaultImage.png' // Use a default image if not found
    };
  });

  // Filter products based on search, category, and subcategory
  const filteredProducts = productsWithImages.filter(product => {
    const matchesName = product.ITMDES1_0.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCode = product.ITMREF_0.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategorie = selectedCategorie ? product['Designation_Famille_Stat1'] === selectedCategorie : true;
    const matchesSubCategorie = selectedSubCategorie ? product['TSICOD_1'] === selectedSubCategorie : true;
    return matchesCategorie && matchesSubCategorie && (matchesCode || matchesName);
  });

  const handleCategoryChange = (Designation_Famille_Stat1) => {
    setSelectedCategorie(Designation_Famille_Stat1);
    setSelectedSubCategorie(''); // Reset subfamily when main category changes
  };

  const handleSubCategoryChange = (TSICOD_1) => {
    setSelectedSubCategorie(TSICOD_1);
  };

  // Categories and subcategories
  const categories = ['All', ...new Set(products.map(product => product.Designation_Famille_Stat1))];
  const subCategories = ['All', ...new Set(products
    .filter(product => product.Designation_Famille_Stat1 === selectedCategorie)
    .map(product => product.TSICOD_1))];

    const renderCustomButtons = (items, selectedItem, handleChange, customClass = 'category-btn') => {
      const chunkSize = 4; // Number of buttons per slide
      const chunks = [];
      for (let i = 0; i < items.length; i += chunkSize) {
        chunks.push(items.slice(i, i + chunkSize));
      }
      return chunks.map((chunk, index) => (
        <div key={index} className="category-slide col-12 col-md-12">
          {chunk.map(item => (
            <button
              key={item}
              className={`${customClass} text-truncate ${selectedItem === item || (item === 'All' && selectedItem === '') ? 'active' : ''} col-xs-3 col-3 col-md-3`}
              onClick={() => handleChange(item === 'All' ? '' : item)}
            >
              {item}
            </button>
          ))}
        </div>
      ));
    };

  return (
    <div>
      <div className="col-12 col-md-12">
        <Carousel
          showThumbs={false}
          infiniteLoop
          useKeyboardArrows
          interval={5000}
          transitionTime={1800}
          showIndicators={true}
          showStatus={false}
          autoPlay
        >
          <div>
            <img src="/lavazza7.jpg" alt="Lavazza" />
          </div>
          <div>
            <img src="/lavazza8.jpg" alt="Lavazza" />
          </div>
          <div>
            <img src="/lavazza9.jpg" alt="Lavazza" />
          </div>
        </Carousel>
      </div>

      {/* Main Category Carousel */}
      <div className="category-buttons col-xs-12 col-12 col-md-12 col-xl-10 mt-2">
        <Carousel 
          showThumbs={false} 
          infiniteLoop 
          useKeyboardArrows 
          interval={1000} 
          transitionTime={200} 
          showIndicators={false} 
          showStatus={false}
          className="col-xs-12 col-12 col-md-12 col-xl-10"
        >
          {renderCustomButtons(categories, selectedCategorie, handleCategoryChange)}
        </Carousel>
      </div>

      {/* Subfamily Carousel */}
      <div className="subfamily-buttons col-xs-12 col-12 col-md-12 col-xl-10 mt-2">
  <Carousel 
    showThumbs={false} 
    infiniteLoop 
    useKeyboardArrows 
    interval={1000} 
    transitionTime={200} 
    showIndicators={false} 
    showStatus={false}
    className="col-xs-12 col-12 col-md-12 col-xl-10"
  >
    {renderCustomButtons(subCategories, selectedSubCategorie, handleSubCategoryChange, 'subcategory-btn')}
  </Carousel>
</div>
      <div className='search-bar col-11 col-xl-11 col-md-11 text-center mb-2'>
        <input
          className="form-control text-center"
          id="search-input"
          type='search'
          placeholder='Rechercher...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
 
      <div className='row justify-content-center col-xl-12 col-md-12 col-12 mx-auto'>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error='Something went wrong' />
        ) : (
          
          filteredProducts.map((product) => (
            <div key={product.ITMREF_0} className='col-12 col-md-12'>
              <Product product={product}/>
            </div>
          ))
        )}
            {/*
       <footer className="menubar-area footer-fixed bg-light mt-1">
      <div className="toolbar-inner menubar-nav d-flex justify-content-around">
      <a href="/orders" className="nav-link">
          <i className="bi bi-grid  row  justify-content-center m-3"></i>
          <span>Commandes</span>
        </a>
        <a href="/homescreen" className="nav-link active">
          <i className="bi bi-house-door row justify-content-center m-3" ></i>
          <span >Acceuil</span>
        </a>
     
        <a href="/cart" className="nav-link">
          <i className="bi bi-heart   row   justify-content-center m-3"></i>
          <span>Panier</span>
        </a>
      </div>
    </footer>  */} 
      </div>
     
    </div>
  );
}
