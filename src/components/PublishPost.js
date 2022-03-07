import axios from "axios";
import React, { useState, useContext } from "react";
import Modal from "react-modal/lib/components/Modal";
import "./publishpost.css";
import { ApiContext } from "../context/ApiContext";

Modal.setAppElement("#root");
export default function PublishPost({ value }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [post, setPost] = useState({
    title: "",
    description: "",
  });
  const { setState, state, loading } = useContext(ApiContext);
  function handle(e) {
    const newData = { ...post };
    newData[e.target.id] = e.target.value;
    setPost(newData);
    console.log(newData);
  }

  function submit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:9000/posts", {
        title: post.title,
        description: post.description,
      })
      .then((res) => {
        setState([
          { title: post.title, description: post.description },
          ...state,
        ]);
        console.log(res.data);
        clearForm();
        setModalIsOpen(false);
      });
  }

  function clearForm() {
    setPost({
      title: "",
      description: "",
    });
  }

  return (
    <div>
      <button className="createButton" onClick={() => setModalIsOpen(true)}>
        Create a new post
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            position: "absolute",
            width: "20%",
            height: "50%",
            left: "50%",
            right: "50%",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
        <h2>Create Post</h2>
        <div>
          <form onSubmit={(e) => submit(e)}>
            <input
              onChange={(e) => handle(e)}
              type="text"
              value={post.title}
              id="title"
              placeholder="Title"
            />
            <input
              onChange={(e) => handle(e)}
              type="text"
              value={post.description}
              id="description"
              placeholder="Description"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div>
          <button
            className="close"
            onClick={() => {
              setModalIsOpen(false);
              clearForm();
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
