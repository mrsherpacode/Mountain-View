import { cloneElement, useContext } from "react";
import { createContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
// Compound Component pattern
//1) create a context
const ModelContext = createContext();

// 2) create a parent component

function Modal({ children }) {
  const [openName, setIsOpenName] = useState("");
  const open = setIsOpenName;
  const close = () => setIsOpenName("");
  return (
    <ModelContext.Provider value={{ open, close, openName }}>
      {children}
    </ModelContext.Provider>
  );
}
// Child components
function Open({ children, opens: openWindow }) {
  const { open } = useContext(ModelContext);
  // cloneElement allows to inject event handlers into child components dynamically.
  return cloneElement(children, { onClick: () => open(openWindow) });
}

//A React portal allows us to render an element outside of its parent component's DOM structure while keeping it in the original position in the React component tree. This means props continue to work normally.portals prevent issues caused by CSS properties like overflow: hidden on parent elements, which can cut off modal content.
function Window({ children, name }) {
  const { openName, close } = useContext(ModelContext);

  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        {cloneElement(children, { onCloseModal: close })}
      </StyledModal>
    </Overlay>,
    // body is parent element of modal
    document.body
  );
}
// Attach child components to Modal for compound component pattern
Modal.Open = Open;
Modal.window = Window;
export default Modal;
