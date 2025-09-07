"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2Icon, MapPin } from "lucide-react";

const page = ({}) => {
  const params = useParams();
  const eventId = params?.id;
  const [attendees, setAttendees] = useState([]);
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    axios.get(`${BASE_URL}/events/getById/${eventId}`).then((res) => {
      setEvent(res.data);
    });
  };

  const fetchAttendees = async () => {
    axios.get(`${BASE_URL}/attendees/byEvent/${eventId}`).then((res) => {
      setAttendees(res.data);
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchEvent();
    fetchAttendees();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-2xl font-medium flex items-center gap-2">
          <Loader2Icon className="animate-spin" /> Loading...
        </div>
      </div>
    );
  } else {
    return (
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <header className="space-y-4 border-b pb-6">
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {event?.name}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <MapPin className="text-red-500" />{" "}
              <span className="font-medium">{event?.location}</span>
            </span>
            <span>
              🕒 {formatDate(event?.startTime)} To {formatDate(event?.endTime)}
            </span>
            <span
              className={`${
                event?.attendeesCount >= event?.maxCapacity
                  ? "text-red-500 font-semibold"
                  : "text-gray-700"
              }`}
            >
              Capacity: {event?.attendeesCount}/{event?.maxCapacity}
            </span>
          </div>
          <Badge
            variant="outline"
            className="bg-red-50 text-red-500 border-red-200 rounded-full px-3 py-1 text-xs font-medium"
          >
            🔥 {event?.attendeesCount} Attending
          </Badge>
        </header>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-red-500 inline-block pb-2">
            Attendees
          </h2>
          {attendees?.length === 0 ? (
            <li className="mt-3 flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-red-300 transition">
              <p className="font-semibold text-gray-900 text-lg">
                No attendees registered yet.
              </p>
            </li>
          ) : (
            <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {attendees.map((attendee, index) => (
                <li
                  key={index}
                  className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-red-300 transition"
                >
                  <Avatar className="h-14 w-14 ring-2 ring-red-500">
                    <AvatarImage
                      src={attendee?.avatarUrl || ""}
                      alt={attendee?.name}
                    />
                    <AvatarFallback className="bg-red-100 text-red-600 font-bold">
                      {attendee?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">
                      {attendee?.name}
                    </p>
                    <p className="text-sm text-gray-500">{attendee?.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    );
  }
};

export default page;
