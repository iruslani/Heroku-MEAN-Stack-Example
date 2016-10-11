angular.module("fundmeApp", ["ngRoute", "app.controllers"])
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
          .when("/new/project", {
              controller: "NewProjectController",
              templateUrl: "addProject.html"
          })
          .when("/project/:projectId", {
              controller: "EditProjectController",
              templateUrl: "editProject.html"
          })
          .otherwise({
              redirectTo: "/"
          })
  })
