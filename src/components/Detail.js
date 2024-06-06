import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Detail.css';

function Detail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const imageRefs = useRef([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPost(storedPosts[id]);
  }, [id]);

  const handleImageClick = (index) => {
    const newHref = prompt('Enter new image URL');
    if (newHref) {
      const updatedPost = { ...post };
      updatedPost.images[index] = newHref;
      setPost(updatedPost);

      const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
      storedPosts[id] = updatedPost;
      localStorage.setItem('posts', JSON.stringify(storedPosts));
    }
  };

  return (
    post ? (
      <div className="detail-container">
        <h1 className="detail-title">{post.title}</h1>
        <p className="detail-content">{post.content}</p>
        <div>
          {post.images.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`Post Image ${idx}`}
              width="200"
              className="detail.image"
              ref={(el) => (imageRefs.current[idx] = el)}
              onClick={() => handleImageClick(idx)}
            />
          ))}
        </div>
        <Link to="/" className="detail-back-button">Back to Main</Link> 
      </div>
    ) : (
      <p className="detail-loading">Loading...</p>
    )
  );
}

export default Detail;
