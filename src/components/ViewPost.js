import axios from "axios";
import React, { useState } from "react";
import ViewComments from "./ViewComments";

export default function (props) {
  const [newComment, setnewComment] = useState({
    comment: "",
    postId: props.postInfo.id,
  });
  const [comments, setComments] = useState(props.comments.comments)
  const [commentCount, setCommentCount] = useState(parseInt(props.comments.count))

  function handle(e) {
    const newData = { ...newComment };
    newData[e.target.id] = e.target.value;
    setnewComment(newData);
    console.log(newData);
  }

  function submit(e) {
    e.preventDefault();
    axios.post("http://localhost:9000/comments",{
      comment: newComment.comment,
      postId: props.postInfo.id
    }).then(res => {
        setComments([newComment,...comments])
        setCommentCount(commentCount+1);
      clearForm();
    })
  }
  function clearForm() {
    setnewComment({
      comment: ""
    })
  }

  return (
    <div>
      <div className="postWrapper">
        <h1>{props.postInfo.title}</h1>
        <p>{props.postInfo.description}</p>
        <hr />
        <span>
          {commentCount === 1
            ? commentCount + " comment"
            : commentCount + " comments"}
        </span>
      </div>
      <div>
        <form onSubmit={(e) => submit(e)}>
          <input
            onChange={(e) => handle(e)}
            type="text"
            value={newComment.comment}
            id="comment"
            placeholder="Type a comment..."
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
      {comments.map((item) => (
        <ViewComments key={item.id} comment={item.comment} />
      ))}
    </div>
  );
}
