'use strict';
/*@[AnnotationName] [Value1:Value2] | @[AnnotationName] [Value]*/

var Regexs = {
	functionRegex: /^function [\w\$]*?\(([\s\S]*?)\)([\s\S]*?)\{/m,
	argumentAreaRegex: /^\s*([\w\$]*)/m,
	annotationAreaRegex: /\/\*\s*(@[\S\s]*?)\s*\*\//m,
	annotationRegex: /^\s*(@[\w\$]*)[ \t]*?([\s\S]*)/m
}
var trim = Function.prototype.call.bind(String.prototype.trim);

var noEmpty = function(s) {
	return s;
}

function AnnotationParser() {};

AnnotationParser.prototype.parse = function(func) {
	if (!func) {
		return null;
	}
	var matchedString = func.toString().match(Regexs.functionRegex) || [];
	return {
		arg: parseArgs(matchedString[1] || ""),
		type: parseAnnotation(matchedString[2] || "")
	};
};

function parseArgs(argArea) {
	var regex = Regexs.argumentAreaRegex.exec.bind(Regexs.argumentAreaRegex);
	var existName = function(arg) {
		return arg && arg[1];
	}
	var result = argArea.split(',').map(regex).filter(existName).map(function(arg) {
		return {
			name: arg[1],
			annotations: parseAnnotation(arg.input)
		};
	});
	return result.length == 0 ? null : result;
}
var __cache = {};

function parseAnnotation(annotationArea) {
	if(__cache[annotationArea]){
		return __cache[annotationArea];
	}
	annotationArea = (annotationArea.match(Regexs.annotationAreaRegex) || [])[1] || "";
	var regex = Regexs.annotationRegex.exec.bind(Regexs.annotationRegex);
	var result = annotationArea.split('|').map(regex).filter(noEmpty).map(function(ann) {
		return {
			name: ann[1],
			values: parseAnnotationValue(ann[2])
		};
	});
	result = __cache[annotationArea] = (result.length == 0 ? null : result);
	return result;
}

function parseAnnotationValue(valueArea) {
	var result = valueArea.split(':').map(trim).filter(noEmpty)
	return result.length == 0 ? null : result;
}
module.exports = AnnotationParser;