const app = require('./app')

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server in on ${PORT}`);
// });