angular.module("app.routes", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "projects.html",
                controller: "HomeController",
                resolve: {
                    projects: function(Projects) {
                        return Projects.getProjects();
                    }
                }
            })
            .when("/project/new", {
                controller: "AddProjectController",
                templateUrl: "addProject.html"
            })
            .when("/project/edit/:projectId", {
                controller: "AddProjectController",
                templateUrl: "editProject.html"
            })
            .when("/project/:projectId", {
                controller: "EditProjectController",
                templateUrl: "project.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
