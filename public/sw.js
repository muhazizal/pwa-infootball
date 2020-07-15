/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JJ5d");
/******/ })
/************************************************************************/
/******/ ({

/***/ "JJ5d":
/***/ (function(module, exports) {

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');
workbox.core.skipWaiting();
workbox.core.clientsClaim(); // Register route

workbox.routing.registerRoute(function (_ref) {
  var url = _ref.url;
  return url.origin;
}, new workbox.strategies.StaleWhileRevalidate()); // Push notification

self.addEventListener('push', function (event) {
  var body;

  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }

  var options = {
    body: body,
    icon: './assets/icons/favicon.png',
    badge: './assets/icons/favicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(self.registration.showNotification('Push Notification', options));
}); // Precaching file

workbox.precaching.precacheAndRoute([{'revision':'e79bfd88537def476913f3ed52f4f4b3','url':'MaterialIcons-Regular.eot'},{'revision':'a37b0c01c0baf1888ca812cc0508f6e2','url':'MaterialIcons-Regular.ttf'},{'revision':'012cf6a10129e2275d79d6adac7f3b02','url':'MaterialIcons-Regular.woff'},{'revision':'570eb83859dc23dd0eec423a49e147fe','url':'MaterialIcons-Regular.woff2'},{'revision':'9dbde1b590469340c9b7b0ba5b1a4ded','url':'assets/android/icon_128x128.9dbde1b590469340c9b7b0ba5b1a4ded.png'},{'revision':'cbca9f7255aa157c755316073c7580da','url':'assets/android/icon_192x192.cbca9f7255aa157c755316073c7580da.png'},{'revision':'7383c7232f0d560187ff0f849c094e9a','url':'assets/android/icon_256x256.7383c7232f0d560187ff0f849c094e9a.png'},{'revision':'1b2675a8d2e68ba2045cd39d6f572ad8','url':'assets/android/icon_384x384.1b2675a8d2e68ba2045cd39d6f572ad8.png'},{'revision':'02953771ff7ba1ba394d75b70d22859c','url':'assets/android/icon_512x512.02953771ff7ba1ba394d75b70d22859c.png'},{'revision':'adc9d3a33f08ebca5de64a158ba03d7a','url':'assets/android/icon_96x96.adc9d3a33f08ebca5de64a158ba03d7a.png'},{'revision':'e4be015da3a66804b8d7c4877bae610a','url':'assets/images/404-not-found.8f6dd087143091f41328ce4c581bf15a.svg'},{'revision':'85b3fdd99fc98c6743beacbbfa2f216d','url':'assets/images/cannot-access.223e94d433fd596d537479268d9bd249.svg'},{'revision':'7b98ae11ea4061b22ad9b751b750bba8','url':'assets/images/empty-data.02cec8506d7554bbb1203a85baa58d0d.svg'},{'revision':'a51e1057299e5f2d288ab26ebda466b8','url':'assets/images/laliga.e9259d2527213234a78977eb438c31e9.svg'},{'revision':'76fd81d690fa9e7ae60a4e69e9f8c78e','url':'assets/images/premier.b991cc88fae07bad71da4e7188c469f1.svg'},{'revision':'49f6b9bb49e3d002b6624f3df4f54fff','url':'assets/images/serieA.ec4f9e4c1fba363f66ff09adc5ac907d.svg'},{'revision':'8e52f68928785a5b785572e6dd30edb3','url':'assets/ios/icon_1024x1024.8e52f68928785a5b785572e6dd30edb3.png'},{'revision':'624ed1059947e4650a3c8bf05a655eea','url':'assets/ios/icon_120x120.624ed1059947e4650a3c8bf05a655eea.png'},{'revision':'8ee903ddea132aed2d5640ec771ede77','url':'assets/ios/icon_152x152.8ee903ddea132aed2d5640ec771ede77.png'},{'revision':'ec9c00e7606731cd81e3b9fcc56a9d0a','url':'assets/ios/icon_167x167.ec9c00e7606731cd81e3b9fcc56a9d0a.png'},{'revision':'8b566bcf802b9cacff9f7f9f44e72a42','url':'assets/ios/icon_180x180.8b566bcf802b9cacff9f7f9f44e72a42.png'},{'revision':'8726ddd83e069cf1cabb38e579382b46','url':'competition.html'},{'revision':'acade2dc54829fe60c386170aaa85788','url':'favicon.png'},{'revision':'4e6ce50b0291adbf19b46aef1a1adfc6','url':'html/navbar.html'},{'revision':'a9df12d9d3a39a0929f1544fc6e450b3','url':'html/pages/favorite.html'},{'revision':'b4863bfb77a0be57c977ede34a8941ee','url':'html/pages/home.html'},{'revision':'e702b76dd311bad577070b754ad57f7d','url':'html/pages/matches.html'},{'revision':'dc75c93a8857631076f720059bfbfb5e','url':'html/pages/standing.html'},{'revision':'51e3341356605a1a81e48741516bcff7','url':'html/pages/teams.html'},{'revision':'9b145b9937b5bc19d9f2f47adbab5014','url':'html/tabs.html'},{'revision':'561f7188121550dfe85ade8e35c2f6be','url':'index.html'},{'revision':'ac882389e08cebcefe021475f23ea4eb','url':'js/main.8b78f984bc83d834f4e3.js'},{'revision':'47c62105854500dafa403d3eb1bb0467','url':'js/vendors.2e701ce8c7105d593dfd.js'},{'revision':'db7f6b5a5327e438762491201c4eeb7a','url':'main.73ff16ab82d6d9e3a618.css'},{'revision':'3efc3cfc4069efa36ed9836da5281f15','url':'manifest.3efc3cfc4069efa36ed9836da5281f15.json'},{'revision':'8aaf339a22fd7287e176b91c82643fa5','url':'vendors.73ff16ab82d6d9e3a618.css'}]);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N3LmpzIl0sIm5hbWVzIjpbImltcG9ydFNjcmlwdHMiLCJ3b3JrYm94IiwiY29yZSIsInNraXBXYWl0aW5nIiwiY2xpZW50c0NsYWltIiwicm91dGluZyIsInJlZ2lzdGVyUm91dGUiLCJ1cmwiLCJvcmlnaW4iLCJzdHJhdGVnaWVzIiwiU3RhbGVXaGlsZVJldmFsaWRhdGUiLCJzZWxmIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiYm9keSIsImRhdGEiLCJ0ZXh0Iiwib3B0aW9ucyIsImljb24iLCJiYWRnZSIsInZpYnJhdGUiLCJkYXRlT2ZBcnJpdmFsIiwiRGF0ZSIsIm5vdyIsInByaW1hcnlLZXkiLCJ3YWl0VW50aWwiLCJyZWdpc3RyYXRpb24iLCJzaG93Tm90aWZpY2F0aW9uIiwicHJlY2FjaGluZyIsInByZWNhY2hlQW5kUm91dGUiLCJfX1dCX01BTklGRVNUIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7OztBQ2xGQUEsYUFBYSxDQUFDLHlFQUFELENBQWI7QUFFQUMsT0FBTyxDQUFDQyxJQUFSLENBQWFDLFdBQWI7QUFDQUYsT0FBTyxDQUFDQyxJQUFSLENBQWFFLFlBQWIsRyxDQUVBOztBQUNBSCxPQUFPLENBQUNJLE9BQVIsQ0FBZ0JDLGFBQWhCLENBQThCO0FBQUEsTUFBR0MsR0FBSCxRQUFHQSxHQUFIO0FBQUEsU0FBYUEsR0FBRyxDQUFDQyxNQUFqQjtBQUFBLENBQTlCLEVBQXVELElBQUlQLE9BQU8sQ0FBQ1EsVUFBUixDQUFtQkMsb0JBQXZCLEVBQXZELEUsQ0FFQTs7QUFDQUMsSUFBSSxDQUFDQyxnQkFBTCxDQUFzQixNQUF0QixFQUE4QixVQUFBQyxLQUFLLEVBQUk7QUFDdEMsTUFBSUMsSUFBSjs7QUFFQSxNQUFJRCxLQUFLLENBQUNFLElBQVYsRUFBZ0I7QUFDZkQsUUFBSSxHQUFHRCxLQUFLLENBQUNFLElBQU4sQ0FBV0MsSUFBWCxFQUFQO0FBQ0EsR0FGRCxNQUVPO0FBQ05GLFFBQUksR0FBRyx5QkFBUDtBQUNBOztBQUVELE1BQU1HLE9BQU8sR0FBRztBQUNmSCxRQUFJLEVBQUVBLElBRFM7QUFFZkksUUFBSSxFQUFFLDRCQUZTO0FBR2ZDLFNBQUssRUFBRSw0QkFIUTtBQUlmQyxXQUFPLEVBQUUsQ0FBQyxHQUFELEVBQU0sRUFBTixFQUFVLEdBQVYsQ0FKTTtBQUtmTCxRQUFJLEVBQUU7QUFDTE0sbUJBQWEsRUFBRUMsSUFBSSxDQUFDQyxHQUFMLEVBRFY7QUFFTEMsZ0JBQVUsRUFBRTtBQUZQO0FBTFMsR0FBaEI7QUFXQVgsT0FBSyxDQUFDWSxTQUFOLENBQWdCZCxJQUFJLENBQUNlLFlBQUwsQ0FBa0JDLGdCQUFsQixDQUFtQyxtQkFBbkMsRUFBd0RWLE9BQXhELENBQWhCO0FBQ0EsQ0FyQkQsRSxDQXVCQTs7QUFDQWhCLE9BQU8sQ0FBQzJCLFVBQVIsQ0FBbUJDLGdCQUFuQixDQUFvQ2xCLElBQUksQ0FBQ21CLGFBQXpDLEUiLCJmaWxlIjoic3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCJKSjVkXCIpO1xuIiwiaW1wb3J0U2NyaXB0cygnaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL3dvcmtib3gtY2RuL3JlbGVhc2VzLzUuMS4zL3dvcmtib3gtc3cuanMnKTtcclxuXHJcbndvcmtib3guY29yZS5za2lwV2FpdGluZygpO1xyXG53b3JrYm94LmNvcmUuY2xpZW50c0NsYWltKCk7XHJcblxyXG4vLyBSZWdpc3RlciByb3V0ZVxyXG53b3JrYm94LnJvdXRpbmcucmVnaXN0ZXJSb3V0ZSgoeyB1cmwgfSkgPT4gdXJsLm9yaWdpbiwgbmV3IHdvcmtib3guc3RyYXRlZ2llcy5TdGFsZVdoaWxlUmV2YWxpZGF0ZSgpKTtcclxuXHJcbi8vIFB1c2ggbm90aWZpY2F0aW9uXHJcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcigncHVzaCcsIGV2ZW50ID0+IHtcclxuXHRsZXQgYm9keTtcclxuXHJcblx0aWYgKGV2ZW50LmRhdGEpIHtcclxuXHRcdGJvZHkgPSBldmVudC5kYXRhLnRleHQoKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ym9keSA9ICdQdXNoIG1lc3NhZ2Ugbm8gcGF5bG9hZCc7XHJcblx0fVxyXG5cclxuXHRjb25zdCBvcHRpb25zID0ge1xyXG5cdFx0Ym9keTogYm9keSxcclxuXHRcdGljb246ICcuL2Fzc2V0cy9pY29ucy9mYXZpY29uLnBuZycsXHJcblx0XHRiYWRnZTogJy4vYXNzZXRzL2ljb25zL2Zhdmljb24ucG5nJyxcclxuXHRcdHZpYnJhdGU6IFsxMDAsIDUwLCAxMDBdLFxyXG5cdFx0ZGF0YToge1xyXG5cdFx0XHRkYXRlT2ZBcnJpdmFsOiBEYXRlLm5vdygpLFxyXG5cdFx0XHRwcmltYXJ5S2V5OiAxLFxyXG5cdFx0fSxcclxuXHR9O1xyXG5cclxuXHRldmVudC53YWl0VW50aWwoc2VsZi5yZWdpc3RyYXRpb24uc2hvd05vdGlmaWNhdGlvbignUHVzaCBOb3RpZmljYXRpb24nLCBvcHRpb25zKSk7XHJcbn0pO1xyXG5cclxuLy8gUHJlY2FjaGluZyBmaWxlXHJcbndvcmtib3gucHJlY2FjaGluZy5wcmVjYWNoZUFuZFJvdXRlKHNlbGYuX19XQl9NQU5JRkVTVCk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=