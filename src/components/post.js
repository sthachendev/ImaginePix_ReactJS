import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import {firebase} from '../firebase/firebase';
import 'firebase/auth';

export default function Post({ post }) {

  //current users
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe;
  }, []);

  //images and other details
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    // preload all images in the post
    const preloadImages = async () => {
      const urls = await Promise.all(post.imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(url);
          img.onerror = () => reject(url);
          img.src = url;
        });
      }));
      setImageUrls(urls);
    }
    preloadImages();
  }, [post.imageUrls]);

  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
  };
  const handlePrevious = () =>
    setCurrentIndex((currentIndex - 1 + post.imageUrls.length) % post.imageUrls.length);
  const handleNext = () =>
    setCurrentIndex((currentIndex + 1) % post.imageUrls.length);

    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };

    const handleAddComment = (event) => {
      event.preventDefault();
      
      // add comment to Firestore
      firebase.firestore().collection('comments').add({
        postId: post.id,
        userId: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        text: comment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    }

    const [comments, setComments] = useState([]);
    const [postID, setPostID] = useState([]);
    //comments
    const commentCollection = firebase.firestore().collection('comments');

    useEffect(() => {
      commentCollection
        .onSnapshot(
          querySnapshot => {
          const itemArray = []
          querySnapshot.forEach((doc) => {
            const {displayName, photoURL, postId, text, timestamp, userId} = doc.data()
              itemArray.push({
                id:doc.id,
                displayName, photoURL, postId, text, timestamp, userId
              })
          })
          setComments(itemArray);
        });
    }, [postID]);

    console.log(comments)

    const getTimeAgo = (timestamp) => {
      const now = new Date();
      const seconds = Math.floor((now - timestamp) / 1000);
    
      if (seconds < 60) {
        return `${seconds} seconds ago`;
      }
    
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) {
        return `${minutes} minutes ago`;
      }
    
      const hours = Math.floor(minutes / 60);
      if (hours < 24) {
        return `${hours} hours ago`;
      }
    
      const days = Math.floor(hours / 24);
      if (days === 1) {
        return `1 day ago`;
      }
    
      return `${days} days ago`;
    };
    

  return (
    <div className='m-2 border rounded' style={{breakInside:'avoid', objectFit:'contain', position: 'relative'}}> 
      <div className=''>
        <img
          src={post.imageUrls[0]}
          alt=""
          className='w-100 rounded'
          onClick={handleShow}
        />
      </div>
      {/* displays number of images */}
      {post.imageUrls.length > 1 && (
        <div style={{position: 'absolute', bottom: '10px', left: '10px'}}>
          <div className='btn btn-sm btn-light ' onClick={handleShow}>
            +{post.imageUrls.length - 1}
          </div>
        </div>
      )}
      
    <Modal show={showModal} onHide={handleClose} className='modal-xl'>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body style={{ height: "calc(100vh - 100px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <img
            key={imageUrls[currentIndex]}
            src={imageUrls[currentIndex]}
            alt=''
            className='w-100'
            style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '50%' }}
          />
          {post.imageUrls.length > 1 && (
            <div>
              <Button variant="secondary" onClick={handlePrevious} style={{ position: "absolute", top: "50%", left: "0" }}>
                {"<"}
              </Button>
              <Button variant="secondary" onClick={handleNext} style={{ position: "absolute", top: "50%", right: "50%" }}>
                {">"}
              </Button>
            </div>
          )}
        </div>

        <div className='border border-warning' style={{ position: "absolute", top: 0, right: 0, width: "50%", padding: "10px", maxHeight: "515px", overflowY: "scroll"}}>
          <div className='d-flex'>
          <img src={post.photoURL} width='40px' height='40px' className='border rounded bg-primary'/>
          <p className='ms-2'>{post.postByDisplayName}</p>
          <p className='mt-2 position-absolute end-0 me-3 text-secondary'>
            {post.date.toDate().toLocaleString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true }).toUpperCase()} 
            {post.date.toDate().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          </div>

          <p className='border p-1 mt-1'>{post.description}</p>
            {/* comment section */}
          <div className='d-flex '>
          {/* <img src={currentUser.photoURL} width='30px' height='30px' className='border rounded-circle bg-primary'/> */}
           <input className=' form-control ms-2 me-2 w-100 border-0' 
           value={comment} onChange={handleCommentChange}
           placeholder='Write a comment here'></input>
           <span onClick={handleAddComment} className='btn btn-sm btn-outline-secondary h-100'>Send</span>
          </div>

          <div className='border border-danger mt-3'>
          {comments
            .filter(comment => comment.postId === post.id)
            .sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate()) // sort in reverse chronological order
            .map(comment => (
              <div key={comment.id} className='border p-2'>
                <span className='d-flex'>
                  <img src={post.photoURL} width='30px' height='30px' className='border rounded-circle bg-primary'/>
                  <span className='mt-1 ms-2 text-secondary'>{comment.displayName}</span>
                  <p className='mt-2 position-absolute end-0 me-3 text-secondary'>
                    {comment.timestamp && getTimeAgo(comment.timestamp.toDate())}
                  </p>
                </span>
                <p>: {comment.text}</p>
              </div>
            ))
          }

        </div>

        </div>
        
      </Modal.Body>
    </Modal>

    </div>
  );
}
