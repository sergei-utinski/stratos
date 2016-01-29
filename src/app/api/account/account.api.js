(function () {
  'use strict';

  /**
   * @namespace app.api
   * @memberOf app.api
   * @name app.api.account
   * @description Account access API
   */
  angular
    .module('app.api')
    .run(registerAccountApi);

  registerAccountApi.$inject = [
    '$http',
    'app.api.apiManager'
  ];

  function registerAccountApi($http, apiManager) {
    apiManager.register('app.api.account', new AccountApi($http));
  }

  /**
   * @namespace app.api
   * @memberof app.api.account
   * @name app.model.account.AccountApi
   * @property {Object} $http - angular $http service
   * @class
   */
  function AccountApi($http) {
    this.$http = $http;
  }

  angular.extend(AccountApi.prototype, {
    /**
     * @function login
     * @memberof app.api.account.AccountApi
     * @param {string} username - the username
     * @param {string} password - the password
     * @description Log in of the application at model layer
     * @returns {Promise} returns a promise
     * @public
     */
    login: function (username, password) {
      return this.$http.post('/api/auth/login/', {
        username: username,
        password: password
      });
    },

    /**
     * @function logout
     * @memberof app.api.account.AccountApi
     * @description Log out at API layer, send XHR.
     * @returns {Promise} returns a promise
     * @public
     */
    logout: function () {
      return this.$http.get('/api/auth/logout');
    }
  });


})();