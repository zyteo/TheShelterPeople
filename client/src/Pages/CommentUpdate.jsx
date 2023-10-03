import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../Styles/CommentsUpdateStyle";

function CommentUpdate({ auth }) {
  let params = useParams();
  let navigate = useNavigate();
  const [value, setValue] = useState("");

  // handle function to return user to cat page
  const catPage = () => {
    navigate(-1);
  };

  // handle function for updating comment
  const updateComment = async () => {
    if (auth === "Auth") {
      await axios
        .put(`https://the-shelter-people-be.vercel.app/api/comments/${params.id}`, {
          comment: value,
        })
        .then((res) => {
          window.alert(`Comment updated!`);
        })
        .catch((err) => {
          console.log(err);
          alert("Comment not found!");
          navigate("/cats/adoptables");
        });
      navigate(-1);
    } else {
      window.alert(`Sorry, you cannot update comments!`);
      navigate(`/cats/adoptables`);
    }
  };

  // useeffect to get the comment data
  useEffect(() => {
    async function getCommentData() {
      await axios
        .get(`https://the-shelter-people-be.vercel.app/api/comments/${params.id}`)
        .then((comment) => {
          setValue(comment.data.data.comment);
        })
        .catch((err) => {
          console.log(err);
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
