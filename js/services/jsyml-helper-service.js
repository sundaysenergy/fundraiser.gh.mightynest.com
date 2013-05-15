mightynestApp
.service('jsyamlHelper', function () {
    if (!jsyaml) throw 'JSYAML lib not found';
    var parser = jsyaml;

    var service = {
      getParser: function () {
        return parser;
      },
      normalize: function (rawYamlText) {
        return rawYamlText.replace(/^\s+|\s+$/g, '');
      },
      parse: function (normalizedYamlString) {
        return parser.load(service.normalize(normalizedYamlString)) || {};
      }
    };
    return service;
  });