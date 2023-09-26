import React from "react";
import styled from "styled-components";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
const P = styled.p`
  margin: 8px;
`;

function Contact() {
  const position = {
    lat: 1.3812997,
    lng: 103.7255819,
  };
  return (
    <>
      <h1>Contact us!</h1>
      <P>
        We are located at The Animal Lodge @ 59 Sungei Tengah Road, Singapore
        699014
      </P>
      <MapContainer center={position} zoom={21} scrollWheelZoom={true}>
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        />
        <Marker position={position}></Marker>
      </MapContainer>
      <br />
      <P>
        Interested in volunteering? Check out our Instagram{" "}
        <a
          href="https://www.instagram.com/theshelterpeople_sg/"
          target="_blank"
          rel="noreferrer"
        >
          @theshelterpeople_sg
        </a>
      </P>
    </>
  );
}

export default Contact;
