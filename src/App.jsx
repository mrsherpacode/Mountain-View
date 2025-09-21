// Here, i'm using styled components  css for styling
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

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
        <Heading as="h1">Hello H1</Heading>
        <Heading as="h2">Hello H2</Heading>
        <Heading as="h3">Hello H3</Heading>

        <Button onClick={() => alert("check in")}>check in</Button>
        <Button onClick={() => alert("check out")}>check out</Button>
        <Input type="number" placeholder="guest number" />
      </StyledApp>
    </>
  );
}

export default App;
