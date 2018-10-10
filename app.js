const request = require('request');

let node1 = "172.18.0.12";
let node2 = "172.18.0.11"

let options = {
  url: "http://" + node1 + ":8545",
  method: "post",
  headers:
  {
    "content-type": "application/json"
  },
  body: JSON.stringify({ "jsonrpc": "2.0", "method": "admin_nodeInfo", "params": [], "id": 74 })
};

request(options, (error, response, body) => {
  if (error) {
    console.error('An error has occurred: ', error);
  } else {
    // console.log('Post successful: response: ', body);
    bodyJSON = JSON.parse(body);
    let enode = 'enode://' + bodyJSON.result.id + '@' + node1 + ':30303';

    let options_connect = {
      url: "http://" + node2 + ":8545",
      method: "post",
      headers:
      {
        "content-type": "application/json"
      },
      body: JSON.stringify({ "jsonrpc": "2.0", "method": "admin_addPeer", "params": [enode], "id": 74 })
    };

    request(options_connect, (error2, response2, body2) => {
      if (error2) {
          console.error('An error has occurred: ', error2);
      } else {
          console.log(body2);
      }
    });
  }
});
