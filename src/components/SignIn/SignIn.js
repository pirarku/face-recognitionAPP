import { useState } from "react";

function SignIn({loadUser,routeChange, route}) {
    const [email, setEmail] = new useState('');
    const [password, setPassword] = new useState('');
    const [name, setName] = new useState('');
    const [failed, setfailed] = new useState(false);
    const [incomplete, setIncomplete] = new useState(false);
    const [emailvalid, setemailvalid] = new useState(false);
    
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
        fetch('https://face-recognitionapi.onrender.com/signin', {
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
                setfailed(false);
            }else {
                setfailed(true);
            }
         })
        
            
    }
    const RegisterSubmit = () => {
        //first param is the fetched url
        //second param is the method
        fetch('https://face-recognitionapi.onrender.com/register', {
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
                window.location.reload();
                setIncomplete(false)
                setemailvalid(false)
            }else if(data === 'registerIncomplete'){
                setIncomplete(true)
                console.log(data);
            } else {
                setemailvalid(true)
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
                                        className="pa3 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
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
                            className="pa3 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange={inputEmail}
                        />
                        {
                            route === 'Register'
                            ? emailvalid 
                                ?  <p className="center red br2">invalid email</p>: <></>
                            : <></>
                        }
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b pa3 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={inputPassword}
                        />
                        </div>
                        {
                            route === 'Register'
                            ? incomplete ? <p className="center red br2">incomplete Credentials</p>: <></>
                            : failed 
                                ? <p className="center red br2">email and password are incorrect</p>: <></>
                                

                        }
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