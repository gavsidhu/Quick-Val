import Head from 'next/head'
import Footer from './Footer'

const Layout = ({ children }) => {
    return ( 
        <>
            <Head>
                <title>Rance – Free Landing page for e-commerce product</title>
                <link rel="icon" href="../favicon.ico" />
            </Head>
            <main>{children}</main>
            <Footer />
        </>
     );
}
 
export default Layout;