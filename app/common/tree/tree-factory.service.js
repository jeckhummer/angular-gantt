(function () {
    'use strict';
    angular.module('common').service('TreeFactory', TreeFactory);

    function TreeFactory(){
        this.create = create;

        function create(data, treeDataProviderFactory){
            var tree = new Tree(data, treeDataProviderFactory);
            return tree;
        }
    }
}());