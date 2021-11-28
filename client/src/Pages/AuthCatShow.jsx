import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import {
  Img,
  Button,
  Button2,
  ContentBox,
  Content1,
  Container,
} from "../Styles/AuthCatShowStyle";

function AuthCatShow({ userName, role }) {
  let id = useParams();
  let history = useHistory();
  // For the cat data
  const [cat, setCat] = useState();
  const [value, setValue] = useState("");
  // handle function to return user to cat list page
  const catListPage = () => {
    history.push(`/cats/list`);
  };
  // handle function for adding comment
  const handleComment = (event) => {
    event.preventDefault();
    let text = value;
    let cat_id = id.id;
    let user_id = userName;
    let username = userName;

    const payload = { text, cat_id, user_id, username };
    axios.post(`/api/cats/${id.id}/newcomment`, payload).then((res) => {
      // Get the comment id of the newly added comment
      let commentID = res.data.id;
      // Append the newly created comment into cat
      setCat({
        ...cat,
        comments: [
          ...cat.comments,
          { text: value, username: username, _id: commentID },
        ],
      });
      window.alert(`Comment added!`);
    });
    setValue("");
  };

  // handle function for updating comment
  const updateComment = async (id) => {
    history.push(`/comments/edit/${id}`);
  };

  // handle function for deleting comment from cat
  const deleteComment = (commentid) => {
    axios.delete(`/api/comments/${commentid}`);
    window.alert(`Comment deleted!`);
    // Potential brain drain: need to understand the structure of cat + comments
    // Each cat contains an array of comments, each comment is an object
    // This is the removed comment
    let removedComment = cat.comments.filter((comment) => {
      return comment._id === commentid;
    })[0];
    // Now need to get the comment out of the cat, without messing the other cat data values
    // use spread operator to keep the other cat data values, then set the comments to not include the removed comment
    setCat({
      ...cat,
      comments: cat.comments.filter((c) => c._id !== removedComment._id),
    });
  };

  // useeffect to get the cats data
  useEffect(() => {
    async function getCatData() {
      await axios.get(`/api/cats/${id.id}`).then((cat) => {
        setCat(cat.data.data);
      });
    }
    getCatData();
  }, []);

  return (
    <>
      <div>
        <ContentBox>
          <h1>{cat?.name}</h1>
          <Img src={cat?.image} alt={cat?.name} width="400px" height="400px" />
          <Content1>
            <h4>Description:</h4>
            <p> {cat?.description}</p>
            <h4>Gender:</h4>
            <p>{cat?.gender}</p>
            <h4>Adoptable:</h4>
            <p> {cat?.adoptable}</p>
            <h4>Cage:</h4>
            <p> {cat?.cage}</p>
          </Content1>
          <Button onClick={() => catListPage()}>Back</Button>
        </ContentBox>
      </div>
      <br />
      <div>
        {cat?.comments.length > 0 ? <h2>Comments</h2> : <></>}
        {cat?.comments?.map((element) => {
          return (
            <>
              <Container>
                <p key={element._id}>
                  <hr />
                  <MDEditor.Markdown
                    source={`**` + element.username + `** *commented:*`}
                  />
                  <MDEditor.Markdown source={element.text} />
                  {/* Only admin can update/delete all comments. Guest can only update/delete own comment */}
                  {role === "Admin" && (
                    <>
                      <br />
                      <Button2 onClick={() => updateComment(element._id)}>
                        &#9998; Edit
                      </Button2>
                      <Button2 onClick={() => deleteComment(element._id)}>
                        &#128465; Del
                      </Button2>
                    </>
                  )}
                  {element.username === userName && role === "Guest" && (
                    <>
                      <Button2 onClick={() => updateComment(element._id)}>
                        &#9998;
                      </Button2>
                      <Button2 onClick={() => deleteComment(element._id)}>
                        &#128465;
                      </Button2>
                    </>
                  )}
                  <br />
                  <hr />
                </p>
              </Container>
            </>
          );
        })}
        <form onSubmit={handleComment}>
          <MDEditor value={value} onChange={setValue} />
          <Button>Add comment</Button>
        </form>
      </div>
    </>
  );
}

export default AuthCatShow;
