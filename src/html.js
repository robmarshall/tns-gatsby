import React from 'react'

export default function HTML(props) {
    const {
        body,
        htmlAttributes,
        headComponents,
        bodyAttributes,
        preBodyComponents,
        postBodyComponents,
    } = props

    return (
        // eslint-disable-next-line
        <html {...htmlAttributes}>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta
                    name="purpleads-verification"
                    content="8b695f33439a94b70ff8a463"
                />
                {headComponents}
            </head>
            <body
                // eslint-disable-next-line
                {...bodyAttributes}
            >
                {preBodyComponents}
                <noscript key="noscript" id="gatsby-noscript">
                    This app works best with JavaScript enabled.
                </noscript>
                <div
                    key="body"
                    id="___gatsby"
                    // eslint-disable-next-line
                    dangerouslySetInnerHTML={{ __html: body }}
                />
                {postBodyComponents}
                <script
                    async
                    src="https://cdn.purpleads.io/load.js?publisherId=1abdb8d096ea9fdab6647ddcf48d8375:0e55c392b103921a94bdf30892db340181915261edc20d61cf81a6ebf5938d975e7e25e031008cfe33e53c08e5113b37c5d287f71f6f81fef6b90ba5905ba056"
                    id="purpleads-client"
                ></script>
                <script
                    async
                    src="https://arc.io/widget.js?WrxccT2crAmKvqcpei9Qkw"
                />
            </body>
        </html>
    )
}
