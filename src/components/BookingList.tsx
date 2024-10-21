"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";
import { RootState } from "@/redux/store";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const BookingList: React.FC = () => {
  const bookings = useSelector((state: RootState) => state.book.bookItems);
  const dispatch = useDispatch();

  const handleCancelBooking = (id: string) => {
    dispatch(removeBooking(id));
  };

  if (bookings.length === 0) {
    return <Typography>No Vaccine Booking</Typography>;
  }

  return (
    <List>
      {bookings.map((booking) => (
        <ListItem key={booking.id}>
          <ListItemText
            primary={`${booking.name} ${booking.surname}`}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  ID: {booking.id}
                  <br />
                  Hospital: {booking.hospital}
                  <br />
                  Date: {booking.bookDate}
                </Typography>
              </>
            }
          />
          <Button
            onClick={() => handleCancelBooking(booking.id)}
            color="secondary"
          >
            Cancel Booking
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default BookingList;