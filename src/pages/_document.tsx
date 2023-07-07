import { Head, Html, Main, NextScript } from 'next/document'

const Document = ({ children }) => (
  <Html lang="pt" data-theme="light">
    <Head>
      <meta charSet="utf-8" />
    </Head>
    <body>
      <Main>{children}</Main>
      <NextScript />
    </body>
  </Html>
)

export default Document
