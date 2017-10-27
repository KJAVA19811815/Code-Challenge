const io = require("socket.io")();

const port = 3002;
io.listen(port);
console.log("at 3002");

const arr = ["Roger", "Rafa", "Andy", "Novak"];

function random() {
  return arr[Math.floor(Math.random() * arr.length)];
}

const data = [
  {
    id: 1,
    name: random(),
    message: "I am the best in the world"
  },
  {
    id: 2,
    name: random(),
    message: "I won the most french opens"
  },
  {
    id: 3,
    name: random(),
    message: "I won the most australian opens"
  },
  {
    id: 4,
    name: random(),
    message: "I am stuck at three"
  }
];

io.on("connection", function(socket) {
  socket.emit("news", { data: data });
  socket.on("my other event", function(data) {
    console.log(data);
  });
});
