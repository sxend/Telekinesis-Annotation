/*@[AnnotationName] [Value1:Value2] | @[AnnotationName] [Value]*/
var os = require('os');
var AnnotationParser = function() {

};

AnnotationParser.prototype.parse = function(func) {
	if (!func) {
		return null;
	}
	var matchedString = func.toString().match(/^function \(([\s\S]*?)\)([\s\S]*?)\{/m);
	if (!matchedString) {
		return null;
	}

	var argAnnotationArea = matchedString[1];
	var typeAnnotationArea = matchedString[2];
	var parsedResult = {
		arg: parseArg(argAnnotationArea),
		type: parseType(typeAnnotationArea)
	}

	return parsedResult;
};

function parseArg(argArea) {
	if (!argArea) {
		return null;
	}
	var args = null;
	argArea.split(',').forEach(function(arg, index) {
		var argArea = arg.match(/^\s*([\w]*?)\s/m);
		if (!argArea) {
			return;
		}
		var argName = argArea[1];
		annotations = parseAnnotation(arg);
		if (!args) {
			args = [];
		}
		args.push({
			argName: argName,
			index: index,
			annotations: annotations
		});
	});
	return args;
}

function parseType(typeArea) {
	if (!typeArea) {
		return null;
	}
	return parseAnnotation(typeArea);

}

function parseAnnotation(annotationArea) {
	if (!annotationArea) {
		return null;
	}
	var annotations = annotationArea.match(/\/\*\s*?(@[\S\s]*?)\*\//m);
	if (!annotations) {
		return null;
	}
	annotations = annotations[1];
	var result = null;
	annotations.split('|').forEach(function(an, index) {
		var r = an.match(/(@[\s\S]*)/m);
		var annotation = an.match(/(@[\s\S]*?)\s([\s\S]*)/m);
		var obj = {};
		obj.name = annotation[1];
		obj.values = null;
		annotation[2].split(':').forEach(function(v) {
			var value = v.trim();
			if (!value) {
				return;
			}
			if (!obj.values) {
				obj.values = [];
			}
			obj.values.push(value);
		});
		if (!result) {
			result = [];
		}
		return result.push(obj);
	});
	return result;

}

module.exports = AnnotationParser;