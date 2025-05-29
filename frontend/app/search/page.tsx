import Link from 'next/link';

export default function SearchPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 sm:p-16 bg-gray-50 text-gray-800">
      <header className="w-full max-w-4xl mb-12 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Explore Discussions</h1>
        <p className="text-xl text-gray-600">
          Search and discover insights from Bahtsul Masail.
        </p>
      </header>

      <section className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg mb-8">
        <div className="mb-6">
          <input 
            type="search" 
            placeholder="Enter keywords, topics, or questions..." 
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-150 ease-in-out"
          />
        </div>
        <div className="text-center">
          <button 
            type="button" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Search
          </button>
        </div>
      </section>

      {/* Placeholder for search results */}
      <section className="w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Results</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Search results will appear here.</p>
          {/* Example of a result item - to be dynamic later */}
          {/* <div className="mt-4 p-4 border border-gray-200 rounded-md"> */}
          {/*   <h3 className="text-xl font-semibold text-blue-700">Example Result Title</h3> */}
          {/*   <p className="text-gray-600 mt-1">This is a brief summary of the search result...</p> */}
          {/*   <Link href="/document/123" legacyBehavior><a className="text-blue-500 hover:underline mt-2 inline-block">Read more</a></Link> */}
          {/* </div> */}
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link href="/" legacyBehavior>
          <a className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition duration-300">
            &larr; Back to Home
          </a>
        </Link>
      </div>
       <footer className="mt-16 pt-8 border-t border-gray-300 w-full max-w-4xl text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} BahtsulMasail.tech - Seek and You Shall Find.
      </footer>
    </main>
  );
} 