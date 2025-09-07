"use client";
import { DataTableDemo } from "@/components/CommonTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { BASE_URL, formatDate } from "@/lib/utils";
import { useState } from "react";

const Attendees = () => {
  const [attendees, setAttendees] = useState([]);
  const apiUrl = `${BASE_URL}/attendees/getAll`;
  const [series, setSeries] = useState({
    currentPageNumber: 1,
    currentPageSize: 0,
  });

  const headers = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "eventId", label: "Event" },
    { key: "createdAt", label: "Registered At" },
  ];

  return (
    <div className="m-5 py-5">
      <div className="flex justify-between items-center px-5 px-md-0">
        <h3 className="text-3xl font-bold">Attendees</h3>
        <div className="flex flex-wrap items-center gap-2 md:flex-row"></div>
      </div>
      <DataTableDemo
        apiUrl={apiUrl}
        headers={headers}
        setData={setAttendees}
        setSeries={setSeries}
        sortOrder={{ key: "name", direction: "asc" }}
      >
        {attendees.length > 0 ? (
          attendees.map((attendee, index) => (
            <TableRow
              key={attendee._id}
              className="hover:bg-gray-100 transition-colors"
            >
              <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {index +
                  1 +
                  (series.currentPageNumber - 1) * series.currentPageSize}
                .
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {attendee.name}
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {attendee.email}
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {attendee.eventId?.name || "N/A"}
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatDate(attendee.createdAt)}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center py-10 text-2xl font-medium"
            >
              No events found.
            </TableCell>
          </TableRow>
        )}
      </DataTableDemo>
    </div>
  );
};

export default Attendees;
