import React from "react";
import { Link } from "gatsby";
import ArchivePaginationLinks from "../components/ArchivePaginationLinks"
import Layout from "../components/Layout"
import ImageChecker from "../components/ImageChecker"

const IndexPage = ({ data, pageContext }) => {
    const { pageCount, group, index, first, last } = pageContext;
    const previousUrl = index - 1 === 1 ? "" :
        index - 1 > 1 ?
        "page/" + (index - 1).toString() :
        (index - 1).toString();
    const nextUrl = (index + 1).toString();

    return (
        <Layout>

            {group.map(({ node }) => (

                <div key={node.slug} className={"post"} style={{ marginBottom: 50 }}>

                    <ImageChecker featuredMedia={node.featured_media}/>

                    <Link to={node.slug}>
                        <h3>{node.title}</h3>
                    </Link>

                    {node.date}

                    <div className={"post-content"} dangerouslySetInnerHTML={{__html: node.excerpt}} />

                </div>
            ))}

            <ArchivePaginationLinks
                pageCount = {pageCount}
                first = {first}
                last = {last}
                prevUrl = {previousUrl}
                nextUrl = {"page/" + nextUrl}
                prevText = "Go to Previous Page"
                nextText = "Go to Next Page"
            />

        </Layout>
    );
};

export default IndexPage;
