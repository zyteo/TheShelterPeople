import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Label,
  DescriptionLabel,
  CatInfo,
  LabelContainer,
  InputContainer,
  Input,
  DescriptionInput,
  Select,
  CancelLink,
  Button,
} from "../Styles/CatsUpdateStyle";
import Config from "../Components/Config";

function CatsUpdate({ role, auth }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateCatDetail, setUpdateCatDetail] = useState({
    name: "",
    description: "",
    image: "",
    gender: "",
    cage: "",
    adoptable: "",
  });

  // get the cat data for the update form to prepopulate the values
  useEffect(() => {
    async function getCatData() {
      await axios
        .get(`${Config.API_URL}cats/${id}`)
        .then((cat) => {
          setUpdateCatDetail({
            gender: cat.data.data.gender,
            name: cat.data.data.name,
            description: cat.data.data.description,
            image: cat.data.data.image,
            adoptable: cat.data.data.adoptable,
            cage: cat.data.data.cage,
          });
        })
        .catch((err) => {
          console.log(err);
          alert("Cat not found!");
          navigate("/cats/adoptables");
        });
    }
    getCatData();
  }, []);

  //for every change in cat details, update the state
  const handleChange = (event) => {
    const name = event.target.name;
    setUpdateCatDetail({ ...updateCatDetail, [name]: event.target.value });
  };

  // update on clicking update Button
  const handleUpdate = async (event) => {
    event.preventDefault();
    if (role === "Admin" && auth === "Auth") {
      await axios
        .put(`${Config.API_URL}cats/${id}`, updateCatDetail)
        .then((res) => {
          window.alert(`Cat updated successfully!`);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate(`/cats/adoptables`);
    } else {
      window.alert(`Sorry, only Admin can update cats!`);
      navigate(`/cats/adoptables`);
    }
  };

  return (
    <>
      <h1>Update Cat Details</h1>
      <Form onSubmit={handleUpdate}>
        <CatInfo>
          <LabelContainer>
            <Label>Name:</Label>
            <DescriptionLabel>Description:</DescriptionLabel>
            <Label>Image URL:</Label>
            <Label>Gender:</Label>
            <Label>Adoptable:</Label>
            <Label>Cage:</Label>
          </LabelContainer>
          <InputContainer>
            <Input
              type="text"
              name="name"
              minLength="2"
              value={updateCatDetail.name}
              onChange={(event) => handleChange(event)}
              required
            />
            <DescriptionInput
              type="textarea"
              name="description"
              minLength="1"
              value={updateCatDetail.description}
              onChange={(event) => handleChange(event)}
              required
            />
            <Input
              type="text"
              name="image"
              minLength="5"
              value={updateCatDetail.image}
              onChange={(event) => handleChange(event)}
            />
            <Select name="gender" onChange={(event) => handleChange(event)}>
              {updateCatDetail?.gender === "Male" ? (
                <option value="Male" selected>
                  Male
                </option>
              ) : (
                <option value="Male">Male</option>
              )}
              {updateCatDetail?.gender === "Female" ? (
                <option value="Female" selected>
                  Female
                </option>
              ) : (
                <option value="Female">Female</option>
              )}
              {updateCatDetail?.gender === "Unknown" ? (
                <option value="Unknown" selected>
                  Unknown
                </option>
              ) : (
                <option value="Unknown">Unknown</option>
              )}
            </Select>
            <Select name="adoptable" onChange={(event) => handleChange(event)}>
              {updateCatDetail?.adoptable === true ? (
                <option value="Yes" selected>
                  Yes
                </option>
              ) : (
                <option value="Yes">Yes</option>
              )}
              {updateCatDetail?.adoptable === false ? (
                <option value="No" selected>
                  No
                </option>
              ) : (
                <option value="No">No</option>
              )}
            </Select>
            <Select name="cage" onChange={(event) => handleChange(event)}>
              {updateCatDetail?.cage === 6 ? (
                <option value="6" selected>
                  6
                </option>
              ) : (
                <option value="6">6</option>
              )}
              {updateCatDetail?.cage === 2 ? (
                <option value="2" selected>
                  2
                </option>
              ) : (
                <option value="2">2</option>
              )}
              {updateCatDetail?.cage === 3 ? (
                <option value="3" selected>
                  3
                </option>
              ) : (
                <option value="3">3</option>
              )}
              {updateCatDetail?.cage === 4 ? (
                <option value="4" selected>
                  4
                </option>
              ) : (
                <option value="4">4</option>
              )}
              {updateCatDetail?.cage === 5 ? (
                <option value="5" selected>
                  5
                </option>
              ) : (
                <option value="5">5</option>
              )}
              {updateCatDetail?.cage === 8 ? (
                <option value="8" selected>
                  8
                </option>
              ) : (
                <option value="8">8</option>
              )}
              {updateCatDetail?.cage === 9 ? (
                <option value="9" selected>
                  9
                </option>
              ) : (
                <option value="9">9</option>
              )}
            </Select>
          </InputContainer>
        </CatInfo>
        <Button type="submit" value="Update Cat">
          Update Cat
        </Button>
      </Form>
      <Button onClick={() => navigate(-1)}>Cancel</Button>
    </>
  );
}

export default CatsUpdate;
