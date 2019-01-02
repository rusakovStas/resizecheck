import React from 'react';
import PropTypes from 'prop-types'
import {
  Responsive,
  Segment,
  Visibility,
  Menu
} from 'semantic-ui-react'
import TopNavigationBar from "./TopNavigationBar"

class DesktopContainer extends React.Component {
  state = {}

  render() {
    const { children } = this.props
    const DesktopMenu = () =>
                              <Visibility
                                  once={false}
                                  onBottomPassed={this.showFixedMenu}
                                  onBottomPassedReverse={this.hideFixedMenu}
                                >
                                  <Segment
                                    textAlign='center'
                                    vertical
                                  >
                                  <Menu attached='top' tabular>
                                    <TopNavigationBar />
                                  </Menu>
                                  </Segment>
                                </Visibility>

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        {this.props.isAuthentifacated && <DesktopMenu />}
        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthentifacated: PropTypes.bool.isRequired
}

export default DesktopContainer;