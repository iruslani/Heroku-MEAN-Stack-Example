angular.module("fundmeApp", ['ngRoute'])
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
            // .when("/project/:projectId", {
            //     controller: "EditProjectController",
            //     templateUrl: "project.html"
            // })
            // .otherwise({
            //     redirectTo: "/"
            // })
    })
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
        // this.deleteProject = function(projectId) {
        //     var url = "/project/" + projectId;
        //     return $http.delete(url).
        //         then(function(response) {
        //             return response;
        //         }, function(response) {
        //             alert("Error deleting this project.");
        //             console.log(response);
        //         });
        // }
    })
    .controller("HomeController", function(projects, Projects, $scope) {
      var shareModal = angular.element( document.querySelector( '.ui.modal' ) );

      $scope.projects = projects.data;
      var projectData = projects.data
      $scope.showWhy = false;

      // console.log("HomeController")
      // console.log(projects.data)
      // console.log(projectData.name)

      $scope.saveMessage = "Save for later";
      $scope.addDonation = function(project) {
        var donation = this.donation
        if (!isNaN(donation) && donation > 0 ){

          project.donations = project.donations + Math.floor(donation);
          project.progress = (project.donations / project.required )*100;
          console.log(project)
          Projects.editProject(project);
          this.donation = ''
        } else {
          console.log('invalid entery');
        }
      };
      $scope.saveDonation = function() {
        $scope.saveMessage = 'Saved';
      }
      $scope.share = function() {
        shareModal.addClass('active');
        console.log(shareModal);
      }
      $scope.whyDonate = function(){
        shareModal.addClass('show');
      }
      $scope.closeModal = function(){
        shareModal.removeClass('active');
        console.log(shareModal);
      }

    })
    .controller("NewProjectController", function($scope, $location, Projects) {
        $scope.back = function() {
            $location.path("/");
        }
        $scope.createProject = function(project) {
            project.progress = 0;
            project.donations = 0;
            project.required = Math.floor(project.required)
            Projects.createProject(project).then(function(doc) {
                var projectUrl = "/project/" + doc.data._id;
                $location.path(projectUrl);
            }, function(response) {
                alert(response);
            });
        }
    })
    // .controller("EditProjectController", function($scope, $routeParams, Projects) {
    //     Projects.getProject($routeParams.contactId).then(function(doc) {
    //         $scope.project = doc.data;
    //     }, function(response) {
    //         alert(response);
    //     });
    //
    //     $scope.toggleEdit = function() {
    //         $scope.editMode = true;
    //         $scope.contactFormUrl = "project-form.html";
    //     }
    //
    //     $scope.back = function() {
    //         $scope.editMode = false;
    //         $scope.contactFormUrl = "";
    //     }
    //
    //     $scope.saveProject = function(project) {
    //         Contacts.editContact(project);
    //         $scope.editMode = false;
    //         $scope.contactFormUrl = "";
    //     }
    //
    //     $scope.deleteProject = function(projectId) {
    //         Contacts.deleteContact(projectId);
    //     }
    // });
