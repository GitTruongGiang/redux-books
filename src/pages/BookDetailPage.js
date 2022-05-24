import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
import { BASE_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { addBooks, getBook } from "../feature/bookSlice";

const BookDetailPage = () => {
  const [addingBook, setAddingBook] = useState(false);

  const params = useParams();
  const bookId = params.id;

  const addToReadingList = (books) => {
    setAddingBook(books);
  };

  const { books, error, status } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else {
      dispatch(addBooks({ addingBook }));
    }
  }, [addingBook, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    } else {
      dispatch(getBook({ bookId }));
    }
  }, [bookId, dispatch]);

  return (
    <Container>
      {status === "loading" ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: "1px solid black" }}
        >
          <Grid item md={4}>
            {books && (
              <img width="100%" src={`${BASE_URL}/${books.imageLink}`} alt="" />
            )}
          </Grid>
          <Grid item md={8}>
            {books && (
              <Stack>
                <h2>{books.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {books.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {books.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {books.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {books.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {books.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: "fit-content" }}
                  onClick={() => addToReadingList(books)}
                >
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
