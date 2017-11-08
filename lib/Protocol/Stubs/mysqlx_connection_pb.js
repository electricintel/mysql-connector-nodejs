/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var mysqlx_datatypes_pb = require('./mysqlx_datatypes_pb.js');
var mysqlx_pb = require('./mysqlx_pb.js');
goog.exportSymbol('proto.Mysqlx.Connection.Capabilities', null, global);
goog.exportSymbol('proto.Mysqlx.Connection.CapabilitiesGet', null, global);
goog.exportSymbol('proto.Mysqlx.Connection.CapabilitiesSet', null, global);
goog.exportSymbol('proto.Mysqlx.Connection.Capability', null, global);
goog.exportSymbol('proto.Mysqlx.Connection.Close', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Mysqlx.Connection.Capability = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Mysqlx.Connection.Capability, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Mysqlx.Connection.Capability.displayName = 'proto.Mysqlx.Connection.Capability';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Mysqlx.Connection.Capability.prototype.toObject = function(opt_includeInstance) {
  return proto.Mysqlx.Connection.Capability.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Mysqlx.Connection.Capability} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Connection.Capability.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getField(msg, 1),
    value: (f = msg.getValue()) && mysqlx_datatypes_pb.Any.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Mysqlx.Connection.Capability}
 */
proto.Mysqlx.Connection.Capability.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Mysqlx.Connection.Capability;
  return proto.Mysqlx.Connection.Capability.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Mysqlx.Connection.Capability} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Mysqlx.Connection.Capability}
 */
proto.Mysqlx.Connection.Capability.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = new mysqlx_datatypes_pb.Any;
      reader.readMessage(value,mysqlx_datatypes_pb.Any.deserializeBinaryFromReader);
      msg.setValue(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Mysqlx.Connection.Capability.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Mysqlx.Connection.Capability.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Mysqlx.Connection.Capability} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Connection.Capability.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {string} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getValue();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      mysqlx_datatypes_pb.Any.serializeBinaryToWriter
    );
  }
};


/**
 * required string name = 1;
 * @return {string}
 */
proto.Mysqlx.Connection.Capability.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.Mysqlx.Connection.Capability.prototype.setName = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.Mysqlx.Connection.Capability.prototype.clearName = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Mysqlx.Connection.Capability.prototype.hasName = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required Mysqlx.Datatypes.Any value = 2;
 * @return {!proto.Mysqlx.Datatypes.Any}
 */
proto.Mysqlx.Connection.Capability.prototype.getValue = function() {
  return /** @type{!proto.Mysqlx.Datatypes.Any} */ (
    jspb.Message.getWrapperField(this, mysqlx_datatypes_pb.Any, 2, 1));
};


/** @param {!proto.Mysqlx.Datatypes.Any} value */
proto.Mysqlx.Connection.Capability.prototype.setValue = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.Mysqlx.Connection.Capability.prototype.clearValue = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Mysqlx.Connection.Capability.prototype.hasValue = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Mysqlx.Connection.Capabilities = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.Mysqlx.Connection.Capabilities.repeatedFields_, null);
};
goog.inherits(proto.Mysqlx.Connection.Capabilities, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Mysqlx.Connection.Capabilities.displayName = 'proto.Mysqlx.Connection.Capabilities';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.Mysqlx.Connection.Capabilities.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Mysqlx.Connection.Capabilities.prototype.toObject = function(opt_includeInstance) {
  return proto.Mysqlx.Connection.Capabilities.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Mysqlx.Connection.Capabilities} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Connection.Capabilities.toObject = function(includeInstance, msg) {
  var f, obj = {
    capabilitiesList: jspb.Message.toObjectList(msg.getCapabilitiesList(),
    proto.Mysqlx.Connection.Capability.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Mysqlx.Connection.Capabilities}
 */
proto.Mysqlx.Connection.Capabilities.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Mysqlx.Connection.Capabilities;
  return proto.Mysqlx.Connection.Capabilities.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Mysqlx.Connection.Capabilities} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Mysqlx.Connection.Capabilities}
 */
proto.Mysqlx.Connection.Capabilities.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Mysqlx.Connection.Capability;
      reader.readMessage(value,proto.Mysqlx.Connection.Capability.deserializeBinaryFromReader);
      msg.addCapabilities(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Mysqlx.Connection.Capabilities.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Mysqlx.Connection.Capabilities.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Mysqlx.Connection.Capabilities} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Connection.Capabilities.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCapabilitiesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.Mysqlx.Connection.Capability.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Capability capabilities = 1;
 * @return {!Array.<!proto.Mysqlx.Connection.Capability>}
 */
proto.Mysqlx.Connection.Capabilities.prototype.getCapabilitiesList = function() {
  return /** @type{!Array.<!proto.Mysqlx.Connection.Capability>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.Mysqlx.Connection.Capability, 1));
};


/** @param {!Array.<!proto.Mysqlx.Connection.Capability>} value */
proto.Mysqlx.Connection.Capabilities.prototype.setCapabilitiesList = function(value) {
  jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.Mysqlx.Connection.Capability=} opt_value
 * @param {number=} opt_index
 * @return {!proto.Mysqlx.Connection.Capability}
 */
proto.Mysqlx.Connection.Capabilities.prototype.addCapabilities = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.Mysqlx.Connection.Capability, opt_index);
};


