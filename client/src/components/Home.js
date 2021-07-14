import { Component } from "react";
import AppNavBar from './AppNavBar';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Home extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object.isRequired
  }

  render(){
    const user = this.props.user;

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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, {})(Home);