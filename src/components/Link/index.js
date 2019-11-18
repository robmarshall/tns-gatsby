import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = ({ children, to, activeClassName, partiallyActive, ...other }) => {
    const internal = /^\/(?!\/)/.test(to)
    if (internal) {
        return (
            <GatsbyLink
                to={to}
                activeClassName={activeClassName}
                partiallyActive={partiallyActive}
                // eslint-disable-next-line
                {...other}
            >
                {children}
            </GatsbyLink>
        )
    }
    return (
    // eslint-disable-next-line react/jsx-props-no-spreading
        <OutboundLink href={to} {...other}>
            {children}
        </OutboundLink>
    )
}
export default Link
