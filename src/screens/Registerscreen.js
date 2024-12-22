/*import React,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../actions/userActions'; 
import Loading from '../components/Loading';

import Error from '../components/Error';
import Success from '../components/Success';
export default function Registerscreen() {
    const [name,setname] = useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const [cpassword,setcpassword] = useState('')
    const registerstate = useSelector(state=>state.registerUserReducer)
    const {error,loading,success} = registerstate
    const dispatch = useDispatch()
    function register(){
        if(password!==cpassword)
            {
                alert("passwords not matched")
            }
            else{
                const user={
                    name,
                    email,
                    password
                }
                console.log(user);
                dispatch(registerUser(user));
            }
    }
  return (
    <div>
        <div className='row justify-content-center mt-5'>
        <img src="/lavazza2.jpg" alt="Lavazza" style={{  }} className='col-11 col-md-11' />

            <div className='col-md-11 col-11 mt-5 text-start shadow-lg p-3 mb-5 bg-body rounded'>
                {loading && (<Loading/>)}
                {success && (<Success success='User register successfully'/>)}
                {error && (<Error error='User already register'/>)}
                <h2 className='text-center m-2' style={{fontSize:'35px'}}>Register</h2>
                <div>
                    <input required type='text' placeholder='name' className='form-control' 
                     value={name} onChange={(e)=>{setname(e.target.value)}}
                    />
                    <input required type='text' placeholder='email' className='form-control'
                     value={email} onChange={(e)=>{setemail(e.target.value)}}
                    />
                    <input required type='password' placeholder='password' className='form-control' 
                    value={password} onChange={(e)=>{setpassword(e.target.value)}}
                    />
                    <input required type='password' placeholder='confirm password' className='form-control'
                    value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}

                    />
                    <button onClick={register} className='btn btn-dark mt-3 mb-2 col-12 col-md-12'>REGISTER </button>
                    <br/>
                    <a href='/login' className='text-dark col-12 col-md-12 mx-auto text-center' style={{ textDecoration: 'none',margin:'0 auto' }}>Click here to login</a>
                </div>
            </div>
        </div>
        
    </div>
  )
}
*/