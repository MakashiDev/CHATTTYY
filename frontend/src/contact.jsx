import Navbar from "./navbar";

function Contact() {
  return (
    <div className="flex h-screen flex-col bg-gray-900 text-white">
      <Navbar />
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="w-1/2 p-8">
          <h1 className="mb-4 text-4xl font-bold">Welcome to CHATTTYY</h1>
          <p className="text-gray-400 text-1xl">
            Contact Us On:
          </p>
          <button className="text-gray-400 text-1xl underline decoration-sky-500"><a href="https://github.com/MakashiDev/chat" target="_blank">Github</a></button>
        </div>
        </div>
      </div>
  );
}

export default Contact;
