import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import {
  Img,
  Button,
  Button2,
  ContentBox,
  Content1,
  Container,
} from "../Styles/AuthCatShowStyle";
import Config from "../Components/Config";

function AuthCatShow({ userName, role, userID }) {
  let params = useParams();
  let navigate = useNavigate();
  // For the cat data
  const [cat, setCat] = useState();
  const [value, setValue] = useState("");
  const [comments, setComments] = useState();
  // handle function to return user to cat list page
  const catListPage = () => {
    navigate(-1);
  };

  const getCommentData = () => {
    axios
      .get(`${Config.API_URL}cats/${params.id}/comments`)
      .then((comment) => {
        setComments(comment.data.data);
      })
      .catch((err) => {
        console.log(err);
        setComments([]);
      });
  };

  // handle function for adding comment
  const handleComment = (event) => {
    event.preventDefault();
    let comment = value;
    let cat_id = params.id;
    let user_id = userID;
    let username = userName;

    const payload = { comment, cat_id, user_id, username };
    axios
      .post(`${Config.API_URL}cats/${params.id}/newcomment`, payload)
      .then((res) => {
        // Get the comment id of the newly added comment
        console.log(res);
        // refresh the comments
        getCommentData();
        window.alert(`Comment added!`);
      })
      .catch((err) => {
        console.log(err);
      });
    setValue("");
  };

  // handle function for updating comment
  const updateComment = async (id) => {
    navigate(`/comments/edit/${id}`);
  };

  // handle function for deleting comment from cat
  const deleteComment = (commentid) => {
    axios.delete(`${Config.API_URL}comments/${commentid}`);
    window.alert(`Comment deleted!`);
    getCommentData();
  };

  // useeffect to get the cats data
  useEffect(() => {
    async function getCatData() {
      await axios
        .get(`${Config.API_URL}cats/${params.id}`)
        .then((cat) => {
          setCat(cat.data.data);
        })
        .catch((err) => {
          console.log(err);
          alert("Cat not found!");
          navigate("/cats/adoptables");
        });
    }
    getCatData();

    getCommentData();
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
            {cat?.adoptable === true ? <p>Yes</p> : <p>No</p>}
            <h4>Cage:</h4>
            <p> {cat?.cage}</p>
          </Content1>
          <Button onClick={() => catListPage()}>Back</Button>
        </ContentBox>
      </div>
      <div>
        <br />
        {comments?.length > 0 ? <h2>Comments</h2> : <></>}
        {comments?.map((element) => {
          return (
            <>
              <Container>
                <p key={element.id}>
                  <hr />
                  <MDEditor.Markdown
                    source={`**` + element.username + `** *commented:*`}
                  />
                  <MDEditor.Markdown source={element.comment} />
                  {/* Only admin can update/delete all comments. Guest can only update/delete own comment */}
                  {role === "Admin" && (
                    <>
                      <br />
                      <Button2 onClick={() => updateComment(element.id)}>
                        &#9998; Edit
                      </Button2>
                      <Button2 onClick={() => deleteComment(element.id)}>
                        &#128465; Del
                      </Button2>
                    </>
                  )}
                  {element.username === userName && role === "Guest" && (
                    <>
                      <Button2 onClick={() => updateComment(element.id)}>
                        &#9998;
                      </Button2>
                      <Button2 onClick={() => deleteComment(element.id)}>
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
