import styled, { css } from "styled-components";

// Reusable heading component
const Heading = styled.main`
  /*We can receive the props inside the styled component by using a callback function */
  /*  The css function is especially necessary if we want to include logic inside the CSS block */

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      color: red;
    `}

    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 1rem;
      font-weight: 500;
    `}

     ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 2rem;
      font-weight: 600;
      text-align: center;
    `}

  line-height:1.4rem;
`;
export default Heading;
