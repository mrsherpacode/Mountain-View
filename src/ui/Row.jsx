import styled, { css } from "styled-components";

// Reusable  row component
const Row = styled.div`
  display: Flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 2rem;
    `}
`;
// Setting default value
Row.defaultProps = {
  type: "vertical",
};
export default Row;
