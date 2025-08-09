import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { useState, useEffect } from "react";
import { enhancedImageAPI } from "../utils/enhanceImageApi";

const Home = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  const handleImageUpload = async (file) => {
    const localURL = URL.createObjectURL(file);
    setUploadedImage(localURL);
    setLoading(true);
    try {
      const enhancedURL = await enhancedImageAPI(file);
      setEnhancedImage(enhancedURL);
    } catch (error) {
      console.error(error);
      alert("Errors while enhancing the image. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ImageUpload UploadImageHandler={handleImageUpload} />
      
      <ImagePreview
        loading={loading}
        uploaded={uploadedImage}
        enhanced={typeof enhancedImage === "string" ? enhancedImage : enhancedImage?.image}
      />

      {/* ✅ Add Download Button Here */}
      {enhancedImage && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <a
            href={typeof enhancedImage === "string" ? enhancedImage : enhancedImage.image}
            download="enhanced-image.png"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}>
              Download Enhanced Image
            </button>
          </a>
        </div>
      )}
    </>
  );
};

export default Home;

      