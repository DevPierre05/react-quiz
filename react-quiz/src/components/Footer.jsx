import PropTypes from "prop-types"

function Footer({children}) {
  return <div>{children}</div>;
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Footer
