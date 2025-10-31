import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import SortBy from "./SortBy";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

// Filter Component
function Filter({ fieldValue, options }) {
  //we use the useSearchParams hook to read the current filter value from the URL.
  const [searchParams, setSearchParams] = useSearchParams();
  // handleClick  receives the value to set in the URL.
  function handleClick(value) {
    searchParams.set(fieldValue, value);
    setSearchParams(searchParams);
  }

  return (
    <>
      <StyledFilter>
        {options.map((option) => (
          <FilterButton
            key={option.value}
            onClick={() => handleClick(option.value)}
          >
            {option.label}
          </FilterButton>
        ))}
      </StyledFilter>
      {/* sorting the cabin table */}
      <SortBy
        options={[
          {
            value: "name-asc",
            label: "sort by name(A-Z)",
          },
          {
            value: "name-desc",
            label: "sort by name(Z-A)",
          },
          {
            value: "regularPrice-asc",
            label: "sort by price(low first)",
          },
          {
            value: "regularPrice-desc",
            label: "sort by price(high first )",
          },
          {
            value: "maxCapacity-asc",
            label: "sort by capacity(low first )",
          },
          {
            value: "maxCapacity-desc",
            label: "sort by capacity(high first )",
          },
        ]}
      />
    </>
  );
}
export default Filter;
