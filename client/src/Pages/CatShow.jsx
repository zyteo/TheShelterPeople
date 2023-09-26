import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import {
  Img,
  Button,
  ContentBox,
  Container,
  Content1,
} from "../Styles/CatShowStyle";

function CatShow() {
  let params = useParams();
  let navigate = useNavigate();
  // For the cat data
  const [cat, setCat] = useState();
  const [comments, setComments] = useState();
  // handle function to return user to cat list page
  const catListPage = () => {
    if (cat?.adoptable === true) {
      navigate("/cats/adoptables");
    } else {
      navigate("/cats/unadoptables");
    }
  };
  // useeffect to get the cats data
  useEffect(() => {
    async function getCatData() {
      await axios
        .get(`http://localhost:3000/api/cats/${params.id}`)
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
    const getCommentData = () => {
      axios
        .get(`http://localhost:3000/api/cats/${params.id}/comments`)
        .then((comment) => {
          setComments(comment.data.data);
          console.log(comment);
        })
        .catch((err) => {
          console.log(err);
          setComments([]);
        });
    };
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
                  <br />
                  <hr />
                </p>
              </Container>
            </>
          );
        })}
      </div>
    </>
  );
}

export default CatShow;
