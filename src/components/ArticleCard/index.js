import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import DateMeta from '../DateMeta'
import * as style from './style.module.scss'

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
    <div className={style.card}>
        <Link to={`/${slug}/`} className={style.link}>
            {image && (
                <GatsbyImage
                    className={style.image}
                    image={image}
                    loading={count === 0 ? 'eager' : 'lazy'}
                    title={imageTitle}
                    alt={imageAlt}
                />
            )}

            <h2 className={style.title}>{title}</h2>

            <DateMeta
                modifiedForUser={modifiedForUser}
                modifiedForSchema={modifiedForSchema}
            />

            <div className={style.excerpt}>
                <p>{excerpt}</p>
            </div>
        </Link>
    </div>
)

export default ArticleCard
