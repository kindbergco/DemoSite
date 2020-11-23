angular.module("umbraco").controller("infront.KeySellingPoints.Controller", function ($scope, editorService) {
    $scope.control.dialog = null;
    $scope.openEditor = function () {
        var model = angular.copy($scope.control);

        $scope.dialog = editorService.open({
            editorData: model,
            title: 'Key selling points',
            view: '/App_Plugins/infront.KeySellingPoints/dialogs/editor.html',
            show: true,
            size: 'small',
            submit: function (data) {
                $scope.setupControl(data);
            },
            close: function (data) {
                editorService.close();
            }
        });
    };
    $scope.setupControl = function (data) {
        $scope.control.ksp1Icon = data.ksp1Icon;
        $scope.control.ksp1Label = data.ksp1Label;
        $scope.control.ksp1Text = data.ksp1Text;

        $scope.control.ksp2Icon = data.ksp2Icon;
        $scope.control.ksp2Label = data.ksp2Label;
        $scope.control.ksp2Text = data.ksp2Text;

        $scope.control.ksp3Icon = data.ksp3Icon;
        $scope.control.ksp3Label = data.ksp3Label;
        $scope.control.ksp3Text = data.ksp3Text;

        $scope.control.ksp4Icon = data.ksp4Icon;
        $scope.control.ksp4Label = data.ksp4Label;
        $scope.control.ksp4Text = data.ksp4Text;

        $scope.control.css = data.css;
        $scope.control.value = JSON.stringify(data);

        $scope.setBackground();
    }
    $scope.setBackground = function () {
        try {
            var obj = JSON.parse($scope.control.ksp1Icon);
            $scope.control.previewKsp1Icon = obj.image;
        } catch (ex) {
            $scope.control.previewKsp1Icon = "";
        }
        try {
            var obj = JSON.parse($scope.control.ksp2Icon);
            $scope.control.previewKsp2Icon = obj.image;
        } catch (ex) {
            $scope.control.previewKsp2Icon = "";
        }
        try {
            var obj = JSON.parse($scope.control.ksp3Icon);
            $scope.control.previewKsp3Icon = obj.image;
        } catch (ex) {
            $scope.control.previewKsp3Icon = "";
        }
        try {
            var obj = JSON.parse($scope.control.ksp4Icon);
            $scope.control.previewKsp4Icon = obj.image;
        } catch (ex) {
            $scope.control.previewKsp4Icon = "";
        }
    };
    if ($scope.control.value != null) {
        $scope.setupControl(JSON.parse($scope.control.value));
    }
    $scope.setBackground();
});
