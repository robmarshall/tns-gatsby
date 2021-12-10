import React from 'react'

import { container } from './style.module.scss'

const WideContainer = ({ children }) => (
    <div className={container}>{children}</div>
)

export default WideContainer
