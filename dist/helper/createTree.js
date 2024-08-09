"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tree = void 0;
var count = 0;
var createTree = function (arr, parentId) {
    if (parentId === void 0) { parentId = ""; }
    var tree = [];
    arr.forEach(function (element) {
        if (element.parent_id === parentId) {
            var newItem = element;
            var children = createTree(arr, element.id);
            count++;
            newItem.index = count;
            if (children.length > 0) {
                newItem.children = children;
            }
            tree.push(newItem);
        }
    });
    return tree;
};
var tree = function (arr, parentId) {
    if (parentId === void 0) { parentId = ""; }
    count = 0;
    var tree = createTree(arr, parentId = "");
    return tree;
};
exports.tree = tree;
