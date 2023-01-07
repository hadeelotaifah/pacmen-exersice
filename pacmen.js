let pos = 0;

let cnt=0;
let maxcnt=10;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];
let direction = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = pacArray[0][0];//'./images/PacMan1.png';
  newimg.width = 100;

  // TODO: set position here
  newimg.position=position;

  // TODO add new Child image to game
  game.appendChild(newimg);


  // return details in an object
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;

    if(cnt> maxcnt){
      if(item.velocity.x>0){
        if(item.newimg.src.indexOf("1.png")>-1){
          item.newimg.src=pacArray[0][1]
        }
        else
        {
          item.newimg.src=pacArray[0][0]
        }
      }
      else{
        if(item.newimg.src.indexOf("3.png")>-1){
          item.newimg.src=pacArray[1][1]
        }
        else
        {
          item.newimg.src=pacArray[1][0]
        }
      }
      
    }
  });


  cnt++;
  if(cnt>maxcnt+1) cnt=0;
  setTimeout(update, 20);
  //if(cnt> maxcnt) cnt=0;


}



function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  let game = document.getElementById('game');
  let lf= game.offsetLeft, rt = game.offsetLeft + game.offsetWidth - item.newimg.offsetWidth;
  if(item.position.x < lf){
    item.velocity.x = -item.velocity.x;
    
    item.newimg.src=pacArray[0][0]
  }
  if(item.position.x > rt){
    item.velocity.x = -item.velocity.x;
    item.newimg.src=pacArray[1][0];
  }

  let tp= game.offsetTop, bt = window.innerHeight - item.newimg.offsetHeight;
  if(item.position.y < tp){
    item.velocity.y = -item.velocity.y;
  }
  if(item.position.y > bt){
    item.velocity.y = -item.velocity.y;
  }


}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
if (typeof module !== 'undefined') {
  module.exports = { checkCollisions, update, pacMen };
}
