const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

populateUI();

function undateSelectCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));


  const selectedCount = selectedSeats.length;
  count.innerText = selectedCount;
  total.innerText = selectedCount * ticketPrice;
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if(selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }

}

movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  undateSelectCount();
})

container.addEventListener("click", e => {
  if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected");

    undateSelectCount();
  }
})

undateSelectCount();
