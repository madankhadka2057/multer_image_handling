import { useState } from 'react';
import axios from 'axios';
import "./App.css"
function App() {
  const [images, setImages] = useState([]); // State to hold the selected files

  const handleChange = (e) => {
    setImages(e.target.files); // Update state with the selected files
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!images || images.length === 0) {
      console.log('No files selected');
      return;
    }

   const formData = new FormData();
   for (let i = 0; i < images.length; i++) {
     formData.append('images', images[i]); // Append each file to FormData
     
    }
    console.log(images)
    console.log(...formData)

    try {
      const response = await axios.post('http://localhost:3000/upload_files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data); // Handle response data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="file">Choose Files:</label>
          <input onChange={handleChange} type="file" id="images" name="images" multiple />
        </div>
        <button type='submit' className="btn-submit">Upload</button>
      </form>
    </div>
  );
}

export default App;
