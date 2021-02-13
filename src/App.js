import React,  { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '7174c2e5bd564a8b816fe45ac610683d'
});

const particlesOptions =
{
  particles: {
    number:
    {
      value: 150,
      density:{
        enable:true,
        value_area:800
      }
    }
  }
}

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const ClarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: ClarifaiFace.left_col * width,
      topRow: ClarifaiFace.top_row * height,
      rightCol: width - (ClarifaiFace.right_col * width),
      bottomRow: height - (ClarifaiFace.bottom_row * height)
    }

  }

  displayBox = (box) =>
  {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => 
  {
    this.setState({imageUrl: this.state.input});
    
    //Clarifai.FACE_DETECT_MODEL //https://samples.clarifai.com/face-det.jpg

    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response => this.displayBox(this.calculateFaceLocation(response)) ) // calculates face location and returns the object
      .catch(err => console.log(err) );
      
  }

  onRouteChange = (route) =>
  {
    if(route === 'signout'){
      this.setState({isSignedIn: 'false'})
    }
    else if(route === 'home'){
      this.setState({isSignedIn: 'true'})
    }
    this.setState({route: route});
  }

  render () {
    return (
      <div className="App">
        <Particles className="particles"
              params={particlesOptions}
        />
         <Navigation isSignedIn= {this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
         { this.state.route === 'home' 
            ? 
                <div>
                  <Logo />
                  <Rank />
                  <ImageLinkForm 
                    onInputChange={ this.onInputChange } 
                    onButtonSubmit={this.onButtonSubmit} />
                  <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} /> 
                </div>
              :
              (
                  this.state.route === 'signin'
                  ? <SignIn onRouteChange={ this.onRouteChange }/> 
                  : <Register onRouteChange={ this.onRouteChange}/>
              )
          }
      </div>
    
    )
  }
}



export default App;
