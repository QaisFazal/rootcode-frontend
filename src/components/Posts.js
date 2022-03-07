import React, { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import Post from "./Post";

export default function Posts() {
  const { state, loading } = useContext(ApiContext);
  let content = null;
  if (loading) {
    content = <div>Loading....</div>;
  } else {
    content = (
      <div>
        {state.map((res) => (
          <Post key={res.id} value={res} />
        ))}
      </div>
    );
  }

  return <div>{content}</div>;
}
