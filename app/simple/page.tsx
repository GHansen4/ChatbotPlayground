import Link from "next/link";

export default function SimplePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            AI Model Comparison Tool - Simple Version
          </h1>
          <p className="text-gray-600 mt-1">
            This is a simplified version to test Vercel deployment
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Deployment Test</h2>
          <p className="text-gray-600 mb-4">
            If you can see this page, the basic Next.js App Router is working on Vercel.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900">Panel A (OpenAI)</h3>
              <p className="text-blue-700 text-sm">Ready for AI comparison</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900">Panel B (Anthropic)</h3>
              <p className="text-green-700 text-sm">Ready for AI comparison</p>
            </div>
          </div>
          <div className="mt-6">
            <Link 
              href="/"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Go to Full App
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
