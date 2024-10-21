"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBooking } from "@/redux/features/bookSlice";
import { TextField, Select, MenuItem, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

export default function Booking() {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [hospital, setHospital] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<Date | null>(null);

  const handleBooking = () => {
    if (name && surname && id && hospital && bookingDate) {
      const bookingData = {
        name,
        surname,
        id,
        hospital,
        bookDate: dayjs(bookingDate).format("YYYY-MM-DD"),
      };
      dispatch(addBooking(bookingData));
      // Reset form fields
      setName("");
      setSurname("");
      setId("");
      setHospital("");
      setBookingDate(null);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <div className="w-fit space-y-2">
        <TextField
          name="Name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-fit space-y-2">
        <TextField
          name="Lastname"
          label="Lastname"
          variant="outlined"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div className="w-fit space-y-2">
        <TextField
          name="Citizen ID"
          label="Citizen ID"
          variant="outlined"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </div>
      <div className="w-fit space-y-2">
        <Select
          id="hospital"
          value={hospital}
          onChange={(e) => setHospital(e.target.value)}
          sx={{ width: 220 }}
        >
          <MenuItem value="Chulalongkorn Hospital">
            Chulalongkorn Hospital
          </MenuItem>
          <MenuItem value="Rajavithi Hospital">Rajavithi Hospital</MenuItem>
          <MenuItem value="Thammasat University Hospital">
            Thammasat University Hospital
          </MenuItem>
        </Select>
      </div>
      <div className="w-fit space-y-2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Booking Date"
            value={bookingDate}
            onChange={(newValue) => setBookingDate(newValue)}
          />
        </LocalizationProvider>
      </div>
      <Button
        name="Book Vaccine"
        variant="contained"
        color="primary"
        onClick={handleBooking}
        className="w-fit"
        sx={{ marginTop: 2 }}
      >
        Book Vaccine
      </Button>
    </div>
  );
}
