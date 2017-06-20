var fs = require('fs')
var origin = require('./BookService.swagger.json')
origin.paths['/v2/search/books'].get.parameters = [
    {
        "name": "q",
        "in": "query",
        "description": "keyword",
        "required": true,
        "type": "string",
        "format": "string"
    }
]
origin.info.version="v2.0-20170405"
fs.writeFileSync(__dirname+"/BookService.swagger.json", JSON.stringify(origin, null, "  "), "utf8")
