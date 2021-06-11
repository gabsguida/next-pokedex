import Head from 'next/head';

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Pokedex Inspiring</title>
        <meta name="description" content="Pokedex Inspiring" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="fixed w-full top-0 z-10 bg-white">
        <div className="flex items-center justify-center h-20 px-3 shadow-3xl">
          <h1 className="text-2xl font-bold text-red-400">Pokedex Inspiring</h1>
        </div>
      </header>

      <main className="w-full pt-24 px-5 pb-5">{children}</main>
    </div>
  );
}

export default Layout;