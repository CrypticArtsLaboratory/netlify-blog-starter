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
        <div className="text-center py-20">
          <h1 className="mb-8 text-4xl font-bold lg:text-6xl">
            Welcome to {globalData.name}
          </h1>
          <p className="mb-12 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {globalData.blogTitle}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/blog"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-gradient-3 to-gradient-4 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              View Blog
            </Link>
          </div>
        </div>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const globalData = getGlobalData();

  return { props: { globalData } };
}
