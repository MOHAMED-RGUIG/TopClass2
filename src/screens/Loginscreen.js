import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function Loginscreen() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const loginstate = useSelector(state => state.loginUserReducer);
  const { loading, error } = loginstate;
  const dispatch = useDispatch();

  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const userFromUrl = urlParams.get('user');

  if (userFromUrl) {
    const user = JSON.parse(decodeURIComponent(userFromUrl));
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = '/homescreen'; // Rediriger vers la page d'accueil
  } else if (localStorage.getItem('currentUser')) {
    window.location.href = '/homescreen'; // Rediriger si déjà connecté
  }
}, []);

  function login() {
    const user = { email, password };
    console.log('Login attempt:', user); // Log the login attempt
    dispatch(loginUser(user));
  }

  return (
    <div class="login-page">


          <div className='col-md-12 col-12  login-logo'>
              <img src="./Logo-Lavazza.jpg" alt="TopClass Logo" />
          </div>  

      <div className='row justify-content-center mt-2'>

        <div className='col-md-11 col-11 text-start '>
          <h2 className='text-center m-2' style={{ fontSize: '30px' }}>Bienvenue!</h2>

          {loading && (<Loading />)}
          {error && (<Error error='Nom dutilisateur ou mot de passe incorrect. Veuillez réessayer' />)}

          <div className='container '>
            <input required type='email' placeholder='Utilisateur' className='form-control'
              value={email} onChange={(e) => { setemail(e.target.value) }}
            />
            <input required type='password' placeholder='Mot de passe' className='form-control'
              value={password} onChange={(e) => { setpassword(e.target.value) }}
            />
            <button onClick={login} className='btn5 mt-3 mb-2 col-12 col-md-12 w-100 h-2' style={{height:'50px'}}>Se connecter </button>
            <br />
            {/*
                        <a href='/register' className='col-12 col-md-12 mx-auto text-center' style={{ textDecoration: 'none', margin: '0 auto' ,color:'#005b2e',fontSize:'13px'}}>Click here to register</a>

            */}
          </div>
        </div>
      </div>
    </div>
  );
}
