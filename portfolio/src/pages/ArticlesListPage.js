import React from "react";
import articlecontent from './Article-content';
import ArticleList from '../components/ArticleList';

const ArticlesListPage = () => (
   <>
    <h1>Articles List page</h1>
    <ArticleList articles={articlecontent}/>
   </>
);

export default ArticlesListPage;