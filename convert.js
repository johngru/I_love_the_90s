var weight = prompt("Enter your weight in pounds.")
var weightNum = Number(weight)
var weightKilos = weightNum* 0.454

alert("Your weight of "+weightNum+" lbs. is equal to:\n"+weightKilos+" kgs.")
document.getElementById("weightKilos").innerHTML=weightKilos

console.log("Conversion Complete\n")
console.log("("+weightNum+" lbs.-> "+weightKilos+"kgs.")