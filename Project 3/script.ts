enum TaskStatus {
    Todo = "todo",
    Doing = "doing",
    Done = "done"
}

interface Task {
    id: string;
    title: string;
    priority: "Low" | "Medium" | "High";
    status: TaskStatus;
}

let tasks: Task[] = [
];

const columnStyle = " bg-gray-500 min-h-screen text-gray-700 pt-3 text-center";
const columnTitleStyle = "bg-indigo-400 w-fit"

const columnTitles = document.querySelectorAll(".column h2") as NodeListOf<HTMLHeadingElement>;
const columns = document.querySelectorAll(".column") as NodeListOf<HTMLDivElement>;
const todoColumn = document.getElementById("todo-list") as HTMLDivElement;
const doingColumn = document.getElementById("doing-list") as HTMLDivElement;
const doneColumn = document.getElementById("done-list") as HTMLDivElement;

columnTitles.forEach((title) => {
    title.className = columnTitleStyle;
})

columns.forEach((column) => { 
    column.className += columnStyle;
})

function addTask(){
    
}