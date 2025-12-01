import Link from 'next/link';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ globalData }) {
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
          <div className="flex gap-10 items-center justify-between">
              <div className="w-1/2 ">
                  <video
                      autoPlay
                      loop
                      muted
                      className="w-full rounded-lg"
                  >
                      <source src="/images/colors-of-life.mp4" type="video/mp4"/>
                      Your browser does not support the video tag.
                  </video>
              </div>

              <div className="w-1/2 top-0">
                  <h1 className="mb-8 text-4xl font-bold lg:text-6xl">
                      {globalData.name}
                  </h1>
                  <p className="mb-12 text-xl text-gray-600 dark:text-gray-400">
                      <Link href="https://www.discogs.com/artist/208193-Don-Tinsley?superFilter=Credits">
                          {globalData.blogTitle}
                      </Link>
                  </p>
              </div>
          </div>
      </main>
      <Footer copyrightText={globalData.footerText} />
      {/*<GradientBackground*/}
      {/*  variant="large"*/}
      {/*  className="fixed top-20 opacity-40 dark:opacity-60"*/}
      {/*/>*/}
      {/*<GradientBackground*/}
      {/*  variant="small"*/}
      {/*  className="absolute bottom-0 opacity-20 dark:opacity-10"*/}
      {/*/>*/}
    </Layout>
  );
}

export function getStaticProps() {
  const globalData = getGlobalData();

  return { props: { globalData } };
}
