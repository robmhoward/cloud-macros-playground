'use strict';

var cloudMacrosApp = angular.module("cloudMacrosApp", ['ngRoute', 'AdalAngular', 'officeuifabric.core', 'officeuifabric.components.navbar']);

var rootUrl = document.location;

//Office.initialize = function (reason) {
//};

cloudMacrosApp.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {
	$routeProvider
		.when('/splash',
			{
				controller: 'SplashController',
				templateUrl: 'partials/splash.html'
			})
		.when('/home',
			{
				controller: 'HomeController',
				templateUrl: 'partials/home.html'
			})
		.when('/favorites',
			{
				controller: 'FavoritesController',
				templateUrl: 'partials/scriptsBrowser.html'
			})
		.when('/myScripts',
			{
				controller: 'MyScriptsController',
				templateUrl: 'partials/scriptsBrowser.html'
			})
		.when('/orgScripts',
			{
				controller: 'OrgScriptsController',
				templateUrl: 'partials/scriptsBrowser.html'
			})
		.when('/globalScripts',
			{
				controller: 'GlobalScriptsController',
				templateUrl: 'partials/scriptsBrowser.html'
			})
		.when('/help',
			{
				controller: 'HelpController',
				templateUrl: 'partials/help.html'
			})
		.when('/codeEditor/:scriptId',
			{
				controller: 'CodeEditorController',
				templateUrl: 'partials/codeEditor.html'
			})
		.otherwise({redirectTo: '/splash' });
}]);

cloudMacrosApp.factory("scriptsFactory", ['$http', function ($http) {
	var factory = {};
	
	factory.getScripts = function(app) {
		return $http.get(app + '-snippets/samples.json');
	};

	factory.getScript = function(app, filename) {
		return $http.get(app + '-snippets/' + filename);
	};
	
	factory.getMyScripts = function() {
		return $http.get('api/me/scripts');
	}
	
	factory.getFavoriteScripts = function() {
		return $http.get('api/me/favorites');
	}
	
	factory.getPublicScripts = function() {
		return $http.get('api/scripts');
	}
	
	factory.getOrgScripts = function() {
		return $http.get('api/org/scripts');
	}

	return factory;
}]);

cloudMacrosApp.controller("NavController", function($scope, $location) {
	
	$scope.topNavLinks = [
		{label: "Home", route: "/home"},
		{label: "Favorites", route: "/favorites"},
		{label: "My Scripts", route: "/myScripts"},
		{label: "Organization Scripts", route: "/orgScripts"},
		{label: "Public Scripts", route: "/globalScripts"},
		{label: "Help", route: "/help"}
	];
	
	$scope.select = function(route) {
		$location.path(route);
	}
});

cloudMacrosApp.controller("SplashController", function($scope, scriptsFactory) {
	
});

cloudMacrosApp.controller("HomeController", function($scope, scriptsFactory) {
	
});

cloudMacrosApp.controller("FavoritesController", function($scope, scriptsFactory) {
	$scope.viewTitle = "My Favorites";
	$scope.scripts = [{title: "Loading..."}];
	
	scriptsFactory.getFavoriteScripts().then(function (response) {
		$scope.scripts = response.data;
	});	
});

cloudMacrosApp.controller("MyScriptsController", function($scope, scriptsFactory) {
	$scope.viewTitle = "My Scripts";
	$scope.scripts = [{title: "Loading..."}];
	
	scriptsFactory.getMyScripts().then(function (response) {
		$scope.scripts = response.data;
	});
});

cloudMacrosApp.controller("OrgScriptsController", function($scope, scriptsFactory) {
	$scope.viewTitle = "Organization Scripts";
	$scope.scripts = [{title: "Loading..."}];
	
	scriptsFactory.getOrgScripts().then(function (response) {
		$scope.scripts = response.data;
	});
});

cloudMacrosApp.controller("GlobalScriptsController", function($scope, scriptsFactory) {
	$scope.viewTitle = "Public Scripts";
	$scope.scripts = [{title: "Loading..."}];
	
	scriptsFactory.getPublicScripts().then(function (response) {
		$scope.scripts = response.data;
	});	
});

cloudMacrosApp.controller("HelpController", function($scope, scriptsFactory) {
	
});

cloudMacrosApp.controller("CodeEditorController", function($scope, $routeParams, scriptsFactory) {
	
});


