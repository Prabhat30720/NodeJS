const fs = require("fs");
const filePath = `D:\\Prabhat\\WebDevPro\\NodeJS\\Todo\\tasks.json`;

// Trying to read the filePath

const loadTasks = () => {
  try {
    // reding the filePath in a synchronous manner.

    const dataBuffer = fs.readFileSync(filePath);
    // converting dataBuffer into a string format
    const dataJSON = dataBuffer.toString();
    // conver the dataJSON string format to object format
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

// saving the tasks and writing it to the filePath

const saveTasks = (tasks) => {
  // converting the tasks to string format from JSON object format
  const dataJSON = JSON.stringify(tasks);
  //   writing or saving the tasks synchronously to filePath
  fs.writeFileSync(filePath, dataJSON);
};

// Add the task into the filePath

const addTask = (task) => {
  // Checking the previous tasks in the array. If there is no task it will return an empty array
  const tasks = loadTasks();
  tasks.push({ task });
  //   saving the tasks array
  saveTasks(tasks);
};

const listTasks = () => {
  // loadTasks() is an array of tasks
  const tasks = loadTasks();
  tasks.forEach((task, index) => {
    console.log(`${index + 1} - ${task.task}`);
  });
};

// Remove the task from the tasks array

const removeTask = (index) => {
  // Loading the tasks array
  let tasksArray = loadTasks();
  //   If index mateches then exclude it from the tasksArray
  tasksArray = tasksArray.filter(
    (task, taskIndex) => taskIndex + 1 !== parseInt(index)
  );
  //   Save the task array
  saveTasks(tasksArray);
};

// process.argv[2] returns the command or action that need to perform from the terminal or command line e.g. add, list, remove, etc

const command = process.argv[2];

// process.argv[3] return the argument or value that is provided in the terminal or command line.

const argument = process.argv[3];

if (command === "add") {
  addTask(argument);
} else if (command === "list") {
  listTasks();
} else if (command === "remove") {
  removeTask(argument);
} else {
  console.log("Command Not found !");
}
