import Navbar from "./navbar";

function Landing() {
  return (
    <div className="flex h-screen flex-col bg-gray-900 text-white">
      <Navbar />
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="w-1/2 p-8">
          <h1 className="mb-4 text-4xl font-bold">Welcome to CHATTTYY</h1>
          <p className="text-gray-400">
            Connect with friends and chat in real-time. Join the conversation!
          </p>
        </div>
        </div>
      </div>
  );
}

export default Landing;
