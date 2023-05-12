import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import Main from "@/components/home/Main";
import Head from "next/head";

export default function Home() {
  return (
    <div className='text-black'>
      <Head>
        <title>Quick Val</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
