angular.module("app.services", [])
  .service("Projects", function($http) {
      this.getProjects = function() {
          return $http.get("/projects").
              then(function(response) {
                  console.log("Projects Service")
                  console.log(response.data)
                  return response;
              }, function(response) {
                  alert("Error finding contacts.");
              });
      }
      this.createProject = function(project) {
          return $http.post("/projects", project).
              then(function(response) {
                  return response;
              }, function(response) {
                  alert("Error creating contact.");
              });
      }
      this.getProject = function(projectId) {
          var url = "/projects/" + projectId;
          return $http.get(url).
              then(function(response) {
                  return response;
              }, function(response) {
                  alert("Error finding this contact.");
              });
      }
      this.editProject = function(project) {
          var url = "/projects/" + project._id;
          return $http.put(url, project).
              then(function(response) {
                  return response;
              }, function(response) {
                  alert("Error editing this contact.");
                  console.log(response);
              });
      }
      this.deleteProject = function(projectId) {
          var url = "/project/" + projectId;
          return $http.delete(url).
              then(function(response) {
                  return response;
              }, function(response) {
                  alert("Error deleting this project.");
                  console.log(response);
              });
      }
  })
