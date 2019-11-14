import React from "react";
import { Link } from "gatsby";

const NavLink = props => {
    const {test, text, url} = props
    if (!test) {
        return <Link to={url}>{text}</Link>;
    }
    return <span>{text}</span>;

};

export default NavLink
