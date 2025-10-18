import { useEffect, useRef } from "react";
// This is reuseable custom hook that close the modal window if clicked outside of the modal component.
export function useOutsideClick(close) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        // if clicked outside of ref close the modal
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }
      // Here, true means capturing phase which handles events down the  DOM tree.
      document.addEventListener("click", handleClick, true);
      // cleanup function that removes the event listener when unmounts that was proviously added
      return () => document.removeEventListener("click", handleClick, true);
    },
    [close]
  );

  return ref;
}
