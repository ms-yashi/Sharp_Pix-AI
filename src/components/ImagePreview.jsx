import Loading from "./Loading";
import React from 'react';

const ImagePreview = (props) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-2xl max-w-6xl">
      
      {/* Original Image */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2">
          Original Image
        </h2>

        {props.uploaded ? (
          <img 
            src={props.uploaded} 
            alt="Original" 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="flex items-center justify-center h-80 bg-gray-200">
            No Image Selected 
          </div>
        )}
      </div>

      {/* Enhanced Image */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <h2 className="text-xl font-semibold text-center bg-blue-800 text-white py-2">
          Enhanced Image
        </h2>

        {/* If loading, show spinner */}
        {props.loading ? (
          <Loading />
        ) : props.enhanced ? (
          <>
            {/* Show enhanced image */}
            <img 
              src={props.enhanced} 
              alt="Enhanced" 
              className="w-full h-full object-cover" 
            />

            {/* Download Button */}
            <div className="flex justify-center my-4">
              <button
                onClick={async () => {
                  try {
                    const response = await fetch(props.enhanced, { mode: 'cors' });
                    const blob = await response.blob();
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = 'enhanced-image.png';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                  } catch (err) {
                    console.error("Download failed", err);
                    alert("Failed to download image. Please try again.");
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow"
              >
                Download Enhanced Image
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-80 bg-gray-200">
            No Enhanced Image
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;

