import React, { Component } from 'react';
import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import FaceDetection from './components/FaceDetection/FaceDetection'
import Ranks from './components/Ranks/Ranks';
import SignIn from './components/SignIn/SignIn';

const InititalState = {
  input: '',
  image_Url: '',
  box: {},
  route: 'SignIn',
  isSignIn: false,
  user: {
    id:'',
    name: '',
    email: '',
    entries: '',
    joined: ''
  }
};


class App extends Component {
  constructor(){
    super();
    this.state = InititalState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.datea
    }})
  }

  calculateBorder = (result) => {
    const bounding_box = result.outputs[0].data.regions[0].region_info.bounding_box;
    const imageOutput = document.getElementById('imageOutput');
    const width = Number(imageOutput.width);
    const height = Number(imageOutput.height);

    const obj = {
      top: bounding_box.top_row * height,
      bottom: height - (bounding_box.bottom_row * height),
      left: bounding_box.left_col * width,
      right: width - (bounding_box.right_col* width)
    }

    return obj;
  }

  bounding_box = (box) => {
    this.setState({box: box});
  }

  onChangeInput = (e) => {
    this.setState({input: e.target.value});
  }

  onClickDetect = () => {
    this.setState({image_Url: this.state.input})
        fetch("http://localhost:3000/clarifyApi", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
               url: this.state.input
            })
        })
            .then(response => response.json())
            .then(result => {
              if(result && this.state.input !== ''){
                  fetch('http://localhost:3000/image', {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                      id : this.state.user.id
                    })
                  })
                  .then(res => res.json())
                  .then(count => {
                    this.setState(Object.assign(this.state.user, {entries: count}))})
              }
              this.bounding_box(this.calculateBorder(result))
            })
            .catch(error => console.log('error', error));
  }

  routeChange = (route) => {
    if(route === "SignOut") {
      this.setState(InititalState);
    }else if(route === "Home"){
      this.setState({isSignIn: true})
    }
    this.setState({route: route});
  }

  render(){
    const  {image_Url, box, route, isSignIn,user} = this.state;
    return (
      <div className="App pa3">
        <ParticlesBg color='#ffffff' type='cobweb' bg={true}/>
        <Navigation routeChange={this.routeChange} isSignIn={isSignIn}/>
        {route === 'Home'
          ?(<div>
                  <Logo/>
                  <Ranks name={user.name} entries={user.entries}/>
                  <ImageLink onChangeInput={this.onChangeInput} onClickDetect={this.onClickDetect}/>
                  <FaceDetection getUrl={image_Url} Box={box}/>
            </div>) 
          : <SignIn route={route} loadUser={this.loadUser} routeChange={this.routeChange}/>
          // route === 'Register' 
          //     ? <Register routeChange={this.routeChange} route={route}/>
          //     : <SignIn loadUser={this.loadUser} routeChange={this.routeChange}/>
        }
      </div>
    );
  }
}

export default App;
