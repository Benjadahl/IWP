function MessageBoard (name) {
  this.name = name;
  this.messages= [];
  this.handles= [];
  
  this.putMessage = function (msg) {
    this.messages.push(msg);
  };
  
  this.printMessages = function () {
    this.messages.forEach(msg => {
      console.log(msg);
    });
  };
  
  this.register = function (userFunc) {
    this.handles.push(userFunc);
  }
  
  this.sendAndNotify = function (msg) {
    this.putMessage(msg);
    this.handles.forEach(handle => {
      handle(msg);
    });
  }
}

let messageBoard = new MessageBoard("mBoard");

messageBoard.putMessage("test1");
messageBoard.putMessage("test2");
messageBoard.putMessage("test3");

messageBoard.printMessages();

messageBoard.register(msg => {
  console.log("URGENT MESSAGE: " + msg);
});

messageBoard.register(msg => {
  console.log("new MESSAGE: " + msg);
});


messageBoard.sendAndNotify("test4");

let messageBoard2 = new MessageBoard("mBoard2");
messageBoard2.putMessage("ding dong");

messageBoard2.printMessages();

