(function () {
  'use strict';

  /**
   * @namespace cloud-foundry.api
   * @memberOf cloud-foundry.api
   * @name cloud-foundry.api.application
   * @description Application access API
   */
  angular
    .module('cloud-foundry.api')
    .run(registerApplicationApi);

  registerApplicationApi.$inject = [
    '$http',
    '$q',
    '$cookies',
    'app.api.apiManager'
  ];

  function registerApplicationApi($http, $q, $cookies, apiManager) {
    apiManager.register('cloud-foundry.api.application', new ApplicationApi($http, $q, $cookies));
  }

  /**
   * @namespace cloud-foundry.api
   * @memberof cloud-foundry.api.application
   * @name cloud-foundry.api.application.ApplicationApi
   * @param {object} $http - the Angular $http service
   * @param {object} $q - the Angular Promise service
   * @param {object} $cookies - the Angular cookies service
   * @property {object} $http - the Angular $http service
   * @property {object} $q - the Angular Promise service
   * @property {object} $cookies - the Angular cookies service
   * @class
   */
  function ApplicationApi($http, $q, $cookies){

    var apiVersionPrefix = '/api/v2/';

    /**
     * @function makeQueryString
     * @memberof cloud-foundry.api.application
     * @description http GET against the cf endpoint.
     * @param {string} options - the options
     * @returns {string} the query string
     * @private
     */
    function makeQueryString(options) {
      options = options || {};

      var query = '';
      var firstQuery = true;

      if (options.queries) {
        _.each(options.queries, function (value, key) {
          query = query + ((firstQuery ? '' : '&') + key + '=' + value);
          firstQuery = false;
        });
      }

      if (options.filter && options.filter.name) {
        query = query + ((firstQuery ? '' : '&') + 'q=' + options.filter.name + ':' + options.filter.value);
      }

      return query;
    }

    this.$http = $http;
    this.$q = $q;
    this.$cookies = $cookies;
  }


  angular.extend(ApplicationApi.prototype, {

     /**
      * @function all
      * @memberof cloud-foundry.api.application
      * @description Retrieve all the applications from cloud foundry.
      * @param {string} guid - the guid
      * @param {string} options - the options
      * @returns {object} A resolved/rejected promise
      * @public
      */
      all: function(guid, options){
        //var path = this.getCollectionUrl() + '/' + guid + '/instances';
        //this.get(path, options)
        //TODO this needs to return a promise, even for stub data
        return stubData();
      },

     /**
      * @function usage
      * @memberof cloud-foundry.api.application
      * @description Retrieve all the usage from cloud foundry.
      * @param {string} guid - the guid
      * @param {string} options - the options
      * @returns {object} A resolved/rejected promise
      * @public
      */
      usage: function(guid, options){
        var path = this.getCollectionUrl() + '/' + guid + '/usage';
        this.get(path, options);
      },

      /**
       * @function files
       * @memberof cloud-foundry.api.application
       * @description Retrieve all the usage from cloud foundry.
       * @param {string} guid - the guid
       * @param {string} instanceIndex - the instanceIndex
       * @param {string} filepath - the filepath
       * @param {string} options - the options
       * @returns {object} A resolved/rejected promise
       * @public
      */
      files: function(guid,instanceIndex, filepath, options){
        options.params = {allow_redirect: false};
        var path = this.getCollectionUrl() + '/' + guid + '/instances/' + instanceIndex + '/files/' + filepath;
        this.get(path, options);
      },

      /**
       * @function return
       * @memberof cloud-foundry.api.application
       * @description Retrieve all the usage from cloud foundry.
       * @returns {string} the base url for the endpoint
       * @private
       */
      getCollectionUrl: function () {
        return apiVersionPrefix + this.name;
      },

      /**
       * @function get
       * @memberof cloud-foundry.api.application
       * @description http GET against the cf endpoint.
       * @param {string} resourceIdentifier - the resource type to get
       * @param {string} params - the http params
       * @returns {object} A resolved/rejected promise
       * @private
       */
      get: function(resourceIdentifier, params) {
        var options = {};
        options.paramSerializer = makeQueryString;
        options.params = params;

        var path = this.getCollectionUrl() + '/' + resourceIdentifier;

        this.$http.get(path, options);

      },


  });

  function stubData(){

        // stub out response for list
        /* eslint-disable quote-props */
        return Promise.resolve({
        "data":{
          "total_results": 3,
          "total_pages": 1,
          "prev_url": null,
          "next_url": null,
          "resources": [
            {
              "metadata": {
                "guid": "8a24297c-8489-4d99-9a27-b12d217782c0",
                "url": "/v2/apps/8a24297c-8489-4d99-9a27-b12d217782c0",
                "created_at": "2016-01-26T22:20:08Z",
                "updated_at": "2016-01-26T22:20:08Z"
              },
              "entity": {
                "name": "name-215",
                "production": false,
                "space_guid": "e98f80c0-91de-4a8d-8fab-02c6bb2c0dc1",
                "stack_guid": "41bfc9c6-9349-4adf-a852-104dadd63ca4",
                "buildpack": null,
                "detected_buildpack": null,
                "environment_json": null,
                "memory": 1024,
                "instances": 1,
                "disk_quota": 1024,
                "state": "STARTED",
                "version": "81a46896-10f0-40a8-9314-357a6c7f35da",
                "command": null,
                "console": false,
                "debug": null,
                "staging_task_id": null,
                "package_state": "PENDING",
                "health_check_type": "port",
                "health_check_timeout": null,
                "staging_failed_reason": null,
                "staging_failed_description": null,
                "diego": false,
                "docker_image": null,
                "package_updated_at": "2016-01-26T22:20:08Z",
                "detected_start_command": "",
                "enable_ssh": true,
                "docker_credentials_json": {
                  "redacted_message": "[PRIVATE DATA HIDDEN]"
                },
                "ports": null,
                "space_url": "/v2/spaces/e98f80c0-91de-4a8d-8fab-02c6bb2c0dc1",
                "stack_url": "/v2/stacks/41bfc9c6-9349-4adf-a852-104dadd63ca4",
                "events_url": "/v2/apps/8a24297c-8489-4d99-9a27-b12d217782c0/events",
                "service_bindings_url": "/v2/apps/8a24297c-8489-4d99-9a27-b12d217782c0/service_bindings",
                "routes_url": "/v2/apps/8a24297c-8489-4d99-9a27-b12d217782c0/routes"
              }
            },
            {
              "metadata": {
                "guid": "d944c87e-6184-4b5f-99f9-661dc7381bf8",
                "url": "/v2/apps/d944c87e-6184-4b5f-99f9-661dc7381bf8",
                "created_at": "2016-01-26T22:20:08Z",
                "updated_at": "2016-01-26T22:20:08Z"
              },
              "entity": {
                "name": "name-220",
                "production": false,
                "space_guid": "c848d294-9c77-43ec-a5d7-8c416343cc51",
                "stack_guid": "cbab057b-48db-4781-aa3e-a3c33573a3d4",
                "buildpack": null,
                "detected_buildpack": null,
                "environment_json": null,
                "memory": 1024,
                "instances": 1,
                "disk_quota": 1024,
                "state": "STOPPED",
                "version": "eb1eddfd-7b0b-4a92-9823-cce955b9625f",
                "command": null,
                "console": false,
                "debug": null,
                "staging_task_id": null,
                "package_state": "PENDING",
                "health_check_type": "port",
                "health_check_timeout": null,
                "staging_failed_reason": null,
                "staging_failed_description": null,
                "diego": false,
                "docker_image": null,
                "package_updated_at": "2016-01-26T22:20:08Z",
                "detected_start_command": "",
                "enable_ssh": true,
                "docker_credentials_json": {
                  "redacted_message": "[PRIVATE DATA HIDDEN]"
                },
                "ports": null,
                "space_url": "/v2/spaces/c848d294-9c77-43ec-a5d7-8c416343cc51",
                "stack_url": "/v2/stacks/cbab057b-48db-4781-aa3e-a3c33573a3d4",
                "events_url": "/v2/apps/d944c87e-6184-4b5f-99f9-661dc7381bf8/events",
                "service_bindings_url": "/v2/apps/d944c87e-6184-4b5f-99f9-661dc7381bf8/service_bindings",
                "routes_url": "/v2/apps/d944c87e-6184-4b5f-99f9-661dc7381bf8/routes"
              }
            },
            {
              "metadata": {
                "guid": "ea957179-97f4-438b-a20d-f504f1305045",
                "url": "/v2/apps/ea957179-97f4-438b-a20d-f504f1305045",
                "created_at": "2016-01-26T22:20:08Z",
                "updated_at": "2016-01-26T22:20:08Z"
              },
              "entity": {
                "name": "name-210",
                "production": false,
                "space_guid": "6edd5300-92c8-46be-a3ca-d07cfe5bfb74",
                "stack_guid": "a29ccdc4-3241-4b47-9703-b07ad37de0a3",
                "buildpack": null,
                "detected_buildpack": null,
                "environment_json": null,
                "memory": 1024,
                "instances": 1,
                "disk_quota": 1024,
                "state": "STOPPED",
                "version": "ee2c448f-97aa-4733-ae0a-0e143671c4cb",
                "command": null,
                "console": false,
                "debug": null,
                "staging_task_id": null,
                "package_state": "PENDING",
                "health_check_type": "port",
                "health_check_timeout": null,
                "staging_failed_reason": null,
                "staging_failed_description": null,
                "diego": false,
                "docker_image": null,
                "package_updated_at": "2016-01-26T22:20:08Z",
                "detected_start_command": "",
                "enable_ssh": true,
                "docker_credentials_json": {
                  "redacted_message": "[PRIVATE DATA HIDDEN]"
                },
                "ports": null,
                "space_url": "/v2/spaces/6edd5300-92c8-46be-a3ca-d07cfe5bfb74",
                "stack_url": "/v2/stacks/a29ccdc4-3241-4b47-9703-b07ad37de0a3",
                "events_url": "/v2/apps/ea957179-97f4-438b-a20d-f504f1305045/events",
                "service_bindings_url": "/v2/apps/ea957179-97f4-438b-a20d-f504f1305045/service_bindings",
                "routes_url": "/v2/apps/ea957179-97f4-438b-a20d-f504f1305045/routes"
              }
            }
          ]
        }
        });
        /* eslint-enable quote-props */
  }

})();


