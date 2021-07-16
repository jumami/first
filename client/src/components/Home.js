import { Component } from "react";
import AppNavBar from './AppNavBar';
import { Container } from 'reactstrap';

class Home extends Component {

  render(){

    return(
      <div>
        <AppNavBar/>
        <Container>
          <div className="row">
            Home Page
          </div>
        </Container>
      </div>
    )

  }

}



export default Home;