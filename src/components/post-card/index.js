import { Link } from 'gatsby';
import React from 'react';

import './style.scss';

const PostCard = ({ post }) => {
  const { id, slug, title, excerpt, date, categories } = post;
  return (
    <div className="post-card-wrapper">
      <Link className="post-card" key={id} to={slug}>
        <div className="categories">
          {categories.map((category) => (
            <span className="category" key={category} to={`/posts/${category}`}>
              {category}
            </span>
          ))}
        </div>
        <div className="title">{title}</div>
        <p className="description" dangerouslySetInnerHTML={{ __html: excerpt }} />
        <div className="info">
          <div className="date">{date}</div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
