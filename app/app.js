var fundmeApp = angular.module('fundmeApp', []);

fundmeApp.controller('FundMeAppController', function($scope) {
  var fundBox = this;
  var donationRequired = 200;
  $scope.progress = 0;
  // $scope.progressbar={'min-width':'15'}

  fundBox.donationRemaining = donationRequired;
  fundBox.addDonation = function() {
    console.log(!isNaN(fundBox.donation));
    if (!isNaN(fundBox.donation) && fundBox.donation > 0 ){
      fundBox.donationRemaining = fundBox.donationRemaining - fundBox.donation;
      fundBox.progressbar={'min-width':'30'};
      fundBox.donation = ''
      $scope.progress = 100 - (fundBox.donationRemaining / 2);
    } else {
      console.log('invalid entery');
      // var donationField = angular.element( document.querySelector( '#donationField' ) );
      // donationField.addClass('error');
    }

  };

});
