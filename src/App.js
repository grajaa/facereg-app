import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceDetection from './components/FaceDetection/FaceDetection';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';






const particlesOptions = {
                particles: {
                "number":{"value":80,"density":{"enable":true,"value_area":800}}
                  }
                 }
                 
            
const initialState={
                   input: '', 
                   imageURL: '',
                    box: {},
                    route: 'signin',
                    isSignedIn: false,
                    user:{
                           id:'',
                           name: '',
                           email:'',
                           entries:0,
                           joined:''
                         }
}

class App extends Component {

  constructor(){
    super();
    this.state = { 
                   input: '', 
                   imageURL: '',
                    box: {},
                    route: 'signin',
                    isSignedIn: false,
                    user:{
                           id:'',
                           name: '',
                           email:'',
                           entries:0,
                           joined:''
                         }
                  }
  }

  
  loadUser = (data) => {
    this.setState({user:
    { id:data.id,
      name: data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
   }})
  }

  onInputChange = (event) => {
  this.setState({input:event.target.value});
}


calculateFaceLocation = (data) => {
const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
const image = document.getElementById('inputimage');
const width = Number(image.width);
const height = Number(image.height);
return{
leftCol: clarifaiFace.left_col * width,
topRow: clarifaiFace.top_row * height,
rightCol: width-(clarifaiFace.right_col * width),
bottomRow: height-(clarifaiFace.bottom_row * height)

}
}

displayFaceBox = (box) =>  {
 // console.log(box);
  this.setState({box:box})
}

onButtonSubmit = () => {
this.setState({imageURL:this.state.input});
 fetch('https://boiling-dawn-77748.herokuapp.com/imageurl',{
        method: 'post',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          input:this.state.input
        })
      })
  .then(response => response.json())
  .then(response => {
    if(response){
      fetch('https://boiling-dawn-77748.herokuapp.com/image',{
        method: 'put',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          id:this.state.user.id
        })
      })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user,{entries: count}))
      })
      .catch(console.log);
    }
    this.displayFaceBox(this.calculateFaceLocation(response))
  })
  .catch(err => console.log(err));
   /*.then(
    function(response) {
      this.calculateFaceLocation(response);
      //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );*/
 
}
onRouteChange =(route) =>{
  if(route === 'signout')
  {
     this.setState(initialState)
  }
  else if(route === 'home')
  {
     this.setState({isSignedIn:true})
  } 
  
  this.setState({route:route})
}

  render() {
    const { isSignedIn, box, imageURL, route}=this.state;
    return (
           
      <div className="App">
       <Particles  className='particles'
              params={particlesOptions}
        /> 
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      {route === 'home'

      ?
       <div>
      <Logo />
      <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
      />
      <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
      <FaceDetection box={box } imageURL={imageURL} />
      </div>
      :(route === 'signin'
         ?<Signin loadUser={this.loadUser}  onRouteChange={this.onRouteChange}  /> :
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}   />
        )

        
     
        

      }
     
    
      </div>
    );
  }
}

export default App;