import React from "react";
import _ from "lodash";
import { Link } from "gatsby";
import ArchivePaginationLinks from "../components/ArchivePaginationLinks"
import Layout from "../components/Layout"
import ImageChecker from "../components/ImageChecker"
import SEO from "../components/SEO/SEO"

const IndexPage = ({ data, pageContext }) => {
    const { group, index, first, last, pageCount, additionalContext, pathPrefix } = pageContext;
    const previousUrl = index - 1 === 1 ? "" :
        index - 1 > 1 ?
        "page/" + (index - 1).toString() :
        (index - 1).toString();
    const nextUrl = (index + 1).toString();

    const catName = additionalContext.catName;
    const catDesc = additionalContext.catDescription || catName + ' category archive page';

    return (
        <Layout>

            <SEO
                title = {catName}
                description = {catDesc}
            />

            <h1>Category: {catName}</h1>

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

            <ArchivePaginationLinks
                pageCount = {pageCount}
                first = {first}
                last = {last}
                prevUrl = {`${pathPrefix}/${_.kebabCase(catName)}/${previousUrl}`}
                nextUrl = {`${pathPrefix}/${_.kebabCase(catName)}/page/${nextUrl}`}
                prevText = "Go to Previous Page"
                nextText = "Go to Next Page"
            />

        </Layout>
    );
};

export default IndexPage;
