"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { BASE_URL } from "@/lib/utils";
import axios from "axios";
import RegisterModal from "./RegisterModal";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllEvents = () => {
    setLoading(true);
    setTimeout(() => {
      axios.get(`${BASE_URL}/events/getAllUpcoming`).then((res) => {
        setEvents(res.data);
      });
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <>
      {events?.length ? (
        events.map((event, index) => (
          <Card
            key={index}
            className="w-full max-w-sm border border-gray-200 shadow-md rounded-xl overflow-hidden transition hover:shadow-lg bg-white"
          >
            <div className="h-40 w-full bg-gray-200">
              <img
                src={`https://picsum.photos/seed/${Math.random()}/400/200`}
                alt={event?.name}
                className="h-full w-full object-cover"
              />
            </div>

            <CardHeader className="py-4">
              <CardTitle className="text-lg font-semibold truncate capitalize">
                {event?.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {event?.location}
              </CardDescription>
            </CardHeader>

            <CardContent className="text-sm text-gray-700 space-y-1">
              <p>
                🕓 {formatDate(event?.startTime)} <br />→{" "}
                {formatDate(event?.endTime)}
              </p>
              <div className="flex items-center gap-2 justify-between">
                <p className="pt-3 font-medium ">
                  {event?.attendeesCount === event?.maxCapacity
                    ? "🔴 Full"
                    : ` 👥 ${event?.maxCapacity - event?.attendeesCount} Seats
                  available!`}
                </p>
                <Link
                  href={`/events/${event._id}/attendees`}
                  className="pt-3 font-medium"
                >
                  {event?.attendeesCount} Total Attendees!
                </Link>
              </div>
            </CardContent>

            <CardFooter>
              <RegisterModal
                eventId={event?._id}
                eventName={event?.name}
                fetchEvents={getAllEvents}
              />
            </CardFooter>
          </Card>
        ))
      ) : loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl font-medium flex items-center gap-2">
            <Loader2Icon className="animate-spin" /> Loading...
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl font-medium">No upcoming events.</div>
        </div>
      )}
    </>
  );
};

export default UpcomingEvents;
