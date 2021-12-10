import React from 'react'
import Link from '../Link'
import Container from '../../containers/Container'
import {
    wrap,
    emailLink,
    emailLinkLink,
    subLinks,
    subLinksLink,
} from './style.module.scss'

const Contact = () => (
    <div id="contact" className={wrap}>
        <Container>
            <div className={emailLink}>
                Want to work together?{' '}
                <Link
                    to="mailto:hello@robertmarshall.dev"
                    className={emailLinkLink}
                    title="I am happy to talk though whatever you need. Pop me a message and lets have a chat!"
                >
                    Get in touch!
                </Link>
            </div>
            <p>
                Using modern technologies like Gatsby JS, I build high
                converting fully accessible websites, that are optimised for
                search engines and load in the blink of an eye.
            </p>
            <div className={subLinks}>
                <Link
                    href="https://github.com/robmarshall"
                    className={subLinksLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="This link will open a new tab to GitHub"
                >
                    GitHub
                </Link>
                <Link
                    href="https://codepen.io/RobertMarshall"
                    className={subLinksLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="This link will open a new tab to CodePen"
                >
                    CodePen
                </Link>
                <Link
                    href="https://www.linkedin.com/in/robert-marshall-86775883/"
                    className={subLinksLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="This link will open a new tab to LinkedIn"
                >
                    LinkedIn
                </Link>
                <Link
                    href="mailto:hello@robertmarshall.dev"
                    className={subLinksLink}
                    title="Email Rob to have a chat!"
                >
                    Email
                </Link>
            </div>
        </Container>
    </div>
)

export default Contact
