import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image";
import _ from 'lodash'
import moment from 'moment';

const ArticleCard = ({node}) => {
    const { slug,featuredImage, title, date, modified, excerpt } = node

    const image = _.get(
        featuredImage,
        'imageFile.childImageSharp.image1000',
        false
    )

    const featuredAlt = _.get(featuredImage, 'altText', false)
    const featuredTitle = _.get(featuredImage, 'title', false)

    return (
        <div key={slug} className="post">

            <Link to={slug}>

                <div>
                    <Img className="post__feat-image" fluid={image} title={featuredTitle} alt={featuredAlt} />
                </div>

                <h3
                    className="post__title"
                    // eslint-disable-next-line
        dangerouslySetInnerHTML={{__html: title}}
                />

                <time
                    className="post__date post__date--published"
                    dateTime={moment(date).format('YYYY-MM-DDTHH:mm:ss+00:00')}
                >
                    {moment(date).format('Do MMMM YYYY')}
                </time>
                <time
                    className="post__date post__date--updated"
                    dateTime={moment(modified).format('YYYY-MM-DDTHH:mm:ss+00:00')}
                >
                    {moment(modified).format('Do MMMM YYYY')}
                </time>

                <div
                    className="post-content"
                    // eslint-disable-next-line
        dangerouslySetInnerHTML={{__html: excerpt}}
                />

            </Link>

        </div>
    )
}

export default ArticleCard
