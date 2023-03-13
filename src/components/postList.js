import React, { useEffect, useState } from 'react';
import { firebase } from '../firebase/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './post';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection('posts').onSnapshot((snapshot) => {
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(newPosts);
    });
    return () => unsubscribe();
  }, []);

  return (
  // container for posts
  <div style={{width:'1200', margin:'0px auto', columns:'4', columnGap:'5px'}}>
    {posts.map((post) => (
        <Post post={post} />
    ))}
  </div>
  );
}

export default PostList;
