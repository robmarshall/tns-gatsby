import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import he from 'he'
import get from 'lodash/get'

const ArticleCard = ({ node }) => {
    const { slug, featuredImage, title, date, modified, excerpt, seo } = node

    const image = get(
        featuredImage,
        'imageFile.childImageSharp.image1000',
        false
    )

    const featuredAlt = get(featuredImage, 'altText', false)
    const featuredTitle = get(featuredImage, 'title', false)

    return (
        <div className="post">
            <Link to={slug}>
                <div>
                    <Img
                        className="post__feat-image"
                        fluid={image}
                        title={featuredTitle}
                        alt={featuredAlt}
                    />
                </div>

                <h3 className="post__title">{he.unescape(title)}</h3>

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
