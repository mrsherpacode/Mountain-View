import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, countCabins }) {
  // Return early if data is not loaded yet
  if (!bookings || !confirmedStays) return null;

  // total bookings
  const numBookings = bookings.length;
  // total sales
  const totalSales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  // total Check-ins
  const checkIns = confirmedStays.length;
  // occupency rate
  // num checked in nights / all available nights (numdays * count cabins)
  const occupancy =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * countCabins);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Total Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="occupency Rates"
        color="yellow"
        icon={<HiOutlineChartBar />}
        //occupency rate is in percent so multiple by 100
        value={Math.round(occupancy * 100) + "%"}
      />
    </>
  );
}

export default Stats;
