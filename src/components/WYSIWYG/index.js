import React from 'react'

import './style.scss'

const WYSIWYG = ({ content }) => (
    <div dangerouslySetInnerHTML={{ __html: content }} />
)

export default WYSIWYG
