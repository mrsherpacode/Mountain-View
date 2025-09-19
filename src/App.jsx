// Here, i'm using styled components  css for styling
import styled from "styled-components";
// name starts with  capital letter cuz its a component
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: orange;
`;
// reusable  button
const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  background-color: red;
  color: white;
  margin-right: 20px;
`;
// input elements
const Input = styled.input`
  border: 1px solid #333;
  border-radius: 5px;
  padding: 1rem 2rem;
`;
// styling  App component
const StyledApp = styled.div`
  background-color: gray;
  padding: 40px;
`;
function App() {
  return (
    <StyledApp>
      <H1>Hello</H1>
      <Button onClick={() => alert("check in")}>check in</Button>
      <Button onClick={() => alert("check out")}>check out</Button>
      <Input type="number" placeholder="guest number" />
    </StyledApp>
  );
}

export default App;
