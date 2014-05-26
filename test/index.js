var expect = require('expect.js');
var telekinesis = require('../');
var parser = new telekinesis.AnnotationParser();

var result = parser.parse(function(){});
expect(result.arg).to.be(null);
expect(result.type).to.be(null);

var result = parser.parse(function (/**/){});
expect(result.arg).to.be(null);
expect(result.type).to.be(null);

var result = parser.parse(function()/**/{});
expect(result.arg).to.be(null);
expect(result.type).to.be(null);

var result = parser.parse(function(/**/)/**/{});
expect(result.arg).to.be(null);
expect(result.type).to.be(null);

var result = parser.parse(function(a/**/){});
expect(result.arg[0].argName).to.be('a');
expect(result.arg[0].annotations).to.be(null);
expect(result.type).to.be(null);

var result = parser.parse(function(a/*@Annotate*/){});
expect(result.arg[0].argName).to.be('a');
expect(result.arg[0].annotations[0].name).to.be('@Annotate');
expect(result.arg[0].annotations[0].values).to.be(null);
expect(result.type).to.be(null);

var result = parser.parse(function(){});
expect(result.arg).to.be(null);
expect(result.type).to.be(null);

var result = parser.parse(function
(/*@   */){/**/});
expect(result.arg).to.be(null);
expect(result.type).to.be(null);

var result = parser.parse(function( 
 	a /* @Annotate11 Foo11:Bar11 | @Annotate12 Foo12:Bar12 */ 
	,   b 
		/* @Annotate21 Foo21:Bar21 |	@Annotate22 Foo22:Bar22 	*/ 


) /*@Annotate31 Foo31:Bar31 |	@Annotate32 Foo32:Bar32 */ {
	/*@AnnotateIgnore FooIgnore:BarIgnore |@AnnotateIgnore FooIgnore:BarIgnore */
});

expect(result.arg[0].argName).to.be('a');
expect(result.arg[0].index).to.be(0);
expect(result.arg[0].annotations[0].name).to.be('@Annotate11');
expect(result.arg[0].annotations[0].values[0]).to.be('Foo11');
expect(result.arg[0].annotations[0].values[1]).to.be('Bar11');

expect(result.arg[0].annotations[1].name).to.be('@Annotate12');
expect(result.arg[0].annotations[1].values[0]).to.be('Foo12');
expect(result.arg[0].annotations[1].values[1]).to.be('Bar12');

expect(result.arg[1].argName).to.be('b');
expect(result.arg[1].index).to.be(1);
expect(result.arg[1].annotations[0].name).to.be('@Annotate21');
expect(result.arg[1].annotations[0].values[0]).to.be('Foo21');
expect(result.arg[1].annotations[0].values[1]).to.be('Bar21');

expect(result.arg[1].annotations[1].name).to.be('@Annotate22');
expect(result.arg[1].annotations[1].values[0]).to.be('Foo22');
expect(result.arg[1].annotations[1].values[1]).to.be('Bar22');

expect(result.type[0].name).to.be('@Annotate31');
expect(result.type[0].values[0]).to.be('Foo31');
expect(result.type[0].values[1]).to.be('Bar31');

expect(result.type[1].name).to.be('@Annotate32');
expect(result.type[1].values[0]).to.be('Foo32');
expect(result.type[1].values[1]).to.be('Bar32');

var result = parser.parse(function( 
 	a /*@Annotate11 Foo11:Bar11 |@Annotate12 Foo12:Bar12 */ 
	,   b 
	


) /*@Annotate31 Foo31: Bar31 |@Annotate32 Foo32:Bar32 */ {
	/*@AnnotateIgnore FooIgnore:BarIgnore |@AnnotateIgnore FooIgnore:BarIgnore */
});

expect(result.arg[0].argName).to.be('a');
expect(result.arg[0].index).to.be(0);
expect(result.arg[0].annotations[0].name).to.be('@Annotate11');
expect(result.arg[0].annotations[0].values[0]).to.be('Foo11');
expect(result.arg[0].annotations[0].values[1]).to.be('Bar11');

expect(result.arg[0].annotations[1].name).to.be('@Annotate12');
expect(result.arg[0].annotations[1].values[0]).to.be('Foo12');
expect(result.arg[0].annotations[1].values[1]).to.be('Bar12');

expect(result.arg[1].argName).to.be('b');
expect(result.arg[1].index).to.be(1);
expect(result.arg[1].annotations).to.be(null);

expect(result.type[0].name).to.be('@Annotate31');
expect(result.type[0].values[0]).to.be('Foo31');
expect(result.type[0].values[1]).to.be('Bar31');

expect(result.type[1].name).to.be('@Annotate32');
expect(result.type[1].values[0]).to.be('Foo32');
expect(result.type[1].values[1]).to.be('Bar32');

var result = parser.parse(function( 
 	a /*@Annotate11 Foo11 |@Annotate12 Foo12 */ 
	,   b 
	


) /*@Annotate31 Foo31 |@Annotate32 Foo32 */ {
	/*@AnnotateIgnore FooIgnore:BarIgnore |@AnnotateIgnore FooIgnore:BarIgnore */
});
expect(result.arg[0].argName).to.be('a');
expect(result.arg[0].index).to.be(0);
expect(result.arg[0].annotations[0].name).to.be('@Annotate11');
expect(result.arg[0].annotations[0].values[0]).to.be('Foo11');
expect(result.arg[0].annotations[0].values[1]).to.be(undefined);

expect(result.arg[0].annotations[1].name).to.be('@Annotate12');
expect(result.arg[0].annotations[1].values[0]).to.be('Foo12');
expect(result.arg[0].annotations[1].values[1]).to.be(undefined);

expect(result.arg[1].argName).to.be('b');
expect(result.arg[1].index).to.be(1);
expect(result.arg[1].annotations).to.be(null);

expect(result.type[0].name).to.be('@Annotate31');
expect(result.type[0].values[0]).to.be('Foo31');
expect(result.type[0].values[1]).to.be(undefined);

expect(result.type[1].name).to.be('@Annotate32');
expect(result.type[1].values[0]).to.be('Foo32');
expect(result.type[1].values[1]).to.be(undefined);

var result = parser.parse(function( 
 	a /*@Annotate11  |@Annotate12  */ 
	,   b 
	


) /*@Annotate31  |@Annotate32  */ {
	/*@AnnotateIgnore FooIgnore:BarIgnore |@AnnotateIgnore FooIgnore:BarIgnore */
});
expect(result.arg[0].argName).to.be('a');
expect(result.arg[0].index).to.be(0);
expect(result.arg[0].annotations[0].name).to.be('@Annotate11');
expect(result.arg[0].annotations[0].values).to.be(null);

expect(result.arg[0].annotations[1].name).to.be('@Annotate12');
expect(result.arg[0].annotations[1].values).to.be(null);

expect(result.arg[1].argName).to.be('b');
expect(result.arg[1].index).to.be(1);
expect(result.arg[1].annotations).to.be(null);

expect(result.type[0].name).to.be('@Annotate31');
expect(result.type[0].values).to.be(null);

expect(result.type[1].name).to.be('@Annotate32');
expect(result.type[1].values).to.be(null);

console.log('done.');