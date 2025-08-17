import '../styles/globals.css'
import Banner from '../components/Banner'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  return (
    <>
      {!isHomePage && <Banner />}
      <Component {...pageProps} />
    </>
  )
}
