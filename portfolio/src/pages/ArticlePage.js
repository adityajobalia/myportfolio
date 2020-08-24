import React, {useState, useEffect} from "react";
import articleContent from './Article-content';
import ArticleList from '../components/ArticleList';
import NotFound from "./NotFound";
import Comments from "../components/Comment";
import Upvote from '../components/Upvote';
import AddComment from '../components/AddComment'

const ArticlePage = ({ match }) => {
    const name = match.params.name;
    const article = articleContent.find(article => article.name === name);
    const [articleInfo, setArticleInfo] = useState({upvote:0, comments : []});

    useEffect(()=>{
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            setArticleInfo(body);
        }
        fetchData();
    },[name]);

if (!article) return <NotFound/>

    const otherArticles = articleContent.filter(article => article.name !== name);

    return (
        <>
            <h1>{article.title}</h1>
            <Upvote articleName = {name} upvote = {articleInfo.upvote} setArticleInfo = {setArticleInfo}/>
            {article.content.map((paragraph, key) => (
                <p key={key}>{paragraph}</p>
            ))}
            <p>{article.content}</p>
            <Comments comments={articleInfo.comments}/>
            <AddComment articleName = {name} setArticleInfo = {setArticleInfo}/>
            <h3>Other related articles:</h3>
            <ArticleList articles={otherArticles}/>
        </>
    );
}
export default ArticlePage;