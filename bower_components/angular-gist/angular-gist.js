angular.module('gist', []);

angular.module('gist')
  .directive('gist', function () {
    return {
      scope: true,
      restrict: 'E',
      replace: true,
      template: '<div></div>',
      link: function(scope, elm, attrs) {
        var gistId = attrs.id;
        var gistFile = attrs.file;
        var iframeHtml;

        var iframe = document.createElement('iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('frameborder', '0');
        iframe.id = "gist-" + gistId + Math.random() * (5000 - 100) + 100;
        elm[0].appendChild(iframe);

        if(gistFile) {
          iframeHtml = '<html><head><base target="_parent"><style>table{font-size:12px;}</style></head><body onload="parent.document.getElementById(\'' + iframe.id + '\').style.height=document.body.scrollHeight + \'px\'"><scr' + 'ipt type="text/javascript" src="https://gist.github.com/' + gistId + '.js?file=' + gistFile + '"></sc'+'ript></body></html>';
        }else {
         iframeHtml = '<html><head><base target="_parent"><style>table{font-size:12px;}</style></head><body onload="parent.document.getElementById(\'' + iframe.id + '\').style.height=document.body.scrollHeight + \'px\'"><scr' + 'ipt type="text/javascript" src="https://gist.github.com/' + gistId + '.js"></sc'+'ript></body></html>';
        }
        var doc = iframe.document;
        if (iframe.contentDocument) doc = iframe.contentDocument;
        else if (iframe.contentWindow) doc = iframe.contentWindow.document;

        doc.open();
        doc.writeln(iframeHtml);
        doc.close();
      }
    };
  });