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
            // .when("/contact/:contactId", {
            //     controller: "EditContactController",
            //     templateUrl: "contact.html"
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
        this.createContact = function(contact) {
            return $http.post("/projects", contact).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creating contact.");
                });
        }
        this.getProject = function(contactId) {
            var url = "/projects/" + contactId;
            return $http.get(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding this contact.");
                });
        }
        this.editProject = function(project) {
            var url = "/projects/" + project._id;
            // console.log(project._id);
            // console.log(project);
            // console.log(project.progress);
            // console.log(project.progress + project.donation);
            return $http.put(url, project).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error editing this contact.");
                    console.log(response);
                });
        }
        // this.deleteProject = function(contactId) {
        //     var url = "/contacts/" + contactId;
        //     return $http.delete(url).
        //         then(function(response) {
        //             return response;
        //         }, function(response) {
        //             alert("Error deleting this contact.");
        //             console.log(response);
        //         });
        // }
    })
    .controller("HomeController", function(projects, Projects, $scope) {
      var shareModal = angular.element( document.querySelector( '.ui.modal' ) );

      $scope.projects = projects.data;
      var projectData = projects.data

      // var donationRequired = 200;
      // $scope.progress = 0;
      // var donationRequired = projects.data.fund.required;
      // $scope.progress = projects.data.fund.progress;
      $scope.showWhy = false;
      // $scope.progressbar={'min-width':'15'}

      console.log("HomeController")
      console.log(projects.data)
      console.log(projectData.name)

      // $scope.donationRemaining = donationRequired;
      $scope.saveMessage = "Save for later";
      $scope.addDonation = function(project) {
        var donation = this.donation

        // console.log(!isNaN(donation));
        if (!isNaN(donation) && donation > 0 ){
          project.donations = project.donations + Math.floor(donation);
          project.progress = (project.donations / project.required )*100;
          Projects.editProject(project);

          // $scope.donationRemaining = $scope.donationRemaining - donation;
          this.donation = ''
          // $scope.progress = 100 - ($scope.donationRemaining / 2);
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
            $location.path("#/");
        }

        $scope.saveContact = function(project) {
            Projects.createContact(project).then(function(doc) {
                var projectUrl = "/project/" + doc.data._id;
                $location.path(contactUrl);
            }, function(response) {
                alert(response);
            });
        }
    })
    // .controller("EditContactController", function($scope, $routeParams, Contacts) {
    //     Contacts.getContact($routeParams.contactId).then(function(doc) {
    //         $scope.contact = doc.data;
    //     }, function(response) {
    //         alert(response);
    //     });
    //
    //     $scope.toggleEdit = function() {
    //         $scope.editMode = true;
    //         $scope.contactFormUrl = "contact-form.html";
    //     }
    //
    //     $scope.back = function() {
    //         $scope.editMode = false;
    //         $scope.contactFormUrl = "";
    //     }
    //
    //     $scope.saveContact = function(contact) {
    //         Contacts.editContact(contact);
    //         $scope.editMode = false;
    //         $scope.contactFormUrl = "";
    //     }
    //
    //     $scope.deleteContact = function(contactId) {
    //         Contacts.deleteContact(contactId);
    //     }
    // });
