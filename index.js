const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  console.log("a user connected");
  socket.broadcast.emit("hi");

  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
