angular.module('myApp', ['ngMaterial'])
    .controller('steeringCtrl', ['$scope', '$http', '$mdDialog', '$window', function ($scope, $http, $mdDialog, $window) {

        var socket = io();

        $scope.links = false;
        $scope.rechts = false;
        $scope.connection = true;
        socket.on('status', function (data) {
            console.log(data);
            $scope.$apply(function () {
                $scope.links = data.motorLinks;
                $scope.rechts = data.motorRechts;
            });

        });
        socket.on('connection', function (data) {
            console.log(data);
            $scope.$apply(function () {
                $scope.connection = (data == 'true');
            });

        });
        $scope.msg = undefined;
        $scope.sendMsg = function () {
            socket.emit('message-send', $scope.msg);
        }
        $scope.playSong1 = function () {
            socket.emit('play-music', 1);
        }
        $scope.playSong2 = function () {
            socket.emit('play-music', 2);
        }
        var movementInfo =
        {
            forwardSpeed: 0.,
            turningDirection: 0.
        };
        const $input = document.querySelector(".msgInput");
        var ILLEGAL_CHARS = ['ä', 'Ä', 'Ö', 'ö', 'Ü', 'ü', 'ß'];
        $input.addEventListener("input", function inputCheck(event) {
            if (ILLEGAL_CHARS.includes(event.data)) {
                event.target.value = event.target.value.substring(0, event.target.value.length - 1);
            }
        });
        var keyStates = {};
        $scope.arrowButtonDown = function (key) {
            var event = {
                key: key,
                code: key
            };
            onDown(event);
        }
        function arrowButtonDown(key) {
            var event = {
                key: key,
                code: key
            };
            onDown(event);
        }
        function arrowButtonUp(key) {
            var event = {
                key: key,
                code: key
            };
            onUp(event);
        }

        const $upBtn = document.querySelector(".upBtn");
        $upBtn.onmousedown = function () { arrowButtonDown("ArrowUp") };
        $upBtn.onmouseup = function () { arrowButtonUp("ArrowUp") };
        const $downBtn = document.querySelector(".downBtn");
        $downBtn.onmousedown = function () { arrowButtonDown("ArrowDown") };
        $downBtn.onmouseup = function () { arrowButtonUp("ArrowDown") };
        const $leftBtn = document.querySelector(".leftBtn");
        $leftBtn.onmousedown = function () { arrowButtonDown("ArrowLeft") };
        $leftBtn.onmouseup = function () { arrowButtonUp("ArrowLeft") };
        const $rightBtn = document.querySelector(".rightBtn");
        $rightBtn.onmousedown = function () { arrowButtonDown("ArrowRight") };
        $rightBtn.onmouseup = function () { arrowButtonUp("ArrowRight") };

        function onDown(event) {
            var elements = document.getElementsByClassName("md-input-focused");
            if (!keyStates[event.code] && elements.length == 0) {
                var movementInfoChanged = true;

                if (event.key == 'ArrowUp') {
                    const $icon = document.querySelector(".upIcon");
                    $icon.style.setProperty("color", "rgb(120, 194, 85)", "important");
                    movementInfo.forwardSpeed += 1.;
                }
                else if (event.key == 'ArrowDown') {
                    const $icon = document.querySelector(".downIcon");
                    $icon.style.setProperty("color", "rgb(120, 194, 85)", "important");
                    movementInfo.forwardSpeed -= 1.;
                }
                else if (event.key == 'ArrowLeft') {
                    const $icon = document.querySelector(".leftIcon");
                    $icon.style.setProperty("color", "rgb(120, 194, 85)", "important");
                    movementInfo.turningDirection -= 1.;
                }
                else if (event.key == 'ArrowRight') {
                    const $icon = document.querySelector(".rightIcon");
                    $icon.style.setProperty("color", "rgb(120, 194, 85)", "important");
                    movementInfo.turningDirection += 1.;
                }
                else {
                    movementInfoChanged = false;
                }

                if (movementInfoChanged) {
                    socket.emit('movement-change', movementInfo);
                }
            }
            keyStates[event.code] = true;
        }
        document.addEventListener("keydown", onDown);
        function onUp(event) {
            var elements = document.getElementsByClassName("md-input-focused");
            if (keyStates[event.code] && elements.length == 0) {
                var movementInfoChanged = true;

                if (event.key == 'ArrowUp') {
                    const $icon = document.querySelector(".upIcon");
                    $icon.style.setProperty("color", "black", "important");
                    movementInfo.forwardSpeed -= 1.;
                }
                else if (event.key == 'ArrowDown') {
                    const $icon = document.querySelector(".downIcon");
                    $icon.style.setProperty("color", "black", "important");
                    movementInfo.forwardSpeed += 1.;
                }
                else if (event.key == 'ArrowLeft') {
                    const $icon = document.querySelector(".leftIcon");
                    $icon.style.setProperty("color", "black", "important");
                    movementInfo.turningDirection += 1.;
                }
                else if (event.key == 'ArrowRight') {
                    const $icon = document.querySelector(".rightIcon");
                    $icon.style.setProperty("color", "black", "important");
                    movementInfo.turningDirection -= 1.;
                }
                else {
                    movementInfoChanged = false;
                }

                if (movementInfoChanged) {
                    socket.emit('movement-change', movementInfo);
                }
            }

            keyStates[event.code] = false;
        }
        document.addEventListener("keyup", onUp);

        $scope.settings = function ($event) {
            $mdDialog.show({
                controller: SettingsController,
                templateUrl: 'settings.html',
                // Appending dialog to document.body to cover sidenav in docs app
                // Modal dialogs should fully cover application to prevent interaction outside of dialog
                parent: angular.element(document.body),
                targetEvent: $event,
                clickOutsideToClose: true
            }).then(function (answer) {
                document.getElementById("imageid").src = answer;

            }, function () {

            });
        }
        $scope.settings();
        function SettingsController($scope, $mdDialog) {
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }

    }]);