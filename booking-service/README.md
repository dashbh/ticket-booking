## GraphQL getBooking
{
  getBooking(id: "6506f2b6924e5ac70a79efce") {
    id,
    movie {
      title,
      actors,
      director,
      ratings,
      genre,
      ticket_price
    },
    movieTime,
    seats,
    theater
  }
}

## createBooking
mutation {
  createBooking(
    input: {
      userId: "6505a05226b4d39e4a7fd4f2"
      movieId: "1"
      seats: ["1A", "2A"]
      theater: "PVR WhiteField - 1"
      movieTime: "Sat Sep 16 2023 18:05:29 GMT+0530 (India Standard Time)"
    }
  ) {
    id
  }
}
