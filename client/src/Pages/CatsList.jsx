import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  CardWrapper,
  CardImage,
  CardTextWrapper,
  CardTextTitle,
  CardStatWrapper,
  CardStats,
  LinkText,
  CatCreateBtn,
  Button,
  Div,
  CatWrapper,
  ContentContainer,
} from "../Styles/CatListStyle";
import Tilt from "react-parallax-tilt";

function CatsList({ role }) {
  // For the cat data
  const [cats, setCats] = useState([]);
  const [status, setStatus] = useState("pending");
  let navigate = useNavigate();
  // useeffect to get the cats data on render
  useEffect(() => {
    async function getCatsData() {
      setStatus("loading");
      await axios
        .get(`http://localhost:3000/api/cats/`)
        .then((cat) => {
          console.log(cat.data.data);
          setCats(cat.data.data);
          setStatus("resolved");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCatsData();
  }, []);

  const deleteCat = (id) => {
    axios.delete(`http://localhost:3000/api/cats/${id}`);
    window.alert(`Goodbye cat :(`);
    setCats(cats.filter((cat) => cat.id !== id));
  };

  const updateCat = (id) => {
    navigate(`/cats/edit/${id}`);
  };

  return (
    <>
      <h1>Adoptable Cats</h1>
      {status === "loading" && <h3>Herding Cats...</h3>}
      <ContentContainer>
        {/* Only allow admin to make new cat */}
        {role === "Admin" && (
          <>
            <CatCreateBtn to="/cats/new">
              <Button>Create Cat</Button>
            </CatCreateBtn>
          </>
        )}
        <h3>Cage 6</h3>
        <CatWrapper>
          {cats.map((element) => {
            return (
              <>
                {element.cage === 6 ? (
                  <Tilt key={element.id}>
                    <CardWrapper>
                      <Link to={`/cats/${element.id}`}>
                        <CardImage src={element.image} />
                      </Link>

                      <CardTextWrapper>
                        <CardTextTitle>{element.name}</CardTextTitle>
                      </CardTextWrapper>
                      {role === "Admin" && (
                        <>
                          <CardStatWrapper>
                            <CardStats>
                              <LinkText onClick={() => updateCat(element.id)}>
                                Update
                              </LinkText>
                            </CardStats>
                            <CardStats>
                              <LinkText onClick={() => deleteCat(element.id)}>
                                X
                              </LinkText>
                            </CardStats>
                          </CardStatWrapper>
                        </>
                      )}
                    </CardWrapper>
                  </Tilt>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </CatWrapper>
        <h3>Cage 9</h3>
        <CatWrapper>
          {cats.map((element) => {
            return (
              <>
                {element.cage === 9 ? (
                  <Tilt key={element.id}>
                    <CardWrapper>
                      <Link to={`/cats/${element.id}`}>
                        <CardImage src={element.image} />
                      </Link>

                      <CardTextWrapper>
                        <CardTextTitle>{element.name}</CardTextTitle>
                      </CardTextWrapper>
                      {role === "Admin" && (
                        <>
                          <CardStatWrapper>
                            <CardStats>
                              <LinkText onClick={() => updateCat(element.id)}>
                                Update
                              </LinkText>
                            </CardStats>
                            <CardStats>
                              <LinkText onClick={() => deleteCat(element.id)}>
                                X
                              </LinkText>
                            </CardStats>
                          </CardStatWrapper>
                        </>
                      )}
                    </CardWrapper>
                  </Tilt>
                ) : (
                  <></>
                )}
              </>
            );
          })}
        </CatWrapper>
      </ContentContainer>
    </>
  );
}

export default CatsList;
