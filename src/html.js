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
                    src="https://arc.io/widget.js?WrxccT2crAmKvqcpei9Qkw"
                />
            </body>
        </html>
    )
}
