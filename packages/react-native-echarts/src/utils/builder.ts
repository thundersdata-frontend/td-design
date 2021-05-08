export const formatString = (str?: string): string => {
  if (!str) return '';
  return str
    .replace(/(\w+:)|(\w+ :)/g, s => {
      return `"${s.substring(0, s.length - 1)}":`;
    })
    .replace(/\\"/g, "'")
    .replace(/"function (\w+)\((.*)\) ?\{([\n\s\S]*?)\}"/g, (_, a, b, c) => {
      return `function ${a}(${b}){${formatString(c)}}`;
    });
};

export const buildEcharts = (backgroundColor: string) => {
  return `
    function setBackgroundColor(color) {
      document.getElementById('main').style.backgroundColor = color;
    }

    function sendCallbackData(uuid, data) {
      window.ReactNativeWebView.postMessage(JSON.stringify({"types":"CALLBACK", "uuid": uuid, "payload": data}));
    }

    function parse (data) {
      return JSON.parse(data, function (key, value) {
        if (value
          && typeof value === "string"
          && value.substr(0,8) === "function"
        ) {
          var startBody = value.indexOf('{') + 1;
          var endBody = value.lastIndexOf('}');
          var startArgs = value.indexOf('(') + 1;
          var endArgs = value.indexOf(')');

          return new Function(value.substring(startArgs, endArgs), value.substring(startBody, endBody));
        }
        return value;
      });
    }

    window.onresize = function() {
      chart.resize();
    };

    function processMessage(e) {
      var req = parse(e.data);

      switch(req.types) {
        case "SET_OPTION":
          chart.setOption(eval('(req.payload.option)'), req.payload.notMerge, req.payload.lazyUpdate);
          break;

        case "CLEAR":
          chart.clear();
          break;

        case "SET_BACKGROUND_COLOR":
          setBackgroundColor(req.color);
          break;

        case "GET_OPTION":
          var option = chart.getOption();
          var data = {};

          if(req.properties !== undefined) {
            req.properties.forEach(function (prop) {
              data[prop] = option[prop];
            });
          } else {
            var data = {
              option: option
            };
          }
          sendCallbackData(req.uuid, data);
          break;

        default:
          break;
      }
    }

    window.document.addEventListener('message', function(e) {
      processMessage(e);
    });

    window.addEventListener('message', function(e) {
      processMessage(e);
    });

    var chart = echarts.init(document.getElementById('main'), undefined, {renderer: 'canvas'});
    setBackgroundColor("${backgroundColor}");
    true;
  `;
};
