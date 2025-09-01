export default function TestCSS() {
  return (
    <div className="min-h-screen bg-red-500 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">CSS Test Page</h1>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">Colors Test</h2>
            <div className="space-y-2">
              <div className="w-16 h-8 bg-blue-500 rounded"></div>
              <div className="w-16 h-8 bg-green-500 rounded"></div>
              <div className="w-16 h-8 bg-gray-500 rounded"></div>
              <div className="w-16 h-8 bg-amber-500 rounded"></div>
            </div>
          </div>
          
          <div className="bg-green-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold text-green-900 mb-2">Icons Test</h2>
            <div className="flex space-x-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Typography Test</h2>
          <p className="text-sm text-gray-600 mb-2">Small text</p>
          <p className="text-base text-gray-700 mb-2">Base text</p>
          <p className="text-lg text-gray-800 mb-2">Large text</p>
          <p className="text-xl font-medium text-gray-900">Extra large text</p>
        </div>
        
        <div className="flex items-center justify-between">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
            Primary Button
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors">
            Secondary Button
          </button>
        </div>
        
        <div className="mt-6 p-4 border-l-4 border-amber-500 bg-amber-50">
          <p className="text-amber-800">
            If you can see this styled correctly with colored backgrounds, proper typography, 
            and correctly sized icons, then TailwindCSS is working properly.
          </p>
        </div>
      </div>
    </div>
  );
}
