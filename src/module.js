"use strict";

;(function(module) {
  // source: https://gist.github.com/kuitos/89e8aa538f0a507bd682
  module.controller('RangeSliderController', ['$scope', function($scope){
    if(!$scope.step){
      $scope.step = 1;
    }
    $scope.lowerMax = $scope.max - $scope.step;
    $scope.upperMin = $scope.lowerValue + $scope.step;
    if(!$scope.lowerValue || $scope.lowerValue<$scope.min){
      $scope.lowerValue = $scope.min;
    }else{
      $scope.lowerValue*=1;
    }
    if(!$scope.upperValue || $scope.upperValue>$scope.max){
      $scope.upperValue = $scope.min;
    }else{
      $scope.upperValue*=1;
    }

    $scope.$watch('lowerValue',function(){
      if($scope.lowerValue >= $scope.upperValue - $scope.step){
        $scope.lowerValue = $scope.upperValue - $scope.step;
        return;
      }
      $scope.upperMin = $scope.lowerValue + $scope.step;
      $scope.upperWidth = ((($scope.max-($scope.lowerValue + $scope.step))/($scope.max-$scope.min)) * 100) + "%";
      if($scope.lowerValue > ($scope.upperValue - $scope.minGap) && $scope.upperValue < $scope.max) {
        $scope.upperValue = $scope.lowerValue + $scope.minGap;
      }
    });
  }]);

  module.directive('rangeSlider', function () {
    return {
      scope      : {
        max:'=',
        min:'=',
        minGap: '=',
        step:'=',
        lowerValue: "=lowerValue",
        upperValue: "=upperValue"
      },
      template: [
        '<div class="range-slider-container">',
          '<div class="range-slider-left">',
            '<md-slider aria-label="upperValue" step="{{step}}" ng-model="lowerValue" min="{{min}}" max="{{lowerMax}}"></md-slider>',
          '</div>',
          '<div class="range-slider-right" ng-style="{width: upperWidth}">',
            '<md-slider aria-label="upperValue" step="{{step}}" ng-model="upperValue" min="{{upperMin}}" max="{{max}}"></md-slider>',
          '</div>',
        '</div>'
      ].join(''),
      controller: 'RangeSliderController'
    };
  });

}(angular.module("mdRangeSlider",['ngMaterial'])));
