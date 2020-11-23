angular.module('umbraco').controller('kindbergco.SettingsCheckboxList.icon-select-list.controller', function ($scope, $http, $routeParams, assetsService, contentResource, notificationsService) {

    assetsService.loadCss('/App_Plugins/kindbergco.SettingsCheckboxList/styles/style.css');

  $scope.items = $scope.model.defaultConfig ? $scope.model.defaultConfig.items : $scope.model.config.items;
 
  if ($scope.model.value) {
    var values = $scope.model.value.split(' ');
    for (var y = 0; y < values.length; y++) {
      for (var i = 0; i < $scope.items.length; i++) {
        if (!$scope.items[i].selected) {
          $scope.items[i].selected = $scope.items[i].value === values[y];
        }
      }
    }
  }
 
  $scope.select = function (item) {
    if ($scope.model.defaultConfig.selectMultiple) {
      item.selected = !item.selected;
    } else {
      if (!item.selected) {
        for (var i = 0; i < $scope.items.length; i++) {
          $scope.items[i].selected = false;
        }
        item.selected = true;
      } else {
        item.selected = false;
      }
    }
    $scope.setValue();
  };
 
  $scope.setValue = function () {
    $scope.model.value = '';
    for (var i = 0; i < $scope.items.length; i++) {
      if ($scope.items[i].selected) {
        $scope.model.value += $scope.items[i].value + ' ';
      }
    }
  };
});