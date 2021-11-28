import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Container } from "../Styles/CommentsUpdateStyle";

function CommentUpdate() {
  let id = useParams();
  let history = useHistory();
  const [value, setValue] = useState("");
  const [catid, setCatID] = useState("");

  // handle function to return user to cat page
  const catPage = () => {
    history.push(`/cats/${catid}`);
  };

  // handle function for updating comment
  const updateComment = async () => {
    await axios
      .put(`/api/comments/${id.id}`, {
        text: value,
      })
      .then((res) => {
        window.alert(`Comment updated!`);
      });
    history.push(`/cats/${catid}`);
  };

  // useeffect to get the comment data
  useEffect(() => {
    async function getCommentData() {
      await axios.get(`/api/comments/${id.id}`).then((comment) => {
        setValue(comment.data.data.text);
        setCatID(comment.data.data.cat_id);
      });
    }
    getCommentData();
  }, []);

  return (
    <>
      <div>
        <Container>
          <h3>Edit Comment</h3>
          <MDEditor value={value} onChange={setValue} />
        </Container>
      </div>
      <Button onClick={() => updateComment()}>Update</Button>
      <Button onClick={() => catPage()}>Back</Button>
    </>
  );
}

export default CommentUpdate;
