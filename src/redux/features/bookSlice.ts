import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingItem {
  name: string;
  surname: string;
  id: string;
  hospital: string;
  bookDate: string;
}

type BookState = {
  bookItems: BookingItem[];
};

const initialState: BookState = {
  bookItems: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const index = state.bookItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        // Replace existing booking if the ID already exists
        state.bookItems[index] = action.payload;
      } else {
        // Add new booking if the ID doesn't exist
        state.bookItems.push(action.payload);
      }
    },
    removeBooking: (state, action: PayloadAction<string>) => {
      state.bookItems = state.bookItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addBooking, removeBooking } = bookSlice.actions;

export default bookSlice.reducer;

export { bookSlice };
