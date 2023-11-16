const canv = document.querySelector("canvas");
const WIDTH = canv.width = window.innerWidth;
const HEIGHT = canv.height = window.innerHeight;

const ctx = canv.getContext("2d");

function draw(x, y, c, s) {
  ctx.fillStyle = c;
  ctx.fillRect(x, y, s, s);
}

let particles = [];

function particle(x, y, c) {
  return {"x": x, "y": y, "vx": 0, "vy": 0, "color":c};
}

function random() {
  return Math.random()*900+50;
}

function create(number, color) {
  let group = [];
  for(let i = 0; i < number; i++) {
    group.push(particle(Math.random() * (WIDTH - 50), Math.random() * (HEIGHT - 50), color));
    particles.push(group[i]);
  
  }
  // console.log(group[0].x)
  return group;
}

function rule(particles1, particles2, g) {
  // console.log(particles1[0].x)
  for (let i = 0; i < particles1.length; i++) {
    let fx = 0
    let fy = 0
    let a = particles1[i];
    for(let j = 0; j < particles2.length; j++) {
      let b = particles2[j];
        
      let dx = a.x-b.x;
      let dy = a.y-b.y;
  
      let d = Math.sqrt(dx * dx + dy * dy);
      if (d > 0 && d < 80) {
        let F = g * 1/d;
        fx += (F * dx);
        fy += (F * dy);
      }
    }

    a.vx = (a.vx + fx) * 0.5;
    a.vy = (a.vy + fy) * 0.5;
    a.x += a.vx;
    a.y += a.vy;
    if(a.x <= 0 || a.x >= WIDTH) {a.vx *= -1;}
    if(a.y <= 0 || a.y >= HEIGHT) {a.vy *= -1;}
    if (a.x < 0) {
      a.x = 0;
    }
    if(a.x > WIDTH) {
      a.x = WIDTH;
    }
    if (a.y < 0) {
      a.y = 0;
    }
    if (a.y > HEIGHT) {
      a.y = HEIGHT;
    }
  }
}

let yellow = create(500, "yellow");
let red = create(500, "red");
let green = create(500, "green");
let purple = create(500, "purple");
let r = [];
for(let i = 0; i < 16; i++) {
  let v = Math.random() * 2 - 1;
  r.push(v);
  console.log(v)
}
function update() {
  let timer = Date.now();
  rule(purple, yellow, r[0]);
  rule(purple, red, r[1]);
  rule(purple, green, r[2]);
  rule(purple, purple, r[3])

  rule(yellow, yellow, r[4]);
  rule(yellow, red, r[5]);
  rule(yellow, green, r[6]);
  rule(yellow, purple, r[7]);
//lolwhat
  rule(green, yellow, r[8]);
  rule(green, red, r[9]);
  rule(green, green, r[10]);
  rule(green, purple, r[11]);

  rule(red, yellow, r[12]);
  rule(red, red, r[13]);
  rule(red, green, r[14]);
  rule(red, purple, r[15]);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  particles.forEach(p => {
    draw(p.x, p.y, p.color, 5);
  });
  // console.log(yellow[1].x);
  let diffTime = Date.now() - timer;
  console.log(diffTime / 1000);
}

setInterval(update, 33);