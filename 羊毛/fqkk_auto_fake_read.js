const $ = new Env(`前台自动阅读`);
!(async () => {
  if (typeof $request !== "undefined") {
    if ($request.url.indexOf('/mock/read') > 0) {
      let body = `
      <html>
      <head>
          <meta charset="UTF-8">
      </head>
      <style>
          div {position:absolute; top:50%; left:50%; margin:0 0 0 -234px; width:auto; height:auto; border:0px solid #008800; font-size: 7vw}
      </style>
      <body><div id="timer"></div></body>
      <script>
          var oBox= document.getElementById('timer');
          var maxtime = parseInt(Math.random() * (10 - 9 + 1) + 9, 10);
          setTimeout(()=>window.history.back(),maxtime*1000);
          function CountDown() {
              if (maxtime >= 0) {
                  oBox.innerHTML = '返回倒计时'+maxtime+'秒';
                  --maxtime;
              } else{
                  clearInterval(timer);
                  window.history.back();
              }
          }
          timer = setInterval("CountDown()", 1000);
        </script>
      </html>
      `
      const headers = {
        "Connection": "Close",
        'Content-Type': 'text/html; charset=utf-8'
      };
      if ($.isSurge() || $.isLoon()) {
        $.done({response: {status: 200, headers, body}})
      } else if ($.isQuanX()) {
        $.done({status: 'HTTP/1.1 200 OK', headers, body})
      }
    } else if (typeof $response !== "undefined") {
      // 如果重定向的是微信文章，改写重定向地址
      let url302 = ($response.headers && $response.headers['Location']) || ''
      if (url302.match(/https?:\/\/mp.weixin.qq.com\/s/)) {
        $response.headers['Location'] = $request.url.replace('/task/read', '/mock/read')
        $.done({headers: $response.headers})
      } else {
        $.log(`未检查到待跳转的微信文章url：\n${JSON.stringify($response.headers, null, 2)}`)
      }
    }
  }
})().catch((e) => $.logErr(e)).finally(() => $.done());
