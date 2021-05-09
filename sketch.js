var dog,sadDog,happyDog, database;
var foodS,foodStock,foodQ;
var addFood, feeding;
var foodObj;
var foodStock_val 
var hour;
var date;


//create feed and lastFed variable here
var feed
var lastFed 

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");

}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();


  lastFed = hour
  date = new Date();

  console.log(lastFed);
  
  lastFed=database.ref('feedtime');
  lastFed.on("value" , readTime)


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  


  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feeding=createButton("Feed The Dog");
  feeding.position(650,95);
  feeding.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();
    
  //write code to read fedtime value from the database 
  showTime();
  //write code to display text lastFed time here

  drawSprites();

}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function readTime(data){
  lastFed=data.val();
  hour = date.getHours();
  lastFed = hour;
  console.log(lastFed);
  foodObj.getFedTime(lastFed);
  foodObj.updateFeedTime(lastFed);
}

function feedDog(){
  dog.addImage(happyDog);
  //write code here to update food stock and last fed time
  foodObj.deductFood();
  console.log("hell"); 
  foodStock_val = foodObj.getFoodStock();
  foodObj.updateFoodStock(foodStock_val);
  foodObj.updateFoodStock(foodS);
  foodObj.getFedTime(lastFed);
  foodObj.updateFeedTime(lastFed);
  showTime();
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function showTime(){
  if(lastFed >= 12){
    fill("white");
    textSize(20);
    lastFed=lastFed-12;
    text("Last Fed : " + lastFed + "AM", 250,30)
  }else{
    fill("white");
    textSize(20);
    text("Last Fed : " + lastFed + "PM", 250,30)
  }
}