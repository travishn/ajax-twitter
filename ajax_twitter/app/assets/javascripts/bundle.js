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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    $.ajax({
      method: "DELETE",
      url: `/users/${id}/follow`,
      dataType: 'json'
    });
  },

  unfollowUser: id => {
    $.ajax({
      method: "POST",
      url: `/users/${id}/follow`,
      dataType: 'json'
    });
  }
};

module.exports = APIUtil;


/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

function FollowToggle (el) {
  this.el = $(el);
  this.userId = this.el.data("user-id");
  this.followState = this.el.data("initial-follow-state");

  this.render();
  this.el.on("click", this.handleClick.bind(this));
  // this.handleClick();
}

FollowToggle.prototype.render = function() {
  if (this.followState === 'unfollowed') {
    this.el.text("Follow!");
  } else if (this.followState === 'followed') {
    this.el.text("Unfollow!");
  }
};

FollowToggle.prototype.handleClick = function(e){
  e.preventDefault();
  const self = this;

  if (this.followState === 'followed') {
    APIUtil.unfollowUser(`${this.userId}`).then( () => {
      this.followState = 'unfollowed';
      this.render();
    });
  } else {
    APIUtil.followUser(`${this.userId}`).then( () => {
      this.followState = 'followed';
      this.render();
    });
  }
};

// FollowToggle.prototype.handleClick = function(e){
//   e.preventDefault();
//   const self = this;
//
//   if (this.followState === 'followed') {
//     $.ajax({
//       method: "DELETE",
//       url: `/users/${self.userId}/follow`,
//       dataType: 'json',
//       success: () => {
//         self.followState = 'unfollowed';
//         self.render();
//       }
//     });
//   } else {
//       $.ajax({
//         method: "POST",
//         url: `/users/${self.userId}/follow`,
//         dataType: 'json',
//         success: () => {
//           self.followState = 'followed';
//           self.render();
//         }
//     });
//   }
// };

// FollowToggle.prototype.handleClick = (event) => {
//     event.preventDefault();
//
//     if (this.followState === 'followed') {
//       this.followState = 'unfollowing';
//       this.render();
//       APIUtil.unfollowUser(this.userId).then(() => {
//         followToggle.followState = 'unfollowed';
//         followToggle.render();
//       });
//     } else if (this.followState === 'unfollowed') {
//       this.followState = 'following';
//       this.render();
//       APIUtil.followUser(this.userId).then(() => {
//         followToggle.followState = 'followed';
//         followToggle.render();
//       });
//     }
//   }
//
//   FollowToggle.prototype.render = function() {
//     switch (this.followState) {
//       case 'followed':
//         this.$el.prop('disabled', false);
//         this.$el.html('Unfollow!');
//         break;
//       case 'unfollowed':
//         this.$el.prop('disabled', false);
//         this.$el.html('Follow!');
//         break;
//       case 'following':
//         this.$el.prop('disabled', true);
//         this.$el.html('Following...');
//         break;
//       case 'unfollowing':
//         this.$el.prop('disabled', true);
//         this.$el.html('Unfollowing...');
//         break;
//     }
//   }
// };


module.exports = FollowToggle;


/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");

$ ( () => {
  $('button.follow-toggle').each( (i, btn) => new FollowToggle(btn) );
}

);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map