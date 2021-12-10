import React from 'react'
import Link from '../Link'
import {
    getCorrectTextColour,
    getAccessibleBackColor,
} from '../../utils/skillColor'
import thirdParty from '../../dataCollections/thirdParty.json'
import { wrap, link, list, item } from './style.module.scss'

const SkillList = () => {
    const skills = [
        'aws',
        'capacitor',
        'circleci',
        'cypress',
        'sass',
        'js',
        'react',
        'es6',
        'node',
        'wordpress',
        'gatsby',
        'gulp',
        'git',
        'webpack',
        'jest',
        'netlify',
        'reacttestinglibrary',
        'storybook',
    ]

    skills.sort()

    let skillList = skills.map((skill) => {
        if (thirdParty[skill]) {
            return (
                <li key={thirdParty[skill].title} className={item}>
                    <Link
                        className={link}
                        title={`External link to ${thirdParty[skill].title}`}
                        to={thirdParty[skill].link}
                        style={{
                            backgroundColor: getAccessibleBackColor(
                                thirdParty[skill].color
                            ),
                            color: getCorrectTextColour(
                                thirdParty[skill].color
                            ),
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {thirdParty[skill].title}
                    </Link>
                </li>
            )
        }

        return null
    })

    return (
        <div className={wrap}>
            <p>I use:</p>
            <ul className={list}>{skillList}</ul>
        </div>
    )
}

export default SkillList
