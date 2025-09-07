"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // shadcn Input
import { BASE_URL, getMinEndTime, getNowISO } from "@/lib/utils";
import axios from "axios";
import { Plus, X, CircleAlert, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const CreateEventModal = ({ setChanged }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setendTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Event name is required.";
    if (name.trim().length > 35) newErrors.name = "Event name is too long.";
    if (!location.trim()) newErrors.location = "Location is required.";
    if (!startTime) newErrors.startTime = "Start time is required.";
    if (!endTime) {
      newErrors.endTime = "End time is required.";
    } else {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const diffInMs = end - start;
      const diffInHours = diffInMs / (1000 * 60 * 60);

      if (diffInHours < 3) {
        newErrors.endTime =
          "End time must be at least 3 hours after start time.";
      }
    }
    if (!capacity.trim()) {
      newErrors.capacity = "Capacity is required.";
    } else if (isNaN(capacity) || parseInt(capacity) <= 0) {
      newErrors.capacity = "Capacity must be a positive number.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const eventData = {
        name,
        location,
        startTime,
        endTime,
        maxCapacity: capacity,
      };
      console.log(startTime, endTime);

      axios
        .post(`${BASE_URL}/events/create`, eventData)
        .then((response) => {
          setChanged("changed");
          setOpenDialog(false);
          setLoading(false);
          setName("");
          setLocation("");
          setStartTime("");
          setendTime("");
          setCapacity("");
          setErrors({});
        })
        .catch((error) => {
          if (error.response) {
            setErrors({ form: error?.response?.data?.message });
          } else if (error.request) {
            setErrors({ form: "No response from server" });
          } else {
            setErrors({ form: "Unexpected error occurred" });
          }
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="bg-red-500 text-white hover:bg-red-600 py-2 px-3 text-md"
        onClick={() => setOpenDialog(true)}
      >
        <Plus />
        Create Event
      </Button>
      <Dialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        className="bg-white shadow-lg rounded-lg p-6"
      >
        <DialogContent className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl text-red-500 font-semibold">
              Create New Event
            </DialogTitle>
            <X
              onClick={() => setOpenDialog(false)}
              className="font-bold cursor-pointer"
            />
          </div>

          <form className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Event Name</label>
              <Input
                id="name"
                type="text"
                placeholder="Enter event name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                id="location"
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={errors.location ? "border-red-500" : ""}
              />
              {errors.location && (
                <p className="text-sm text-red-500 mt-1">{errors.location}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Start Time</label>
              <Input
                id="startTime"
                type="datetime-local"
                min={getNowISO()}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className={errors.startTime ? "border-red-500" : ""}
              />
              {errors.startTime && (
                <p className="text-sm text-red-500 mt-1">{errors.startTime}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">End Time</label>
              <Input
                id="endTime"
                type="datetime-local"
                min={getMinEndTime(startTime)}
                value={endTime}
                onChange={(e) => setendTime(e.target.value)}
                className={errors.endTime ? "border-red-500" : ""}
              />
              {errors.endTime && (
                <p className="text-sm text-red-500 mt-1">{errors.endTime}</p>
              )}
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium">Max Capacity</label>
              <Input
                id="capacity"
                type="number"
                placeholder="Enter max capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className={errors.capacity ? "border-red-500" : ""}
              />
              {errors.capacity && (
                <p className="text-sm text-red-500 mt-1">{errors.capacity}</p>
              )}
            </div>
            {errors?.form && (
              <p className="text-sm font-medium text-red-500 mt-1 text-center flex items-center justify-center gap-2">
                <CircleAlert />
                {errors.form}
              </p>
            )}
            <div className="pt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setOpenDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={handleSubmit}
                diabled={loading}
              >
                {loading && <Loader2Icon className="animate-spin" />} Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateEventModal;
