import { Component } from 'react';
import FaceRecognition from './FaceRecognition/FaceRecognition';
import ImageLinkForm from './ImageLinkForm/ImageLinkForm';
import Logo from './Logo/Logo';
import Rank from './Rank/Rank';

class Home extends Component {
  constructor(props) {
    super(props);

    this.user = this.props.user;

    this.state = {
      input: '',
      boxes: [],
      imageUrl: '',
    };
  }

  onInputChange = event => this.setState({ input: event.target.value });

  displayFaceBoxes = boxes => this.setState({ boxes: boxes });

  calculateFaceLocations = data => {
    const clarifaiFace = data.outputs[0].data.regions.map(face => {
      return face.region_info.bounding_box;
    });
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const faceCoordinates = clarifaiFace.map(face => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });
    return faceCoordinates;
  };

  onButtonSubmit = () => {
    this.displayFaceBoxes([]);

    this.setState({ imageUrl: this.state.input });

    fetch('https://ancient-sea-46547.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then(response => response.json())
      .then(response => {
        if (response.rawData?.outputs[0]?.data?.regions[0]?.region_info.bounding_box) {
          fetch('https://ancient-sea-46547.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.user.id,
            }),
          })
            .then(response => response.json())
            .then(count => Object.assign(this.user, { entries: count }))
            .catch(err => console.log(err.message));

          this.displayFaceBoxes(this.calculateFaceLocations(response));
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Logo />
        <Rank name={this.user.name} entries={this.user.entries} />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default Home;
