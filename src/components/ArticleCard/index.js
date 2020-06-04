import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import decodeEntities from '../../utils/decodeEntities'

const ArticleCard = ({ count, node }) => {
    const { slug, featuredImage, title, date, modified, excerpt, seo } = node

    const baseImage =
        featuredImage?.imageFile?.childImageSharp?.base700.base64 || false
    const image = featuredImage?.imageFile?.childImageSharp?.image700 || false

    const featuredAlt = featuredImage?.altText || ''
    const featuredTitle = featuredImage?.title || ''

    return (
        <div className="post">
            <Link to={slug}>
                <div>
                    {count === 0 ? (
                        <img
                            className="post__feat-image"
                            src={baseImage}
                            title={featuredTitle}
                            alt={featuredAlt}
                        />
                    ) : (
                        <Img
                            className="post__feat-image"
                            fluid={image}
                            title={featuredTitle}
                            alt={featuredAlt}
                        />
                    )}
                </div>

                <h3 className="post__title">{decodeEntities(title)}</h3>

                <time
                    className="post__date post__date--published"
                    dateTime={dayjs(date).format('YYYY-MM-DDTHH:mm:ss+00:00')}
                >
                    {dayjs(date).format('D MMMM YYYY')}
                </time>
                <time
                    className="post__date post__date--updated"
                    dateTime={dayjs(modified).format(
                        'YYYY-MM-DDTHH:mm:ss+00:00'
                    )}
                >
                    {dayjs(modified).format('D MMMM YYYY')}
                </time>

                <div
                    className="post-content"
                    // eslint-disable-next-line
                    dangerouslySetInnerHTML={{
                        __html: seo.metaDesc
                            ? `<p>${seo.metaDesc}</p>`
                            : excerpt,
                    }}
                />
            </Link>
        </div>
    )
}

export default ArticleCard
