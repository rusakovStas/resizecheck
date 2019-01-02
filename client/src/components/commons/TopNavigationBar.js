import React from 'react'
import { Menu, Container, Responsive} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import {PropTypes} from "prop-types";
import {connect} from "react-redux";
import * as actions from "../../actions/auth"


class TopNavigationBar extends React.Component {
    state = { activeItem: localStorage.activeTabName === undefined ? 'home': localStorage.activeTabName};

    handleItemClick = (e, { name }) => {
        this.setState({activeItem: name});
        localStorage.activeTabName = name;
    };

    render() {
        const { activeItem } = this.state;
        const { logout } = this.props;
        return (
                <Container>
                    <Menu.Item name='home'
                               active={activeItem === 'home'}
                               onClick={this.handleItemClick}
                               as={Link} to="/home"/>
                    <Menu.Menu position='right'>
                    {this.props.hasRoleAdmin && <Menu.Item name='admin'
                               active={activeItem === 'admin'}
                               onClick={this.handleItemClick}
                               as={Link} to="/admin"
                    />}
                    <Responsive as={Menu.Item} {...Responsive.onlyComputer} name='logout' active={activeItem === 'logout'} onClick={() => logout()} />
                    </Menu.Menu>
                </Container>
        )
    }
}

TopNavigationBar.propTypes = {
    logout: PropTypes.func.isRequired,
    hasRoleAdmin: PropTypes.bool.isRequired
};

function mapStateToProps(store) {
    return {
        hasRoleAdmin: !!store.user.roles && !!store.user.roles.find((element) => element.role === 'admin')
    }
}


export default connect(mapStateToProps, { logout: actions.logout })(TopNavigationBar);