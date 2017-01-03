
var singers = new Map();
singers.set("Ozzy", "Black Sabbath");
singers.set("Scott", "AC/DC");
singers.set("Bono", "U2");



for (var [key, value]  of singers){
  console.log(value + " fronted by " + key);
}
