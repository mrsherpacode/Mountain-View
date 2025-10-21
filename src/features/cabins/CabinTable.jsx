import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";

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

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading cabins: {error.message}</div>;

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body>
        {cabins &&
          cabins.map((cabin) => <CabinRow cabin={cabin} key={cabin.id} />)}
      </Table.Body>
    </Table>
  );
}

export default CabinTable;
