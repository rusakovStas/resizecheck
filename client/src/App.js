import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import HomePage from "./components/Home/Page";
import LoginPage from "./components/Login/Page";
import UserPage from "./components/User/Page";
import GuestRoute from "./components/commons/GuestRoute"
import AdminRoute from "./components/commons/AdminRoute"
import UserRoute from "./components/commons/UserRoute"
import ResponsiveContainer from "./components/commons/ResponsiveContainer"

const App = ({location, isAuthentifacated}) => (
  <div>
  	<ResponsiveContainer isAuthentifacated = {isAuthentifacated}>
      <UserRoute location = {location} path="/home" exact component={HomePage} />
      <AdminRoute location = {location} path="/admin" exact component={UserPage} />
    </ResponsiveContainer>
      <GuestRoute location = {location} path="/" exact component={LoginPage} />
  </div>
);

App.propTypes = {
	location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    isAuthentifacated:PropTypes.bool.isRequired
};

function mapStateToProps(store) {
    return {
        isAuthentifacated: !!store.user.access_token
    }
}

export default connect(mapStateToProps)(App);