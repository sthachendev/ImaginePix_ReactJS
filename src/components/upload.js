import React, { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import ModalImage from 'react-modal-image';
import { firebase } from '../firebase/firebase';
import 'firebase/storage';
import 'bootstrap/dist/css/bootstrap.min.css';

function ImageUploader() {
  const [images, setImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const descriptionRef = useRef(null); // add a ref to the textarea

  const onDrop = acceptedFiles => {
    const newImages = [...images, ...acceptedFiles];
    // Limit the number of images to 20
    if (acceptedFiles.length + images.length > 20) {
      alert('You can only upload a maximum of 20 images');
      return;
    }
    setImages(newImages.slice(0, 20));
  };

  const handleUpload = async () => {
    // Initialize Firebase Storage and Firestore
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const db = firebase.firestore();
  
    try {
      // Create a new post document in the "posts" collection
      const postRef = db.collection('/posts').doc();
      const postId = postRef.id;
      const postDate = new Date();
      const postLikes = 0;
  
      // Upload each image and add the image URL to an array
      const imageUrls = [];
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const imageRef = storageRef.child(`posts/${postId}/${file.name}`);
        const snapshot = await imageRef.put(file);
        const imageUrl = await snapshot.ref.getDownloadURL();
        imageUrls.push(imageUrl);
      }
  
      // Create a new post object with the data
      const post = {
        id: postId,
        date: postDate,
        likes: postLikes,
        description: descriptionRef.current.value,
        imageUrls: imageUrls,
        privacy: selectedPrivacy,
        collection: selectedCollection,
        comments:{},
        postByUid: firebase.auth().currentUser.uid,
        postByDisplayName: firebase.auth().currentUser.displayName,
        photoURL: firebase.auth().currentUser.photoURL
      };
  
      // Add the post object to the "posts" collection
      await postRef.set(post);
  
      // Clear the images state and set upload status
      setImages([]);
      setUploadStatus('Upload successful!');
    } catch (error) {
      console.error(error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };
  
  
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const [selectedPrivacy, setSelectedPrivacy] = useState('Public');
  const [selectedCollection, setSelectedCollection] = useState('Public');

  const handlePrivacySelect = (eventKey, event) => {
  setSelectedPrivacy(event.target.textContent);
};

const handleCollectionSelect = (eventKey, event) => {
  setSelectedCollection(event.target.textContent);
};

const [canUpload, setCanUpload] = useState(false); // add a state for button status

// add useEffect to update button status
useEffect(() => {
  if (images.length > 0) {
    setCanUpload(true);
  } else {
    setCanUpload(false);
  }
}, [descriptionRef, images]);

return (
  <div>
    {/* this is the post desc */}
    <div className='w-100' style={{height:'25vh'}}>
    <textarea className='form-control h-100 w-100 border-0' placeholder='What is your picture about?' ref={descriptionRef} />
    </div>

    <div className='w-100 h-100 border mt-3 mb-3 p-3 rounded'>

    <div {...getRootProps()}
      className='w-100 btn btn-outline-secondary border-0'
      style={{
        cursor: 'pointer',
        borderRadius: '10px', height:'25vh'}}>
      
      <input {...getInputProps()}/>
      <p className='text-center pt-3'>
        Drag & Drop or Click
      </p>

    </div>

    </div>
    

    <div className='d-flex justify-content-around'>
    <select className='form-control w-25' onSelect={handlePrivacySelect}>
    <option selected disabled>Privacy</option>
    <option>Public</option>
    <option>Circle</option>
    <option>Follower</option>
    <option>Only Me</option>
    </select>

    <select className='form-control w-25' onSelect={handleCollectionSelect}>
    <option selected disabled>Collection</option>
    <option>Public</option>
    </select>

    {canUpload?<button className='btn btn-sm btn-outline-primary' 
    onClick={handleUpload}>Upload</button>
    :<button className='btn btn-sm btn-outline-secondary' 
    onClick={handleUpload} disabled>Upload</button>}

    </div>

    <div 
    className='d-flex justify-space-evenly border mt-3 flex-wrap rounded'>
      {images.map((image, index) => (
        <div
          key={image.name}
          className='w-25 p-2'>
          <ModalImage
            small={URL.createObjectURL(image)}
            large={URL.createObjectURL(image)}
            alt={image.name}
            className='w-100 h-auto rounded border border-danger'
            style={{ cursor: 'pointer' }}
          />
        </div>
      ))}
    </div>

    {uploadStatus && <p>{uploadStatus}</p>}

  </div>
);
}

export default ImageUploader;
