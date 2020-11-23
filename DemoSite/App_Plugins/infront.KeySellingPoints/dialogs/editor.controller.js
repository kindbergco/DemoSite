var app = angular.module("umbraco");
app.controller("infront.KeySellingPoints.EditorController",
function ($scope, eventsService, editorService, entityResource, contentResource, mediaHelper, userService, localizationService) {
    $scope.openMediaPicker = function (id) {
        editorService.mediaPicker({
            multiPicker: false, 
            onlyImages: true, 
            disableFolderSelect: true, 
            show: true,
            submit: function (model) {
                $scope.populatePicture(model.selection[0], id);
                $scope.setBackgroundPreview(id);
                editorService.close();
            },
            close: function () {
                editorService.close();
            }
        });
    };
    $scope.populatePicture = function (data, id) {
        switch (id) {
            case 1:
                $scope.model.editorData.ksp1Icon = JSON.stringify(data);
                break;
            case 2:
                $scope.model.editorData.ksp2Icon = JSON.stringify(data);
                break;
            case 3:
                $scope.model.editorData.ksp3Icon = JSON.stringify(data);
                break;
            case 4:
                $scope.model.editorData.ksp4Icon = JSON.stringify(data);
                break;
        }
    };
    $scope.setBackgroundPreview = function (id) {
        try {
            var obj = JSON.parse($scope.model.editorData.ksp1Icon);
            $scope.model.editorData.previewKsp1Icon = obj.image;
        } catch (ex) {
            $scope.model.editorData.previewKsp1Icon = "";
        }

        try {
            var obj = JSON.parse($scope.model.editorData.ksp2Icon);
            $scope.model.editorData.previewKsp2Icon = obj.image;
        } catch (ex) {
            $scope.model.editorData.previewKsp2Icon = "";
        }

        try {
            var obj = JSON.parse($scope.model.editorData.ksp3Icon);
            $scope.model.editorData.previewKsp3Icon = obj.image;
        } catch (ex) {
            $scope.model.editorData.previewKsp3Icon = "";
        }

        try {
            var obj = JSON.parse($scope.model.editorData.ksp4Icon);
            $scope.model.editorData.previewKsp4Icon = obj.image;
        } catch (ex) {
            $scope.model.editorData.previewKsp4Icon = "";
        }
    };
    $scope.submit = function () {
        $scope.model.submit($scope.model.editorData);
        editorService.close();
    }
    $scope.close = function () {
        editorService.close();
    }
    $scope.setBackgroundPreview();
});