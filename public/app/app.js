var fundmeApp = angular.module('fundmeApp', []);

fundmeApp.controller('FundMeAppController', function($scope) {
  var shareModal = angular.element( document.querySelector( '.ui.modal' ) );
  var fundBox = this;
  var donationRequired = 200;
  $scope.progress = 0;
  $scope.showWhy = false;
  // $scope.progressbar={'min-width':'15'}

  fundBox.donationRemaining = donationRequired;
  fundBox.saveMessage = "Save for later";
  fundBox.addDonation = function() {
    console.log(!isNaN(fundBox.donation));
    if (!isNaN(fundBox.donation) && fundBox.donation > 0 ){
      fundBox.donationRemaining = fundBox.donationRemaining - fundBox.donation;
      fundBox.progressbar={'min-width':'30'};
      fundBox.donation = ''
      $scope.progress = 100 - (fundBox.donationRemaining / 2);
    } else {
      console.log('invalid entery');
    }

  };
  fundBox.saveDonation = function() {
    console.log('Saving Donation to local storage');
    fundBox.saveMessage = 'Saved';
  }
  fundBox.share = function() {
    shareModal.addClass('active');
    console.log(shareModal);
  }
  fundBox.whyDonate = function(){
    shareModal.addClass('show');
  }
  fundBox.closeModal = function(){
    shareModal.removeClass('active');
    console.log(shareModal);
  }

});
