import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  //useQuery custom hook
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    // queryFn: the function responsible for fetching the data, which must return a promise.
    queryFn: getCabins,
  });
  //we use the useSearchParams hook to read the current value from the URL.
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  if (error) return <div>Error loading cabins: {error.message}</div>;
  // 1) Filtering Cabin
  // Filtering table based on All, No-Discount and With-Discount
  const filterValue = searchParams.get("discount") || "All";
  let filteredCabins;
  if (filterValue === "All") filteredCabins = cabins;
  if (filterValue === "No-Discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filterValue === "With-Discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  // 2) Sorting cabin
  const sortBy = searchParams.get("sortBy") || "name-asc";

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabin = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    // Here, Menus is the parent component
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        {/* Here, i'm applying render prop pattern*/}
        <Table.Body
          data={sortedCabin}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
