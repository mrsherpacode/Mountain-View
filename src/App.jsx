// Here, i'm using styled components  css for styling
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
// name starts with  capital letter cuz its a component
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: orange;
`;

// styling  App component
const StyledApp = styled.div`
  background-color: gray;
  padding: 40px;
`;
function App() {
  return (
    <>
      {/*This  GlobalStyles component does not accept any children and should be a sibling to the styled app component.  */}
      <GlobalStyles />
      <StyledApp>
        <H1>Hello</H1>
        <Button onClick={() => alert("check in")}>check in</Button>
        <Button onClick={() => alert("check out")}>check out</Button>
        <Input type="number" placeholder="guest number" />
      </StyledApp>
    </>
  );
}

export default App;
