const fs = require("fs");
const os = require("os");

// events is a class it's not like the other modules

const EventEmitter = require("events");

// Inheriting the class events

class Logger extends EventEmitter {
  // log method to print the message
  log(message) {
    // this.emit(key, value);
    this.emit("Message", { message });
  }
}

const logger = new Logger();
// const logFile = `D:\\Prabhat\\WebDevPro\\NodeJS\\EventLogger\eventlog.txt`;
const logFile = `.\eventlog.txt`;

const logToFile = (event) => {
  const logMessage = `${new Date().toISOString()} - ${event.message}\n`;
  fs.appendFileSync(logFile, logMessage);
};

// Message is the event which is supposed to listen and execute a logToFile function
// logger.on(); it is constanstly listening to the event
logger.on("Message", logToFile);

// It keep emittig the event

setInterval(() => {
  // os.frreemen() will return the free memory available in the system and os.totalmem() will return the total memory
  const memoryUsage = (os.freemem() / os.totalmem()) * 100;
  //   calling the log function of Logger class
  logger.log(`Current memory usage: ${memoryUsage.toFixed(2)}`);
}, 3000);

logger.log("Application started");
logger.log("Application event occured");
