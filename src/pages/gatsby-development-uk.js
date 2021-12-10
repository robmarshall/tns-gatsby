import React from 'react'
import { Link } from 'gatsby'
import SEO from '../components/SEO/SEO'
import Layout from '../containers/Layout'
import Container from '../containers/Container'

const IndexPage = () => (
    <Layout>
        <SEO
            title="Gatsby JS Development in the UK"
            description="Expert Gatsby JS developer based in the UK"
            keywords={['gatsby', 'react']}
        />
        <Container>
            <h1>Expert Gatsby JS Development in the UK</h1>
            <p>
                Gatsby JS is a static site generator that is used to create high
                performance websites. Due to the increased speed they tend to be
                higher converting, and because they are static they boost
                security.
            </p>
            <h2>Increased Revenue</h2>
            <p>
                The BBC found that they lost 10% of users for every additional
                second the website took to load. The Trainline reduced their
                website load time by 0.3 seconds and increased revenue by an
                extra £8 million a year. Google found that 53% of mobile users
                abandon sites that take over 3 seconds to load. There is no
                doubt that page speed is a major contributor to business
                performance.
            </p>
            <p>
                All of the Gatsby sites that I have built for clients have
                loaded in under 2.5 seconds in test conditions.
            </p>
            <h2>Reducing Overheads</h2>
            <p>
                Static sites use significantly less server computing than most
                other websites due to how they are generated. Rather than
                relying on servers to generate pages dynamically, Gatsby
                pre-renders all of them on build and use CDNs for a blazing fast
                and smooth experience for users all around the globe. This means
                lower server costs combined with faster pages speeds.
            </p>
            <h2>Increased Security</h2>
            <p>
                If there is a security fault on a website, it can open up
                potential legal issues. Especially with the continual pressure
                from GDPR and users understanding of correct data usage.
            </p>
            <p>
                As Gatsby websites are static files, there is no database that
                can be hacked or accessed. User data is not stored on the
                website. CMSs and APIs have vunerablities which can be
                exploited, Gatsby only has the data that it is showing to all
                users. The safest possible scenario!
            </p>
            <h2>App-like Experience</h2>
            <p>
                With the performance boost and features that increase the
                smoothness of the user experience, Gatsby aims at a full
                app-like experience similar to full PWAs.There are no reloads
                between pages and the website appears smooth and quick due to
                lazy-loading images and code-splitting.
            </p>
            <h2>Best-of-Breed Solutions</h2>
            <p>
                Using multiple micro-services (providers such as WordPress,
                Segment, Stripe) rather than one monolithic system (Magento)
                allows a fully customisable system. They fall into place easily,
                and the system can be improved and updated without damaging the
                whole site.
            </p>
            <p>
                This agile approach allows the business to scale as needed
                rather than being tied into a single solution.
            </p>
            <h2>Interested in Learning More?</h2>
            <p>
                If you are interested in having your site built with Gatsby JS,{' '}
                <Link to="/#contact">contact me</Link> with your preferred
                platform. I am happy to answer any question about the above, and
                how I can help.
            </p>
        </Container>
    </Layout>
)

export default IndexPage
