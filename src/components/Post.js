import React,{useEffect, useState} from 'react'
import "./post.css"
import Modal from "react-modal/lib/components/Modal";
import axios from 'axios';
import ViewPost from "./ViewPost"

Modal.setAppElement("#root");
export default function Post({value}) {
console.log(value.id)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [comments, setComments] = useState({});

  useEffect(() => {
    axios.post("http://localhost:9000/comments/"+value.id).then((res) => {
      setComments(res.data);
    })
 
  },[])


  return (
    <div>
    <div className="postWrapper" onClick={() => setModalIsOpen(true)}>
        <h1>{value.title}</h1>
        <p>{value.description}</p>
        <hr/>
        <span>{comments.count === "1" ? comments.count + " comment" : comments.count+" comments" }</span>
        </div>
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style = {
        {
          content: {
            position: 'absolute',
            top: '40px',
            left: '40px',
            right: '40px',
            bottom: '40px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
          }
        }
      }>
        <ViewPost comments = {comments} postInfo = {value}/>
      </Modal>
      </div>
  )
}
