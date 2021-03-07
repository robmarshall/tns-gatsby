import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import DateMeta from '../DateMeta'
import {
    cardWrap,
    cardLink,
    cardImage,
    cardTitle,
    cardExcerpt,
} from './style.module.scss'

const ArticleCard = ({
    count,
    slug,
    image,
    imageTitle,
    imageAlt,
    title,
    modifiedForUser,
    modifiedForSchema,
    excerpt,
}) => (
    <div className={cardWrap}>
        <Link to={`/${slug}/`} className={cardLink}>
            {image && (
                <GatsbyImage
                    className={cardImage}
                    image={image}
                    loading={count === 0 ? 'eager' : 'lazy'}
                    title={imageTitle}
                    alt={imageAlt}
                />
            )}

            <h2 className={cardTitle}>{title}</h2>

            <DateMeta
                modifiedForUser={modifiedForUser}
                modifiedForSchema={modifiedForSchema}
            />

            <div className={cardExcerpt}>
                <p>{excerpt}</p>
            </div>
        </Link>
    </div>
)

export default ArticleCard
