export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#141414] text-white font-space-grotesk">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <a
          href="/"
          className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
        >
          Go Home
        </a>
      </div>
    </div>
  );
} 