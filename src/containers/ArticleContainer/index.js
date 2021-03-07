import React from 'react'

import { container } from './style.module.scss'

const ArticleContainer = ({ children }) => (
    <div className={container}>{children}</div>
)

export default ArticleContainer
