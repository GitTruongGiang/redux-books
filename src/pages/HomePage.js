import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import SearchForm from "../components/SearchForm";
import { FormProvider } from "../form";
import { useForm } from "react-hook-form";
import {
  Container,
  Alert,
  Box,
  Card,
  Stack,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
} from "@mui/material";
import { BASE_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../feature/bookSlice";

const HomePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const totalPage = 10;
  const limit = 10;
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  const { books, error, status } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks({ pageNum, limit, query }));
  }, [pageNum, limit, query, dispatch]);
  //--------------form
  const defaultValues = {
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    setQuery(data.searchQuery);
  };

  return (
    <Container>
      <Stack sx={{ display: "flex", alignItems: "center", m: "2rem" }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Book Store
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <SearchForm />
          </Stack>
        </FormProvider>
        <PaginationBar
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPage}
        />
      </Stack>
      <div>
        {status === "loading" ? (
          <Box sx={{ textAlign: "center", color: "primary.main" }}>
            <ClipLoader color="inherit" size={150} loading={true} />
          </Box>
        ) : (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-around"
            flexWrap="wrap"
          >
            {books.length &&
              books.map((book) => (
                <Card
                  key={book.id}
                  onClick={() => handleClickBook(book.id)}
                  sx={{
                    width: "12rem",
                    height: "27rem",
                    marginBottom: "2rem",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={`${BASE_URL}/${book.imageLink}`}
                      alt={`${book.title}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {`${book.title}`}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
          </Stack>
        )}
      </div>
    </Container>
  );
};

export default HomePage;
