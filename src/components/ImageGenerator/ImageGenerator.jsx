import { useState, useEffect } from 'react';
import OpenAI from 'openai'; // Updated import
import '../ImageGenerator/ImageGenerator.css';
import default_image from '../assets/Default_Create_a_dream_sequence_where_Maya_who_is_wearing_a_fl_0.jpg'; // Corrected path
import HashLoader from 'react-spinners/HashLoader'
function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState("");
  const [showDefaultImage, setshowDefaultImage] = useState(true); // Added state for loading
  const [loading,setLoading] = useState(false)
//    useEffect(()=>{
//     setLoading(true)

//    },[setshowDefaultImage])

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_SECRET_KEY,
    dangerouslyAllowBrowser: true
  });

  const generateImage = async () => {
    setshowDefaultImage(false); // Set loading state to true
    
        setLoading(true);
    

    try {
        const response = await openai.images.generate({
          prompt,
          n: 1,
          size: "1024x1024",
          quality:'hd',
          style:"vivid",
          model:"dall-e-3"
        });
        if (response.data /*&& response.data.data*/) {
          const imageData = response.data[0].url;
          console.log(imageData)
          if(imageData != null)
          {
            
            setGeneratedImage(imageData);
            //setLoading(false)
          }
          
        } else {
            console.log("Printing - response.data[0].url")
            console.log(response.data[0].url)
            const imageData = response.data[0].url;
          setGeneratedImage(imageData);
          console.error('Invalid response structure:', response);
          // Handle the error appropriately, such as notifying the user
        }
      } catch (error) {
        console.error('Error generating image:', error);
        // Provide user feedback or retry options
        }
        finally {
          setLoading(false)
        }
  };

  return (
    
    <div className="ai-image-generator">
      <div className="header">
        AI Image <span>Generator</span>
        <div className="img-loading">
          <div className="image">
          {loading ? (<HashLoader color='#AA336A' loading={loading}  size={100}/>) : 
             (<img
              src={generatedImage} // Display default image while loading
              alt=""
            />)}
            <img src={showDefaultImage ? default_image : ""} alt=''></img>
           
           
          </div>
        </div>
      </div>
      <div className="search-box">
        <textarea
          type="text"
          className="search-input"
          placeholder="Describe the image you want to generate. Be creative!"
          value={prompt} // Use controlled component for prompt
          onChange={(e) => setPrompt(e.target.value)}
        />
        <div className="generate-btn" onClick={() => generateImage()}>
          Generate
        </div>
      </div>
      {/* {generatedImage && ( // Conditionally render generated image
        <img src={generatedImage} alt="Generated Image" />
      )} */}
    </div>
  );
}

export default ImageGenerator;
