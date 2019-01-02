import React from 'react';
import PropTypes from 'prop-types'
import DesktopContainer from "./DesktopContainer"
import MobileContainer from "./MobileContainer"

const ResponsiveContainer = ({ children, isAuthentifacated }) => (
  <div>
    <DesktopContainer isAuthentifacated = {isAuthentifacated}>{children}</DesktopContainer>
    <MobileContainer isAuthentifacated = {isAuthentifacated}>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthentifacated: PropTypes.bool.isRequired
}

export default ResponsiveContainer;