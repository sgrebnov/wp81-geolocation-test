(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {

            args.setPromise(WinJS.UI.processAll().
                done(function () {

                    // Add an event handler to the button.
                    document.querySelector("#watchLoc").addEventListener("click", watchloc);

                    // Add an event handler to the button.
                    document.querySelector("#stopWatching").addEventListener("click", stopwatching);

                }));
        }
    };

    var loc = null;
    var watchId;

    function watchloc() {
        if (loc == null) {
            loc = window.navigator.geolocation;
        }

        if (loc != null) {
            watchId = loc.watchPosition(successCallback, errorCallback);
        }

        //new Windows.Devices.Geolocation.Geolocator().getGeopositionAsync().then(
        //        function (pos) {
                    
        //        },
        //        function (err) {
                    
        //        }
        //    );

    }

    function stopwatching() {
        loc.clearWatch(watchId);
    }

    function successCallback(pos) {
        document.getElementById('latitude').innerHTML = pos.coords.latitude;
        document.getElementById('longitude').innerHTML = pos.coords.longitude;
        document.getElementById('accuracy').innerHTML = pos.coords.accuracy;
    }

    function errorCallback(error) {
        var strMessage = "";

        // Check for known errors
        switch (error.code) {
            case error.PERMISSION_DENIED:
                strMessage = "Access to your location is turned off. " +
                    "Change your settings to turn it back on.";
                break;
            case error.POSITION_UNAVAILABLE:
                strMessage = "Data from location services is " +
                    "currently unavailable.";
                break;
            case error.TIMEOUT:
                strMessage = "Location could not be determined " +
                    "within a specified timeout period.";
                break;
            default:
                break;
        }
        document.getElementById("status").innerHTML = strMessage;
    }


    app.start();
})();