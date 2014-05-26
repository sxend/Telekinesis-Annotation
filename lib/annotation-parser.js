'use strict';
/*@[AnnotationName] [Value1:Value2] | @[AnnotationName] [Value]*/

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
		arg: parseArgs(argAnnotationArea),
		type: parseTypes(typeAnnotationArea)
	}

	return parsedResult;
};

function parseArgs(argArea) {
	if (!argArea) {
		return null;
	}
	var args = null;
	argArea.split(',').forEach(function(arg, index) {
		var matchedArgArea = arg.match(/^\s*([\w]*?)[(\*\/)\s]/m);
		if (!matchedArgArea || !matchedArgArea[1]) {
			return;
		}
		var argName = matchedArgArea[1];
		var annotations = parseAnnotation(arg);
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

function parseTypes(typeArea) {
	if (!typeArea) {
		return null;
	}
	return parseAnnotation(typeArea);

}

function parseAnnotation(annotationArea) {
	if (!annotationArea) {
		return null;
	}
	var matchedAnnotationArea = annotationArea.match(/\/\*\s*?(@[\S\s]*?)\*\//m);
	if (!matchedAnnotationArea) {
		return null;
	}

	var result = null;
	matchedAnnotationArea[1].split('|').forEach(function(an, index) {

		var matchedAnnotationName = an.match(/^[ \t]*?(@[\w\S]*)[ \t]*?([\s\S]*)/m);
		if (!matchedAnnotationName) {
			return;
		}
		var annotation = {};
		annotation.name = matchedAnnotationName[1];
		annotation.values = null;
		matchedAnnotationName[2].split(':').forEach(function(v) {
			var value = v.trim();
			if (!value) {
				return;
			}
			if (!annotation.values) {
				annotation.values = [];
			}
			annotation.values.push(value);
		});
		if (!result) {
			result = [];
		}
		result.push(annotation);
	});
	return result;

}

module.exports = AnnotationParser;