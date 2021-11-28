import styled from "styled-components"

export const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: 200px;
    grid-template-rows: 200px 40px 40px;
    grid-template-areas: "image" "text" "stats";
    border-radius: 18px;
    background: #faf0e6;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
  `;

export const CardImage = styled.img`
    display: block;
    grid-area: image;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    object-fit: cover;
    width: 200px;
    height: 200px;
  `;

  export const CardTextWrapper = styled.div`
    grid-area: text;
    margin: 5px;
  `;

  export const CardTextTitle = styled.h2`
    margin-top: 0px;
    font-size: 1.5rem;
    box-sizing: border-box;
    min-width: 0px;
    line-height: 1.4;
    margin: 0px;
    color: #000;
  `;

  export const CardStatWrapper = styled.div`
    grid-area: stats;
    display: grid;
    /* grid-template-columns: 1fr 1fr 1fr; */
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;

    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background: #faf0e6;
  `;

  export const CardStats = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
    padding: 10px;
  `;

  export const LinkText = styled.a`
    color: #000;
    margin-top: -2px;
    padding: 4px 7px;
    text-decoration: none;
    border-radius: 24px;
    &:hover {
      background-color: #efbe93;
    }
    &:active {
      background-color: #efbe93;
    }
  `;
