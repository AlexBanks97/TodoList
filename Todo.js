const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "data.json");

const command = process.argv[2];
const msg = process.argv[3];

switch(command) {
    case "read":
        read();
        break;
    case "add":
        addTodo(msg);
        break;
    case "check":
        markTodoAsChecked(msg);
        break;
    case "clear":
        clear();
        break;     
    default:
        console.log("Try the 'read' or 'add' command");    
}


function Todo(message) {
    this.message = message;
    this.isDone = false;
}


function addTodo(message) {
    let todo = new Todo(message);
    let arr = [];
    fs.readFile(file, function(error, data) {
        if(error) throw error;
        arr = JSON.parse(data);
        arr.push(todo);
        fs.writeFile(file, JSON.stringify(arr), function(error) {
            if(error) throw error;
            console.log("Added todo :)");
        });
    });
}

function markTodoAsChecked(index) {
    let arr = [];
    fs.readFile(file, function(error, data) {
        if(error) throw error;
        arr = JSON.parse(data);
        arr[index].isDone = true;
        fs.writeFile(file, JSON.stringify(arr), function(error) {
            if(error) throw error;
            console.log("Updated todo with index " + index);
        });
    });
}


function read() {
    fs.readFile(file, function(error, data) {
        if(error) throw error;
        todos = JSON.parse(data);
        for(let i = 0; i < todos.length; i++) {
            console.log("#" + i + " " + todos[i].message + " - Done?: " + todos[i].isDone);
        }
    });
}

function clear() {
    let arr = [];
    fs.writeFile(file, JSON.stringify(arr), function(error) {
            if(error) throw error;
            console.log("Cleared your todo list...");
        });

}