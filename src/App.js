import React from 'react';
import './App.css';
import Navigation from './components/navigation/navigation.js'
import ImageBox from './components/ImageBox/ImageBox.js'
import Logo from './components/Logo/Logo.js'
import URLbar from './components/URLbar/URLbar.js'
import Rank from './components/Rank/Rank.js'
import Signin from './components/Signin/Signin.js'
import Register from './components/register/register.js'
import Particles from "react-tsparticles";

const particlesInit = (main) => {
  console.log(main);
  // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
};

const particlesLoaded = (container) => {
  console.log(container);
};

const initialState= {
  input:'',
  imageURL:'',
  box:{},
  route:'signin',
  isSignedIn:false,
  user: {
    id:'',
    name:'',
    email:'',
    entries:0,
    joined:''
  }
};
class App extends React.Component {
  constructor() {
    super();
    this.state=initialState;
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  addUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceBoxLocation = (response) => {
    const data=response.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputImage');
    const width=image.width;
    const height=image.height;
    return {
      leftCol:data.left_col*width,
      topRow:data.top_row*height,
      rightCol:width-(data.right_col*width),
      bottomRow:height-(data.bottom_row*height)
    };
  }

  drawFaceBox = (boxcoords) => {
    this.setState({box:boxcoords});
  }

  onSubmit = (event) => {  
    this.setState({imageURL:this.state.input}, () => {
      fetch('https://mighty-gorge-45958.herokuapp.com/imageURL', {
        method:'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          imageURL:this.state.imageURL,
        })
      })
      .then(response => response.json())
      .then ( response => {
          if(response){
            fetch('https://mighty-gorge-45958.herokuapp.com/image', {
              method:'put',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({
                id:this.state.user.id,
              })
            })
            .then(response=>response.json())
            .then(entries=>this.setState(Object.assign(this.state.user,{entries:entries})))
            .catch(console.log)
          }
          this.drawFaceBox(this.calculateFaceBoxLocation(response));
        }
      ).catch(err => console.log(err));
    });
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className='App'>
        <Particles className='particles'
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 60,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route==='home'
          ?<div>
            <Logo/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <URLbar onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <ImageBox box={this.state.box} imageURL={this.state.imageURL}/>
          </div>
          : (
              this.state.route==='signin'
                ?<Signin addUser={this.addUser} onRouteChange={this.onRouteChange}/>
                :<Register addUser={this.addUser} onRouteChange={this.onRouteChange}/>
          )
  }
      </div>
    );
  }
}

export default App;