cloudMacrosApp.controller("SamplesController", function($scope, $routeParams, snippetFactory) {
	$scope.samples = [{ name: "Loading..." }];
	$scope.selectedSample = { description: "No snippet loaded" };
	$scope.insideOffice = insideOffice;
	
	CodeEditorIntegration.initializeJsEditor('TxtRichApiScript', [
			"/editorIntelliSense/ExcelLatest.txt",
			"/editorIntelliSense/WordLatest.txt",
			"/editorIntelliSense/OfficeCommon.txt",
			"/editorIntelliSense/OfficeDocument.txt"
	]);
	
	CodeEditorIntegration.setDirty = function() {
		if ($scope.selectedSample.code) {
			$scope.selectedSample = { description: $scope.selectedSample.description + " (modified)" };
			$scope.$apply();
		}
	}
	
	snippetFactory.getSamples($routeParams["app"]).then(function (response) {
		$scope.samples = response.data.values;
		$scope.groups = response.data.groups;
	});

	$scope.loadSampleCode = function() {
		appInsights.trackEvent("SampleLoaded", {name:$scope.selectedSample.name});
		snippetFactory.getSampleCode($routeParams["app"], $scope.selectedSample.filename).then(function (response) {
            $scope.selectedSample.code = addErrorHandlingIfNeeded(response.data);
			$scope.insideOffice = insideOffice;
			CodeEditorIntegration.setJavaScriptText($scope.selectedSample.code);
			CodeEditorIntegration.resizeEditor();
		});
	};
	
	$scope.runSelectedSample = function() {
		var script = CodeEditorIntegration.getJavaScriptToRun().replace(/console.log/g, "logComment");
		
		if (isTrulyJavaScript(script)) {
			try {
				eval(script);
			} catch (e) {
				logComment(e.name + ": " + e.message);
			}	
		} else {
			CodeEditorIntegration.getEditorTextAsJavaScript().then(function (output) {
				if (output == null) {
					logComment("Invalid JavaScript / TypeScript. Please fix the errors shown in the code editor and try again.");
				} else {
					eval(output.content);
				}
			});
		}	
	}
});

cloudMacrosApp.controller("TestAllController", function($scope, $q, snippetFactory) {
	$scope.insideOffice = insideOffice;

	snippetFactory.getSamples().then(function (response) {
		$scope.samples = response.data.values;
		$scope.groups = response.data.groups;
	});

	$scope.loadSampleCode = function() {
		appInsights.trackEvent("SampleLoaded", {name:$scope.selectedSample.name});

	};

	$scope.runSamples = function() {
		
		var promiseProducingSampleFunctions = new Array();
		
		for (var i = 1; i < $scope.samples.length; i++) {
			promiseProducingSampleFunctions.push(createRunSample(i));
		}
		
		var result = createRunSample(0);
		result = result();
		promiseProducingSampleFunctions.forEach(function (f) {
			result = result.then(f);
		});
		
		function createRunSample(sampleIndex) {
			
			var sample = $scope.samples[sampleIndex];
			
			return function() {
				var deferred = $q.defer();
				//logComment("running next call");
				sample.runStatus = "Loading";
				snippetFactory.getSampleCode(sample.filename).then(function (response) {
					sample.code = addTestResults(addDeferredErrorHandling(response.data)).replace(/console.log/g, "logComment");
					sample.runStatus = "Running";
					try {
						//logComment(sample.code);
						eval(sample.code);
					} catch (e) {
						sample.runStatus = "Error: " + e.name + ": " + e.message;
						deferred.resolve();
					}
				});
				
				return deferred.promise;
			}
		}
	}
	
	$scope.refreshResults = function() {
		$scope.$apply();
	}

});

function addTestResults(sampleCode) {
	return sampleCode.replace("console.log(\"done\");", "sample.runStatus = \"Success\"; deferred.resolve();");
}

function addDeferredErrorHandling(sampleCode) {
	return sampleCode.replace("ctx.executeAsync().then();", "ctx.executeAsync().then(function() {\r\n    console.log(\"done\");\r\n}, function(error) {\r\n    sample.runStatus = \"Error: \" + error.errorCode + \":\" + error.errorMessage; deferred.resolve(); });");
}

function addErrorHandling(sampleCode) {
	return sampleCode.replace("\r\n}).catch(function (error) {\r\n	console.log(error);\r\n});", "\r\n}).catch(function(error) {\r\n    console.log(\"Error: \" + error);\r\n    if (error instanceof OfficeExtension.Error) {\r\n        console.log(\"Debug info: \" + JSON.stringify(error.debugInfo));\r\n    }\r\n});");
}

function addErrorHandlingIfNeeded(sampleCode) {
	if (!insideOffice) return sampleCode;
	return addErrorHandling(sampleCode);	
}

/** returns whether the text is truly javascript (as opposed to typescript) */
function isTrulyJavaScript(text) {
	try {
		new Function(text);
		return true;
	} catch (syntaxError) {
		return false;
	}
}

