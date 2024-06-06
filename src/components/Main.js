import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

function Main() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([null, null, null]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  const handleAddPost = () => {
    const newPost = { title, content, images };
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setTitle('');
    setContent('');
    setImages([null, null, null]);
  };

  const handleImageChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImages = [...images];
      newImages[index] = reader.result;
      setImages(newImages);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="main-container">
      <h1 className="main-title">30살의 나에게 적는 편지</h1>
      <div className="post-form">
        <h2 className="form-title">새 글 작성</h2>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-textarea"
        />
        <div className="form-images">
          {images.map((image, idx) => (
            <input
              key={idx}
              type="file"
              onChange={(e) => handleImageChange(idx, e.target.files[0])}
              className="form-image-input"
            />
          ))}
        </div>
        <button onClick={handleAddPost} className="form-button">글 추가</button>
      </div>
      <div className="posts">
        <h2 className="posts-title">지난 글</h2>
        {posts.map((post, index) => (
          <div key={index} className="post">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <div className="post-images">
              {post.images.map((image, idx) => (
                <img key={idx} src={image} alt={`Post ${index} Image ${idx}`} className="post-image" />
              ))}
            </div>
            <Link to={`/post/${index}`} className="post-link">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
