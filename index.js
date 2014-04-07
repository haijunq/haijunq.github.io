/*
var c = undefined; 
var ctx = undefined;

$(document).ready(function() {
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	drawTriangle(50,400,1100,400,600,50);
});

function drawTriangle(x0, y0, x1, y1, x2, y2) {
	var stage = new createjs.Stage("canvas");
	var triangle = new createjs.Shape();
	triangle.graphics.beginStroke("black");
	triangle.graphics.moveTo(x0,y0).lineTo(x1,y1).lineTo(x2,y2).lineTo(x0,y0);
	triangle.graphics.endStroke("black");
	stage.addChild(triangle);
	stage.update();
}

*/

"use strict";
var basename = "Code Relay Project "; 
var baseid = "code_relay_project_";
var projectList = [];
var count=1;

$(document).ready(function(){
	$("#start_new_button").on("click", addNewProject);
	$("#initial_button").on("click", initCode);
	$("#start_new_button").attr('disable', true);
	$(document).on("click","a.delete",deleteTRNode);
});

function addNewProject() {
	if ($("#start_new_button").attr("disable") == "true") {
		alert("Please choose an initial code snippet first.")
		return;
	}
	var node = makeIdDOMNode("tr", baseid + count);
	node.innerHTML = "<li><a>" + basename + count + "</a><a class=\"delete\" href=\"\">X</a></li>";
	$("#projectList").append(node);
	count ++;
	$("#iframe").attr('src', 'blank.html');
	$("#start_new_button").attr('disable', true);
}

function initCode() {
	$("#iframe").contents().find('html').find('head').remove();
	$("#iframe").contents().find('html').find('body').attr('bgcolor',"#E6E6FA");
	$("#iframe").contents().find('html').find('body').html("<pre>" + rcodearray[Math.floor(Math.random() * rcodearray.length)] + "</pre>");
	$("#start_new_button").attr('disable', false);
}

function alertme() {
	alert("me");
}

function makeSimpleDOMNode(tagName, text) {
	var simpleNode = document.createElement(tagName);
	simpleNode.innerHTML = unescape(text);
	return simpleNode;
}

function makeIdDOMNode(tagName, id) {
	var idNode = document.createElement(tagName);
	idNode.setAttribute("id", id);
	return idNode;
}

function deleteTRNode(event) {
	event.preventDefault();
	$(this).parent().remove();
}

