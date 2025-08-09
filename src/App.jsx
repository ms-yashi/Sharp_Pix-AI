import Home from "./components/Home";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-content-center min-h-screen bg-gray-100 py-20 px-78"> 
      <div className="text-center mb-8">
        <h1 className="text-1xl font-bold text-amber-950 mb-2">AI Image Enhancer </h1>
          <p className="text-lg text-purple-950">
          Upload your Image and let AI enhance to in seconds!
          </p>
       
      </div>
      <Home />
      <div className="text-2xl font-semibold text-gray-500 mt-6">
        Powered by @ARYSAI 
        </div>    
      </div>
  );
};

export default App;
