import React from 'react';
import './NewsArticles.css';

function NewsArticle( {article} ) {
  return (
    <div className='news-card' >
        <div>
            <img className='news-img' src={article.urlToImage} alt={article.title} />
        </div>
        <div className="card-content">
          <h2> {article.title} </h2>
          <p className=''>{article.description}</p>
        </div>
        <a href={article.url} target="_blank">Read More</a>
    </div>
  )
}

export default NewsArticle