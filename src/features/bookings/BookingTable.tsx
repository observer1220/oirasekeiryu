import { Table, Empty, Spinner, Pagination } from "../../components/common";
import { Menus } from "../../components/Layout";
import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings";

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();

  if (!bookings?.length) return <Empty resourceName="bookings" />;

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="1fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count ?? 0} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
