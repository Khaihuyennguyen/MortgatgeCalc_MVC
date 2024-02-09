var engine;
var ground;
var boxes=[]
var colors = "1be7ff-6eeb83-e4ff1a-ffb800-ff5714".split("-").map(a=>"#"+a)
let overAllTexture
function setup() {	
	createCanvas(800,800);
	pixelDensity(2)
	background(100);
	let {Engine,Bodies,World}= Matter

  engine = Engine.create();
	let boxA = Bodies.rectangle(400, 200, 80, 80);
  let boxB = Bodies.rectangle(450, 50, 80, 80);
	let wallLeft = Bodies.rectangle(0-15, height/2,30,height, {
    isStatic: true
  });
	let wallRight = Bodies.rectangle(width+15, height/2,30,height, {
    isStatic: true
  });
  let ground = Bodies.rectangle(width/2, height+30,width, 60, {
    isStatic: true
  });
	boxes.push(boxA)
	World.add(engine.world, boxes);
	World.add(engine.world, [ground,wallLeft,wallRight]);
	Engine.run(engine);
	
	
	overAllTexture=createGraphics(width,height)
	overAllTexture.loadPixels()
	noStroke()
	for(var i=0;i<width+50;i++){
		for(var o=0;o<height+50;o++){
			overAllTexture.set(i,o,color(150,noise(i/10,i*o/300)*random([0,50,100])))
		}
	}
	overAllTexture.updatePixels()
}

function generateNewBox(){
	let {Engine,Bodies,World,Constraint}= Matter
	var sz = random([10,20,30, 50, 80])
  let box = Bodies.rectangle(mouseX,mouseY, sz, sz);
	box.color = random(colors)
	box.size = sz
	box.char = floor(random(0,101))//Please Put the first digit 1 less than the minimum and last number one more than the maximum you want :)
	
	// var constraint = Constraint.create({
	// 		// pointA: {x:random(width),y:random(height)},
	// 	  bodyA: boxes.slice(-1)[0],
	// 		bodyB: box,
	// 		length: 60,
	// 		stiffness: 0.1,
	// 		// damping: 0.05
	// });
	// World.add(engine.world, [constraint]);

	// console.log(box)
	boxes.push(box)
	World.add(engine.world, box);
}

function draw() {
	background(100);
	fill(0)
	rect(0,0,width,height)

	for(let box of boxes){
		var vertices = box.vertices;
		fill(box.color || 255)
		// noFill()
		stroke(0)
		strokeWeight(2)
		// noStroke()
		beginShape();
		for (let vert of vertices) {
			vertex(vert.x, vert.y);
		}
		endShape(CLOSE);
		push()
			translate(box.position.x,box.position.y)
			rotate(box.angle)
			fill(0)
			noStroke()
			let useTextSize = box.size*0.8 || 50
			textSize(useTextSize)
			textAlign(CENTER)
			textStyle(BOLD)
			text(box.char || "?",0,useTextSize*0.3 )
		pop()
	}
	if (frameCount%3==0){
		generateNewBox()
	}
	
	push()
		blendMode(MULTIPLY)
		image(overAllTexture,0,0)
	pop()
}

function keyPressed(){
	if (key==" "){
		save()
	}
}