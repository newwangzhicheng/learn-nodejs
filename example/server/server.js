const http = require('http');
const url = require('url');

function start(route, handle) {
  function onRequest(request, response) {
    const pathname = url.parse(request.url).pathname;
    console.log(`Request for ${pathname} received`);
    // 处理post数据
    let postData = '';
    request.setEncoding('utf8');
    request.addListener('data', (postDataChunk) => {
      postData += postDataChunk;
      console.log(`Received POST data chunk ${postDataChunk} .`);
    })
    request.addListener('end', () => {
      route(handle, pathname, response, postData); })
  }
  http.createServer(onRequest).listen(8081);
  console.log('Server has started');
}

exports.start = start;