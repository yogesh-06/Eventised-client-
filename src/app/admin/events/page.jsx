"use client";
import { DataTableDemo } from "@/components/CommonTable";
import CreateEventModal from "@/components/CreateEventModal";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { BASE_URL, formatDate, getEventStatus } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

export const columns = [
  // {
  //   accessorKey: "id",
  //   header: "Sr. No.",
  //   cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  // },
  {
    accessorKey: "name",
    header: "Event name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalies">{row.getValue("location")}</div>
    ),
  },
  {
    accessorKey: "startTime",
    header: () => <div className="text-right w-20">Start time</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium w-20">
        {formatDate(row.getValue("startTime"))}
      </div>
    ),
  },
  {
    accessorKey: "endTime",
    header: () => <div className="text-right w-20">End time</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium w-20">
        {formatDate(row.getValue("endTime"))}
      </div>
    ),
  },
  {
    accessorKey: "attendees",
    header: () => <div className="text-right w-20">Attendees</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium w-20">
        {row.getValue("attendees")}
      </div>
    ),
  },
  {
    accessorKey: "maxCapacity",
    header: () => <div className="text-right w-20">Capacity</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium w-20">
        {row.getValue("maxCapacity")}
      </div>
    ),
  },
];

const Events = () => {
  const [events, setEvents] = useState([]);
  const apiUrl = `${BASE_URL}/events/getAll`;
  const [isChanged, setIsChanged] = useState("");

  const [series, setSeries] = useState({
    currentPageNumber: 1,
    currentPageSize: 0,
  });

  const headers = [
    { key: "name", label: "Name" },
    { key: "location", label: "Location" },
    { key: "startDate", label: "Timing" },
    { key: "maxCapacity", label: "Total Sits" },
    { key: "attendeesCount", label: "Total Attendees" },
    { key: "endDate", label: "Status" },
  ];

  return (
    <div className="m-5 py-5">
      <div className="flex justify-between items-center  px-1 px-md-0">
        <h3 className="text-3xl font-bold">Events</h3>
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
          <CreateEventModal setChanged={setIsChanged} />
        </div>
      </div>
      <DataTableDemo
        apiUrl={apiUrl}
        headers={headers}
        setData={setEvents}
        setSeries={setSeries}
        isChanged={isChanged}
        sortOrder={{ key: "name", direction: "asc" }}
      >
        {events?.length > 0 ? (
          events.map((event, index) => {
            const status = getEventStatus(event.endTime, event.startTime);
            return (
              <TableRow
                key={event._id}
                className="hover:bg-gray-100 transition-colors"
              >
                <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {index +
                    1 +
                    (series.currentPageNumber - 1) * series.currentPageSize}
                  .
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                  {event.name}
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {event.location}
                </TableCell>

                <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {formatDate(event.startTime)}
                  <br />
                  {formatDate(event.endTime)}
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {event.maxCapacity || "N/A"}
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {event.attendeesCount || 0}
                </TableCell>
                <TableCell className="whitespace-nowrap px-3 py-4 text-sm text-center">
                  <span
                    className={`px-2 py-1 text-xs text-white rounded font-semibold uppercase
                        ${status === "upcoming" ? "bg-green-600" : ""}
                        ${status === "ongoing" ? "bg-yellow-500" : ""}
                        ${status === "ended" ? "bg-red-500" : ""}
                    `}
                  >
                    {status}
                  </span>
                </TableCell>
              </TableRow>
            );
          })
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

export default Events;
