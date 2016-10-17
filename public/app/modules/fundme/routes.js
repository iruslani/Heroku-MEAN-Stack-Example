angular.module("app.routes", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "app/modules/fundme/templates/projects.html",
                controller: "HomeController",
                resolve: {
                    projects: function(Projects) {
                        return Projects.getProjects();
                    }
                }
            })
            .when("/project/new", {
                controller: "AddProjectController",
                templateUrl: "app/modules/fundme/templates/addProject.html"
            })
            .when("/project/edit/:projectId", {
                controller: "AddProjectController",
                templateUrl: "app/modules/fundme/templates/editProject.html"
            })
            .when("/project/:projectId", {
                controller: "EditProjectController",
                templateUrl: "app/modules/fundme/templates/project.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
