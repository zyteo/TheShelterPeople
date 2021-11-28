import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import {
  Img,
  Button,
  ContentBox,
  Container,
  Content1,
} from "../Styles/CatShowStyle";

function CatShow() {
  let id = useParams();
  let history = useHistory();
  // For the cat data
  const [cat, setCat] = useState();
  // handle function to return user to cat list page
  const catListPage = () => {
    history.push(`/cats/list`);
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
      <div>
        <br />
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
