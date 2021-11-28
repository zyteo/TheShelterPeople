import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
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

function CatsUpdate({ role, auth }) {
  const history = useHistory();
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
      await axios.get(`/api/cats/${id}`).then((cat) => {
        setUpdateCatDetail({
          gender: cat.data.data.gender,
          name: cat.data.data.name,
          description: cat.data.data.description,
          image: cat.data.data.image,
          adoptable: cat.data.data.adoptable,
          cage: cat.data.data.cage,
        });
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
      await axios.put(`/api/cats/${id}`, updateCatDetail).then((res) => {
        window.alert(`Cat updated successfully!`);
      });
      history.push(`/cats/list`);
    } else {
      window.alert(`Sorry, only Admin can update cats!`);
      history.push(`/cats/list`);
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
              <option value={updateCatDetail.gender} selected disabled hidden>
                {updateCatDetail.gender}
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Unknown">Unknown</option>
            </Select>
            <Select name="adoptable" onChange={(event) => handleChange(event)}>
              <option
                value={updateCatDetail.adoptable}
                selected
                disabled
                hidden
              >
                {updateCatDetail.adoptable}
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
            <Select name="cage" onChange={(event) => handleChange(event)}>
              <option value={updateCatDetail.cage} selected disabled hidden>
                {updateCatDetail.cage}
              </option>
              <option value="6/7">6/7</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </Select>
          </InputContainer>
        </CatInfo>
        <Button type="submit" value="Update Cat">
          Update Cat
        </Button>
      </Form>
      <CancelLink to={"/cats/list"}>
        <Button>Cancel</Button>
      </CancelLink>
    </>
  );
}

export default CatsUpdate;
