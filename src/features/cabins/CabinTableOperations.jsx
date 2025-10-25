import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
//  This componet contains three buttons, which is from Filter Component
function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        fieldValue="discount"
        options={[
          { value: "All", label: "All" },
          { value: "No-Discount", label: "No-Discount" },
          { value: "With-Discount", label: "With-Discount" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