proto.Mysqlx.Connection.Capabilities.prototype.clearCapabilitiesList = function() {
  this.setCapabilitiesList([]);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Mysqlx.Connection.CapabilitiesGet = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Mysqlx.Connection.CapabilitiesGet, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Mysqlx.Connection.CapabilitiesGet.displayName = 'proto.Mysqlx.Connection.CapabilitiesGet';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Mysqlx.Connection.CapabilitiesGet.prototype.toObject = function(opt_includeInstance) {
  return proto.Mysqlx.Connection.CapabilitiesGet.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Mysqlx.Connection.CapabilitiesGet} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Connection.CapabilitiesGet.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Mysqlx.Connection.CapabilitiesGet}
 */
proto.Mysqlx.Connection.CapabilitiesGet.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Mysqlx.Connection.CapabilitiesGet;
  return proto.Mysqlx.Connection.CapabilitiesGet.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Mysqlx.Connection.CapabilitiesGet} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Mysqlx.Connection.CapabilitiesGet}
 */
proto.Mysqlx.Connection.CapabilitiesGet.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Mysqlx.Connection.CapabilitiesGet.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Mysqlx.Connection.CapabilitiesGet.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Mysqlx.Connection.CapabilitiesGet} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Connection.CapabilitiesGet.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Mysqlx.Connection.CapabilitiesSet = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Mysqlx.Connection.CapabilitiesSet, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Mysqlx.Connection.CapabilitiesSet.displayName = 'proto.Mysqlx.Connection.CapabilitiesSet';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Mysqlx.Connection.CapabilitiesSet.prototype.toObject = function(opt_includeInstance) {
  return proto.Mysqlx.Connection.CapabilitiesSet.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Mysqlx.Connection.CapabilitiesSet} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Connection.CapabilitiesSet.toObject = function(includeInstance, msg) {
  var f, obj = {
    capabilities: (f = msg.getCapabilities()) && proto.Mysqlx.Connection.Capabilities.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Mysqlx.Connection.CapabilitiesSet}
 */
proto.Mysqlx.Connection.CapabilitiesSet.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Mysqlx.Connection.CapabilitiesSet;
  return proto.Mysqlx.Connection.CapabilitiesSet.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Mysqlx.Connection.CapabilitiesSet} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Mysqlx.Connection.CapabilitiesSet}
 */
proto.Mysqlx.Connection.CapabilitiesSet.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.Mysqlx.Connection.Capabilities;
      reader.readMessage(value,proto.Mysqlx.Connection.Capabilities.deserializeBinaryFromReader);
      msg.setCapabilities(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Mysqlx.Connection.CapabilitiesSet.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Mysqlx.Connection.CapabilitiesSet.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Mysqlx.Connection.CapabilitiesSet} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Connection.CapabilitiesSet.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getCapabilities();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.Mysqlx.Connection.Capabilities.serializeBinaryToWriter
    );
  }
};


/**
 * required Capabilities capabilities = 1;
 * @return {!proto.Mysqlx.Connection.Capabilities}
 */
proto.Mysqlx.Connection.CapabilitiesSet.prototype.getCapabilities = function() {
  return /** @type{!proto.Mysqlx.Connection.Capabilities} */ (
    jspb.Message.getWrapperField(this, proto.Mysqlx.Connection.Capabilities, 1, 1));
};


/** @param {!proto.Mysqlx.Connection.Capabilities} value */
proto.Mysqlx.Connection.CapabilitiesSet.prototype.setCapabilities = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.Mysqlx.Connection.CapabilitiesSet.prototype.clearCapabilities = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.Mysqlx.Connection.CapabilitiesSet.prototype.hasCapabilities = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.Mysqlx.Connection.Close = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.Mysqlx.Connection.Close, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.Mysqlx.Connection.Close.displayName = 'proto.Mysqlx.Connection.Close';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.Mysqlx.Connection.Close.prototype.toObject = function(opt_includeInstance) {
  return proto.Mysqlx.Connection.Close.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.Mysqlx.Connection.Close} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Connection.Close.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.Mysqlx.Connection.Close}
 */
proto.Mysqlx.Connection.Close.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.Mysqlx.Connection.Close;
  return proto.Mysqlx.Connection.Close.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.Mysqlx.Connection.Close} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.Mysqlx.Connection.Close}
 */
proto.Mysqlx.Connection.Close.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.Mysqlx.Connection.Close.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.Mysqlx.Connection.Close.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.Mysqlx.Connection.Close} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.Mysqlx.Connection.Close.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};


goog.object.extend(exports, proto.Mysqlx.Connection);