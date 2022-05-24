import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../apiService";

const initialState = {
  books: [],
  error: "",
  status: "idle",
};

export const getBooks = createAsyncThunk(
  "book/getbooks",
  async ({ pageNum, limit, query }) => {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const res = await api.get(url);
    return res.data;
  }
);

export const addBooks = createAsyncThunk(
  "book/addbooks",
  async ({ addingBook }) => {
    if (!addingBook) return;
    try {
      await api.post(`/favorites`, addingBook);
      toast.success("The book has been added to the reading list!");
    } catch (error) {
      toast.error(error.message);
    }
  }
);

export const getBook = createAsyncThunk("book/getbook", async ({ bookId }) => {
  try {
    const res = await api.get(`/books/${bookId}`);
    return res.data;
  } catch (error) {
    toast.error(error.message);
  }
});

export const getFavorites = createAsyncThunk(
  "book/getfavorites",
  async ({ removedBookId }) => {
    if (removedBookId) return;
    try {
      const res = await api.get(`/favorites`);
      return res.data;
    } catch (error) {
      toast.error(error.message);
    }
  }
);

export const removeBooks = createAsyncThunk(
  "book/remove",
  async ({ removedBookId, setRemovedBookId }) => {
    if (!removedBookId) return;
    try {
      await api.delete(`/favorites/${removedBookId}`);
      toast.success("The book has been removed");
      setRemovedBookId("");
    } catch (error) {
      toast.error(error.message);
    }
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(addBooks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(addBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getBook.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getBook.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(getBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getFavorites.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(removeBooks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(removeBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(removeBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;
