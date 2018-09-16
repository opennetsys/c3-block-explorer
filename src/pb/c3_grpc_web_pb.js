/**
 * @fileoverview gRPC-Web generated client stub for protos
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js')
const proto = {};
proto.protos = require('./c3_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.protos.C3ServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.protos.C3ServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.protos.C3ServiceClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.protos.C3ServiceClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.protos.Request,
 *   !proto.protos.Response>}
 */
const methodInfo_Send = new grpc.web.AbstractClientBase.MethodInfo(
  proto.protos.Response,
  /** @param {!proto.protos.Request} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.protos.Response.deserializeBinary
);


/**
 * @param {!proto.protos.Request} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.protos.Response)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.protos.Response>|undefined}
 *     The XHR Node Readable Stream
 */
proto.protos.C3ServiceClient.prototype.send =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/protos.C3Service/Send',
      request,
      metadata,
      methodInfo_Send,
      callback);
};


/**
 * @param {!proto.protos.Request} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.protos.Response>}
 *     The XHR Node Readable Stream
 */
proto.protos.C3ServicePromiseClient.prototype.send =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.send(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.protos;

