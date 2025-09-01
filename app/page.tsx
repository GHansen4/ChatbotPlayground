import ComparisonTool from "@/components/ComparisonTool";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            AI Model Comparison Tool
          </h1>
          <p className="text-gray-600 mt-1">
            Compare AI model responses side-by-side with customizable parameters
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <ComparisonTool />
      </main>
    </div>
  );
}
