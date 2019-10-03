import handler from 'serve-handler';
import http from 'http';
import { readFile as rf } from 'fs';
import { promisify } from 'util';
import replaceTime from './replaceTime.mjs';

const readFile = promisify(rf);

http
  .createServer(async (req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(
        await readFile('./static/index.html', {
          encoding: 'utf8'
        }).then(replaceTime)
      );
    } else {
      return handler(req, res, {
        cleanUrls: false,
        directoryListing: false,
        public: 'static'
      });
    }
  })
  .listen(3000);
