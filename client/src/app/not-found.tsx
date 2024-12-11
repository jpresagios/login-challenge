// app/not-found.js
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <h2 className="text-xl text-gray-700 mt-2">Page Not Found</h2>
        <p className="text-gray-500 mt-4">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
