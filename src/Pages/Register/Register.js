import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';


function Register() {
    const { setLoading, user, createUser,verifyEmail, updateUserProfile,logOut} = useContext(AuthContext);
    const [error, setError] = useState('');
    const [accepted, setAccepted] = useState(false);
    const navigate  = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(res => {
                const user = res.user;
                setError('');
                handleUpdateUserProfile(name, photoURL);
                form.reset();
                handleEmailVerification();
                toast.success('Please')
            })
            .catch(e => setError(e.message))
            .finally(
                setLoading(false)
            )
    }
    //  verify email
    const handleEmailVerification = () =>{
        verifyEmail().then(()=>{
           
        }).catch()
    }

    // update profile function 
    const handleUpdateUserProfile = (name, photoURL) =>{
        const profile = {
            displayName:name,
            photoURL: photoURL
        }
        updateUserProfile(profile)
        .then().catch(e => setError(e.message))
    }
    // accept terms & conditions
    const handleAccepted = (e) =>{
        setAccepted(e.target.checked);
    }
    // if(user){
    //     logOut();
    //     navigate('/login');
    // }
    return (
        <div>
            <Form onSubmit={handleRegister} className='border border-1 p-5 rounded'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control name='name' type="text" placeholder="Your Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Photo Url</Form.Label>
                    <Form.Control name='photoURL' type="text" placeholder="Photo Url" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check onClick={handleAccepted} type="checkbox" label={
                        <>
                        Accept
                         <Link to={`/terms`}>Terms & conditions </Link>
                        </>
                    } />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={!accepted}>
                    Register
                </Button>
                <Form.Text className="text-muted">
                    {
                        error && <p className='text-danger'>{error}</p>
                    }
                </Form.Text>
            </Form>
        </div>
    )
}

export default Register
