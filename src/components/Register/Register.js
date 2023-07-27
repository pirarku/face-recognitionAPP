import { useState } from "react";

function Register({routeChange, route}) {
    const [name, setName] = new useState('');
    const [email, setEmail] = new useState('');
    const [password, setPassword] = new useState('');

    const inputEmail = (e) => {
        setEmail(e.target.value);
    }

    const inputPassword = (e) => {
        setPassword(e.target.value);
    }

    const inputName = (e) => {
        setName(e.target.value);
    }

    const submitInput = () => {
        //first param is the fetched url
        //second param is the method
        fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
         })
         .then(response => response.json())
         .then(data => {
            routeChange('SignIn');
         }).catch(err => console.log('theres something wrong with the server'))
        
            
    }
    return (
        <article className="mw6 center bg-white-50 br3 pa3 pa4-ns mv3 ba b--black-10">
             <main className="pa4 black-80">
                <div className="flex flex-column measure">
                    <fieldset id="sign_up" className="tl ba b--transparent ph0 mh0">
                        <legend className="tc f2 fw6 ph0 mh0">Register</legend>
                    
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange={inputName}
                            />
                        </div>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange={inputEmail}
                        />
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={inputPassword}
                        />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={submitInput} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                    </div>
                </div>
            </main>
        </article>
       
    );
}

export default Register;