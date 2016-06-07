'use strict';

(function () {
    angular.module('gantt').component('ganttResourcesList', {
        template: `
            <div class="list-group">
                <a ng-controller="GanttTaskResourceController as resourceCtrl"
                   ng-init="resourceCtrl.init(resource)"
                   ng-repeat="resource in $ctrl.resources"
                   class="list-group-item"
                   id="task-resources-list">
                
                    <div class="left-block">
                        <h5 class="list-group-item-heading nowrap-ellipsis-text">{{resourceCtrl.name}}</h5>
                        <div class="list-group-item-text">
                            <div ng-show="resourceCtrl.projects.length > 0" class="nowrap-ellipsis-text">
                                <i>Projects :</i> {{resourceCtrl.projectsString}}
                            </div>
                            <div ng-hide="resourceCtrl.projects.length > 0" class="nowrap-ellipsis-text">
                                This resource is fully available.
                            </div>
                        </div>
                    </div>
                    <div class="middle-block">
                        <h5 class="list-group-item-heading">Employment:</h5>
                        <div class="employment-block">
                            <b>{{resourceCtrl.employmentHours}}</b> hrs. &nbsp; <b>{{resourceCtrl.employmentPercentage}}%</b>
                        </div>
                    </div>
                    <div class="right-block">
                        <span ng-click="$ctrl.onUnassign({resourceID: resource.id})" 
                              class="glyphicon glyphicon-remove" 
                              style="cursor: pointer;">
                        </span>
                    </div>
                </a> 
            </div>
            
            <div ng-show="!$ctrl.resources.length" style="padding-bottom:10px;">
                No resources assigned to this task.
            </div>
        `,
        controller: GanttResourcesListController,
        bindings: {
            onUnassign: '&',
            resources: '<'
        }
    });

    function GanttResourcesListController(GanttResourcesService){

    }
}());