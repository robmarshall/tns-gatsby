import React from 'react'
import { wrap, updated, date } from './style.module.scss'

const DateMeta = ({ modifiedForUser, modifiedForSchema }) => (
    <div className={wrap}>
        <span className={updated}>Last Updated: </span>
        <time
            className={date}
            dateTime={modifiedForSchema}
            itemProp="dateModified"
        >
            {modifiedForUser}
        </time>
    </div>
)

export default DateMeta
