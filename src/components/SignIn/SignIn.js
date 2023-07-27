import { useState } from "react";

function SignIn({loadUser,routeChange, route}) {
    const [email, setEmail] = new useState('');
    const [password, setPassword] = new useState('');
    const [name, setName] = new useState('');
    
    const inputName = (e) => {
            setName(e.target.value);
    }

    const inputEmail = (e) => {
        setEmail(e.target.value);
    }

    const inputPassword = (e) => {
        setPassword(e.target.value);
    }

    const SignInSubmit = () => {
        //first param is the fetched url
        //second param is the method
        fetch('http://localhost:3000/signin', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email,
                    password: password
                })
         })
         .then(response => response.json())
         .then(data => {
            if(data.id){
                loadUser(data);
                routeChange('Home')
            }
         })
        
            
    }
    const RegisterSubmit = () => {
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
            if(data.id){
                routeChange('SignIn');
            }
            
         })
        
            
    }
    return (
        <article className="mw6 center bg-white-50 br3 pa3 pa4-ns mv3 ba b--black-10">
             <main className="pa4 black-80">
                <div className="flex flex-column measure">
                    <fieldset id="sign_up" className="tl ba b--transparent ph0 mh0">
                        {route === 'Register'
                            ? <div>
                                <legend className="tc f2 fw6 ph0 mh0 center">Register</legend> 
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
                             </div>  
                            : <legend className="tc f2 fw6 ph0 mh0">Sign In</legend>


                        }
                        
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
                    {
                        route === 'Register'
                        ? <div className="">
                            <input onClick={RegisterSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
                        </div>
                        : <div> 
                            <div className="">
                                <input onClick={SignInSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={()=>routeChange('Register')} href="#0" className="f6 link dim black db">Register</p>
                            </div>
                        </div>
                    }
                    
                </div>
            </main>
        </article>
       
    );
}

export default SignIn;