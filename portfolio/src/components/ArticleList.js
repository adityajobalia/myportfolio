import React from 'react';
import {Link} from 'react-router-dom';

const ArticleList = ({articles}) => (
    <>
        {articles.map((articleObj,key) => (
            <Link className="article-list-item" key={key} to={`/articles/${articleObj.name}`}>
                <h4>{articleObj.title}</h4>
                <p>{articleObj.content[0].substring(0,150)}...</p>
            </Link>
        ))}
    </>
);

export default ArticleList;