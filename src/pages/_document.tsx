import { Html} from "next/document";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

const Document = ({ children }) => (
  <Html lang="pt">

    <body className={inter.className}>
      {children}
    </body>
  </Html>
)

export default Document
