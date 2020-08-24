import React from "react";

const Upvote = ({upvote,articleName,setArticleInfo }) => {
    const upvoteArticle = async () =>{
        const result = await fetch(`/api/articles/${articleName}/upvote`, {
            method:'post',
        });
        const body = await result.json();
        setArticleInfo(body);
    }
  return (
    <div id="upvotes-section">
      <button onClick={()=> upvoteArticle()}>Add Upvote</button>
      <p>This post has been upvoted {upvote} times</p>
    </div>
  );
};
export default Upvote;
