import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Container,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Icon,
  Ref
} from "semantic-ui-react";
import * as actions from "../../actions/auth";
import TopNavigationBar from "./TopNavigationBar";

class MobileContainer extends React.Component {
  state = {};

  handleSidebarHide = () => {
    this.setState({ sidebarOpened: false });
    console.log("event hide");
  };

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;
    const MobileMenu = () => (
      <Segment textAlign="center" vertical>
        <Container>
          <Menu secondary size="large">
            <Menu.Item onClick={this.handleToggle}>
              <Icon name="sidebar" />
            </Menu.Item>
            <Menu.Item
              position="right"
              name="logout"
              onClick={() => this.props.logout()}
            />
          </Menu>
        </Container>
      </Segment>
    );
    return (
      <Responsive
        as={Sidebar.Pushable}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          onHide={() => {
            this.handleSidebarHide();
            console.log("hide");
          }}
          vertical
          visible={sidebarOpened}
        >
          <TopNavigationBar />
        </Sidebar>
        <Sidebar.Pusher dimmed={sidebarOpened}>
          {this.props.isAuthentifacated && <MobileMenu />}
          <Ref innerRef={this.handleSidebarHide}>
            <Container>{children}</Container>
          </Ref>
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  logout: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isAuthentifacated: PropTypes.bool.isRequired
};

export default connect(
  null,
  { logout: actions.logout }
)(MobileContainer);
