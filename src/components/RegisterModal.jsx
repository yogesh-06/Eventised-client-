"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BASE_URL } from "@/lib/utils";
import axios from "axios";
import { CircleAlert, Loader2Icon, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const RegisterModal = ({ eventId, eventName, fetchEvents }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      axios
        .post(`${BASE_URL}/attendees/register`, { eventId, name, email })
        .then((response) => {
          fetchEvents();
          setName("");
          setEmail("");
          setErrors({});
          setOpenDialog(false);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response) {
            console.error("❌ Server error:", error?.response?.data?.message);
            setErrors({ form: error?.response?.data?.message });
          } else if (error.request) {
            console.error("❌ No response:", error?.request);
            setErrors({ form: "No response from server" });
          } else {
            console.error("❌ Error:", error?.message);
            setErrors({ form: "Unexpected error occurred" });
          }
          setLoading(false);
        });
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpenDialog(true);
        }}
        className="w-full bg-red-500 hover:bg-red-600 text-white"
      >
        Register
      </Button>
      <Dialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        className="bg-white shadow-lg rounded-lg p-6"
      >
        <DialogContent className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-semibold pr-10">
              Register for{" "}
              <span className="text-red-500 underline capitalize">
                {eventName}
              </span>
            </h1>
            <X
              onClick={() => {
                setOpenDialog(false);
              }}
              className="font-bold cursor-pointer"
            />
          </div>

          <form className="space-y-4">
            <div className="grid gap-1.5">
              <Label htmlFor="name">Attendee Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">{errors.name}</p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
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
                className={"bg-red-500 hover:bg-red-600 text-white"}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading && <Loader2Icon className="animate-spin" />}
                Create
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegisterModal;
