import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;
const Main = styled.main`
  background-color: var(--color-gray-50);
  overflow: scroll;

  padding: 4rem 4.8rem 6.4rem;
`;
const Container = styled.div`
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  margin: 0 auto;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      {/* Outlet is where React Router renders the child route components. */}
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
