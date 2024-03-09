
import { useState } from 'react'
import './App.css'
import axios from 'axios';
function App() {
  const [image,setImage]=useState({
    image:""
  })
  const handleChange=(e)=>{
    // setImage(e.target.files[0])
      console.log(e.target.files)
      const {name,files}=e.target
      setImage({
        ...image,
        [name]:files[0]
      })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()

    // const formData = new FormData()
    // formData.append('image', image);
   const data= await axios.post('http://localhost:3000/upload_file',image,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
    
    }) .then(response => {
      console.log(response); // handle response data
    })
    .catch(error => {
      console.error('Error:', error.response.data);
    });
    console.log(data)
  }

  
  return (
    <>
      <title>File Upload htmlForm</title>
        <body>
        <div className="container">
            <form  onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="htmlForm-group">
                    <label htmlFor="file">Choose File:</label>
                    <input onChange={handleChange} type="file" id="image" name="image" />
                </div>
                <button type='submit' className="btn-submit">Upload</button>
            </form>
        </div>
        </body>
    </>
  )
}

export default App
