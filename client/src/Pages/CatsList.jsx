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
      await axios.get(`/api/cats/`).then((cat) => {
        setCats(cat.data.data);
        setStatus("resolved");
      });
    }
    getCatsData();
  }, []);

  const deleteCat = (id) => {
    axios.delete(`/api/cats/${id}`);
    window.alert(`Goodbye cat :(`);
    setCats(cats.filter((cat) => cat._id !== id));
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
        <h3>Cage 6/7</h3>
        <CatWrapper>
          {cats.map((element) => {
            return (
              <>
                  {element.cage === "6/7" ? (
                    <Tilt key={element._id}>
                      <CardWrapper>
                        <Link to={`/cats/${element._id}`}>
                          <CardImage src={element.image} />
                        </Link>

                        <CardTextWrapper>
                          <CardTextTitle>{element.name}</CardTextTitle>
                        </CardTextWrapper>
                        {role === "Admin" && (
                          <>
                            <CardStatWrapper>
                              <CardStats>
                                <LinkText
                                  onClick={() => updateCat(element._id)}
                                >
                                  Update
                                </LinkText>
                              </CardStats>
                              <CardStats>
                                <LinkText
                                  onClick={() => deleteCat(element._id)}
                                >
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
                
                  {element.cage === "9" ? (
                    <Tilt key={element._id}>
                      <CardWrapper>
                        <Link to={`/cats/${element._id}`}>
                          <CardImage src={element.image} />
                        </Link>

                        <CardTextWrapper>
                          <CardTextTitle>{element.name}</CardTextTitle>
                        </CardTextWrapper>
                        {role === "Admin" && (
                          <>
                            <CardStatWrapper>
                              <CardStats>
                                <LinkText
                                  onClick={() => updateCat(element._id)}
                                >
                                  Update
                                </LinkText>
                              </CardStats>
                              <CardStats>
                                <LinkText
                                  onClick={() => deleteCat(element._id)}
                                >
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
