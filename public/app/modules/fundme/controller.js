angular.module("app.controllers", ["app.services"])
  .controller("HomeController", function(projects, Projects, $scope) {
      var shareModal = angular.element( document.querySelector( '.ui.modal' ) );
      $scope.projects = projects.data;
      var projectData = projects.data
      $scope.showWhy = false;
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
        // shareModal.addClass('active');
        console.log('Share button triggered');
      }
      $scope.whyDonate = function(){
        shareModal.addClass('show');
      }
      $scope.closeModal = function(){
        shareModal.removeClass('active');
        console.log(shareModal);
      }
  })
  .controller("AddProjectController", function($scope, $location, Projects) {
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
  .controller("EditProjectController", function($scope, $routeParams, Projects) {
      console.log($routeParams)
      Projects.getProject($routeParams.projectId).then(function(doc) {
          $scope.project = doc.data;
      }, function(response) {
          alert(response);
      });
      $scope.saveMessage = "Save for later";
      $scope.saveDonation = function() {
        $scope.saveMessage = 'Saved';
      }
      $scope.toggleEdit = function() {
          $scope.editMode = true;
          $scope.contactFormUrl = "app/modules/fundme/templates/addProject.html";
      }

      $scope.back = function() {
          $scope.editMode = false;
          console.log('Back button clicked');
          $scope.contactFormUrl = "";
      }

      $scope.saveProject = function(project) {
          Contacts.editContact(project);
          $scope.editMode = false;
          $scope.contactFormUrl = "";
      }

      $scope.deleteProject = function(projectId) {
          console.log('delete button clicked for projectId' +projectId);
          Projects.deleteProject(projectId);
      }
  });
