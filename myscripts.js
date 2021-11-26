const grid =document.querySelector(".grid");
const reset= document.querySelector(".reset");
const blueBtn =document.querySelector(".blueBtn");
const rgbBtn =document.querySelector(".rgbBtn");
const grayBtn= document.querySelector(".grayBtn");
let size =16;

//make the initial default grid (default size is 16x16)
function buildGrid(size){
  for (let i = 0; i < size*size; i++) {
    const div = document.createElement('div');
    div.classList.add('cell');

    grid.appendChild(div); 
}
};

//creates new grid after reset
function newGrid(size){
  grid.innerHTML=" "
  grid.setAttribute('style', `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr);`);
  for (let i = 0; i < size*size; i++) {
      const div = document.createElement('div');
      div.classList.add('cell');
      grid.appendChild(div); 
  }
}

//popup when reset button is pressed
function popup(){
  size=prompt("How many squares per side? (Maximum: 100)");
  while (isNaN(size) ||size<1 || size>100) {
    size=prompt("How many squares per side? (Maximum: 100)");
  }
  newGrid(size);
}

//listens for button
reset.addEventListener('click', function(){
  let cell = grid.children;
  for (let i = 0; i < size*size; i++) {
      cell[i].style.backgroundColor = 'white';
  }
  popup();
});

blueBtn.addEventListener('click', function(){
  let cell = grid.children;
  for (let i = 0; i < size*size; i++) {
    cell[i].removeEventListener("mouseover", randomColor)
    cell[i].removeEventListener("mouseover", grayscale)
    cell[i].addEventListener("mouseover", makeblue)
  }
})

rgbBtn.addEventListener('click', function(){
  let cell = grid.children;
  for (let i = 0; i < size*size; i++) {
    cell[i].removeEventListener("mouseover", makeblue)
    cell[i].removeEventListener("mouseover", grayscale)
    cell[i].addEventListener("mouseover", randomColor)
  }
})

grayBtn.addEventListener('click', function(){
  let cell = grid.children;
  for (let i = 0; i < size*size; i++) {
      cell[i].removeEventListener("mouseover", randomColor)
      cell[i].removeEventListener("mouseover", makeblue)
      cell[i].addEventListener("mouseover", grayscale)
  }})     

// changes cell colour randomly  
function randomColor(){
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  const color= "#" + randomColor;
  this.style.backgroundColor = color;
}

//changes cell to blue
function makeblue(){
  this.style.backgroundColor= "blue";
}

//changes cell from gray to black
function grayscale(){
  if (this.style.backgroundColor.match(/rgba/)) {
    let currentOpacity = Number(this.style.backgroundColor.slice(-4, -1));
    if (currentOpacity <= 0.9) {
        this.style.backgroundColor = `rgba(0, 0, 0, ${currentOpacity + 0.1})`;
        this.classList.add('grey');
    }
  }else if (this.classList == 'cell grey' && this.style.backgroundColor == 'rgb(0, 0, 0)') {
    return;
  }else {
    this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';  
  }
}

buildGrid(size);