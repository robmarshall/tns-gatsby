import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const ArticleCard = ({
    count,
    base64,
    slug,
    image,
    imageTitle,
    imageAlt,
    title,
    modifiedForUser,
    modifiedForSchema,
    publishedForUser,
    publishedForSchema,
    excerpt,
}) => {
    return (
        <div className="post">
            <Link to={slug}>
                <div>
                    {count === 0 ? (
                        <img
                            className="post__feat-image"
                            src={base64}
                            title={imageTitle}
                            alt={imageAlt}
                        />
                    ) : (
                        <Img
                            className="post__feat-image"
                            fluid={image}
                            title={imageTitle}
                            alt={imageAlt}
                        />
                    )}
                </div>

                <h3 className="post__title">{title}</h3>

                <time
                    className="post__date post__date--published"
                    dateTime={publishedForSchema}
                >
                    {publishedForUser}
                </time>
                <time
                    className="post__date post__date--updated"
                    dateTime={modifiedForSchema}
                >
                    {modifiedForUser}
                </time>

                <div className="post-content">
                    <p>{excerpt}</p>
                </div>
            </Link>
        </div>
    )
}

export default ArticleCard
