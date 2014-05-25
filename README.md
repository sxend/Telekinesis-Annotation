Telekinesis-Annotation
======================


javascript Comment-based annotation library

```javascript
var telekinesis = require('telekinesis-annotation');
var parser = new telekinesis.AnnotationParser();
var result = parser.parse(function(a /* @Annotate11 Foo11:Bar11 |@Annotate12 Foo12:Bar12 */ 
	,b /* @Annotate21 Foo21:Bar21 | @Annotate22 Foo22:Bar22 */ )
	 /*@Annotate31 Foo31:Bar31 | @Annotate32 Foo32:Bar32 */ {
});
console.log(JSON.stringify(result,null,"  "));

```
this code outputs that JSON
```javascript
{
  "arg": [
    {
      "argName": "a",
      "index": 0,
      "annotations": [
        {
          "name": "@Annotate11",
          "values": [
            "Foo11",
            "Bar11"
          ]
        },
        {
          "name": "@Annotate12",
          "values": [
            "Foo12",
            "Bar12"
          ]
        }
      ]
    },
    {
      "argName": "b",
      "index": 1,
      "annotations": [
        {
          "name": "@Annotate21",
          "values": [
            "Foo21",
            "Bar21"
          ]
        },
        {
          "name": "@Annotate22",
          "values": [
            "Foo22",
            "Bar22"
          ]
        }
      ]
    }
  ],
  "type": [
    {
      "name": "@Annotate31",
      "values": [
        "Foo31",
        "Bar31"
      ]
    },
    {
      "name": "@Annotate32",
      "values": [
        "Foo32",
        "Bar32"
      ]
    }
  ]
}
```


