import React from 'react'
import Link from '../Link'
import SkillList from '../SkillList'
import WideContainer from '../../containers/WideContainer'
import { hero, title } from './style.module.scss'

const Hero = () => (
    <div className={hero}>
        <WideContainer>
            <h1 className={title}>
                I'm{' '}
                <Link
                    to="https://twitter.com/robertmars"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="This link will open up Twitter in a new tab"
                >
                    Robert Marshall
                </Link>
                , a{' '}
                <Link
                    to="https://github.com/robmarshall"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="This link will open up GitHub in a new tab"
                >
                    frontend developer
                </Link>{' '}
                living in Leeds - UK.
            </h1>
            <SkillList />
        </WideContainer>
    </div>
)

export default Hero
