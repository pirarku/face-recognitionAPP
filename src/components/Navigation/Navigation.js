function Navigation({routeChange, isSignIn}) {
    if(isSignIn){
         return (
         <div className="flex justify-end">
           <p onClick={()=>routeChange("SignOut")} className="f4 link dim underline pointer">Sign Out</p>
        </div>
        )
    }else {
        return (
        <div className="flex justify-end">
           <p onClick={()=>routeChange("SignIn")} className="mr3 f4 link dim underline pointer">Sign In</p>
           <p onClick={()=>routeChange("Register")} className=" ml3 f4 link dim underline pointer">Register</p>
        </div>
        )
    }
        
}

export default Navigation;