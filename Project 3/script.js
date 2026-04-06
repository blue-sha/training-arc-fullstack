var TaskStatus;
(function (TaskStatus) {
    TaskStatus["Todo"] = "todo";
    TaskStatus["Doing"] = "doing";
    TaskStatus["Done"] = "done";
})(TaskStatus || (TaskStatus = {}));
let tasks = [];
const columnStyle = " bg-gray-500 min-h-screen text-gray-700 pt-3 text-center";
const columnTitleStyle = "bg-indigo-400 w-fit";
const columnTitles = document.querySelectorAll(".column h2");
const columns = document.querySelectorAll(".column");
const todoColumn = document.getElementById("todo-list");
const doingColumn = document.getElementById("doing-list");
const doneColumn = document.getElementById("done-list");
columnTitles.forEach((title) => {
    title.className = columnTitleStyle;
});
columns.forEach((column) => {
    column.className += columnStyle;
});
function addTask() {
}
export {};
//# sourceMappingURL=script.js.map