// ARRAYS
//Immutable



//Stringss




//Mutable
//Array Elements


//##########
//EXERCISE//
//##########

// PART 4 ARRAY EXERCISE
// This is  a .js file with commented hints, its optional to use this.

// Create Empty Student Roster Array
// This has been done for you!
var roster = []


function initialize(){
    temp = ["John","Bob", "Sam", "Sue", "Liz", "Peter","Evan"]
    for(person of temp){
        roster.push(person)
    }
    console.log("Roster Initialized")
    return
}
// Create the functions for the tasks

function add(student){
    roster.push(student)
    console.log(`${student} added to roster.`)
    return
}


// REMOVE STUDENT

function remove(student){
    index=roster.indexOf(student)

    if(index===-1){
        console.log(`${student} not found.\nPlease check entry\n
        and try again.`)
        return
    }
    else{
        roster.splice(index,1)
        console.log(`${student} successfully removed from roster.`)
        return
    }
}

// DISPLAY ROSTER

function display(){
    for(person of roster){
        console.log(person)
    }
}

// Start by asking if they want to use the web app

start = prompt("Would you like to use the web app? (yes/no)")

start = start.toLowerCase();

if(start==="no"){
    output="Then what are you doing here anyway??";
    alert(output)
    console.log(output)
}

while(start==="yes"){
    action = prompt("WELCOME TO THE ROSTER APP!\nType what you would like to do:\ninitialize,\nadd,\nremove,\ndisplay,\nquit")
    result = action.toLowerCase();

    if(result==="initialize"){
        initialize();
    }

    else if(result==="add"){
        student = prompt("Please type the Full Name of the student to be added:");
        add(student);
    }

    else if(result==="remove"){
        student = prompt("Please type the Full Name of the student to be removed:");
        remove(student);
    }

    else if(result==="display"){
        display();
    }

    else if(result==="quit"){
        alert("Thank you for using!  If you get a chance, please take our survey\nand let us know how we did!\nYour work isn't saved anywhere.\nGoodbye!")
        console.log("Thank you for using!  If you get a chance, please take our survey\nand let us know how we did!\nYour work isn't saved anywhere.\nGoodbye!")
        start="no";
    }

    else{
        alert("Input not recognized.  Please try entering your intention again...")
    }

}

// Now create a while loop that keeps asking for an action (add,remove, display or quit)
// Use if and else if statements to execute the correct function for each command.
