// javascript module libraries are available in node js

// require("http") module that helps to make sure that you are listening to some of the request and acting like a server
const http = require("http");
// require("fs") is used to work with file system
const fs = require("fs");
// It helps to find what path you are serving and also helps to find the extension of files e.g .html, .css or .js file extentions are available in the path
const path = require("path");

// port availabl on the computer. e.g. port 8000, 6000, 8080, 3000, 3001. Make sure the port that you are using to build the Nginx server is not being used by your computer to run any other program

const port = 3000;
// createServer() always listen to the traffics that is coming from the port
const server = http.createServer((req, res) => {
  // path.join(__dirname) gives the entire path and __dirname gives the current directory path
  // join() method gives you the absolute path where the files are
  // if the request is "/" then will show the index.html file and if request is about.html or contact.html then show that file to user
  // req = is recieved from the user or client like /, about.html, contact.html
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url
  );

  console.log(filePath);

  //   extname() gives the extension of the file e.g. .html, .css and .js
  const exName = String(path.extname(filePath)).toLowerCase();
  // What type of file is being supported by the server?
  // Create an object of extensions that are supported by the Nginx server
  const mimeType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "text/png",
  };

  // If the extension type is in the mimeType then it is supported by the server that we are creating

  //   application/octet-stream is a binary file

  const contentType = mimeType[exName] || "application/octet-stream";

  // res = Here we will handle the response that we are going to provide as well as the error and content part of the response

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // writeHead() sends the meta-data like status code
        res.writeHead(400, { "Content-Type": "text/html" });
        res.end("404: File Not Found Broooo");
      }
    } else {
      // 200 is the status code and then send the content that you want to send
      res.writeHead(200, { "Content-Type": contentType });
      // end the connection
      res.end(content, "utf-8");
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
