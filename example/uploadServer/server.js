const http = require('http');
const url = require('url');
function start(route, handle) {
  function onRequest(request, response) {
    const { pathname } = url.parse(request.url);
    console.log(`Received request ${pathname}`);

    // 处理postData
    let postData = '';
    request.setEncoding = 'utf8';
    request.addListener('data', (postDataChunk) => {
      postData += postDataChunk;
      console.log(`Reveived post data ${postDataChunk}`);
    });
    request.addListener('end', () => {
      route(pathname, handle, response, postData);
    });
  }
  http.createServer(onRequest).listen(8081);
  console.log('Server started');
}
exports.start = start;