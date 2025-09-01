import Link from "next/link";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Test Page - Vercel Deployment Working ✅
        </h1>
        <p className="text-gray-600">
          If you can see this page, the App Router is working correctly.
        </p>
        <Link 
          href="/"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go to Main App
        </Link>
      </div>
    </div>
  );
}
