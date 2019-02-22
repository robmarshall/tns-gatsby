import React from "react";
import { Link } from "gatsby";
import NavLink from "../components/NavLink"
import Layout from "../components/Layout"
import ImageChecker from "../components/ImageChecker"

const IndexPage = ({ data, pathContext }) => {
    const { group, index, first, last, pageCount } = pathContext;
    const previousUrl = index - 1 === 1 ? "" :
        index - 1 > 1 ?
        "page/" + (index - 1).toString() :
        (index - 1).toString();
    const nextUrl = (index + 1).toString();

    return (
        <Layout>
            <h4>{pageCount} Pages</h4>

            {group.map(({ node }) => (
                <div key={node.slug} className={"post"} style={{ marginBottom: 50 }}>

                    <ImageChecker featuredMedia={node.featured_media}/>

                    <Link to={node.slug}>
                        <h3>{node.title}</h3>
                    </Link>

                    <div className={"post-content"} dangerouslySetInnerHTML={{__html: node.excerpt}} />

                    {node.date}
                </div>
            ))}
            <div className="previousLink">
                <NavLink test={first} url={previousUrl} text="Go to Previous Page" />
            </div>
            <div className="nextLink">
                <NavLink test={last} url={"page/" + nextUrl} text="Go to Next Page" />
            </div>
        </Layout>
    );
};

export default IndexPage;
