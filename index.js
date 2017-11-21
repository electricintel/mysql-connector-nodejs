/*
 * Copyright (c) 2015-2017, Oracle and/or its affiliates. All rights reserved.
 *
 * MySQL Connector/Node.js is licensed under the terms of the GPLv2
 * <http://www.gnu.org/licenses/old-licenses/gpl-2.0.html>, like most
 * MySQL Connectors. There are special exceptions to the terms and
 * conditions of the GPLv2 as it is applied to this software, see the
 * FLOSS License Exception
 * <http://www.mysql.com/about/legal/licensing/foss-exception.html>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation; version 2 of the
 * License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301  USA
 */

'use strict';

const Authentication = require('./lib/Authentication');
const Session = require('./lib/DevAPI/Session');
const Expr = require('./lib/Protocol/Encoder/Expr');
const parseUri = require('./lib/DevAPI/Util/URIParser');
const query = require('./lib/DevAPI/Query');

/**
 * @module mysqlx
 */


/**
 * Create a session instance.
 * @private
 * @param {string|URI} configuration - session base reference
 * @throws {Error} When the session base reference is not valid.
 * @returns {Promise.<Session>}
 */
function createSession (configuration) {
    let session;

    try {
        session = new Session(configuration);
    } catch (err) {
        return Promise.reject(err);
    }

    return session.connect();
}

/**
 * Load a new session.
 * @private
 * @param {string|URI} session
 * @returns {Promise.<Session>}
 */
function loadSession (properties) {
    if (typeof properties.getUri !== 'function') {
        return createSession(properties);
    }

    return createSession(Object.assign({}, parseUri(properties.getUri())));
}

/**
 * Load a new or existing session.
 * @param {string|URI} properties - session properties
 * @returns {Promise.<Session>}
 */
exports.getSession = function (input) {
    const hasPlainObjectInput = typeof input === 'object' && !Array.isArray(input);
    const hasStringInput = typeof input === 'string';

    if (!hasPlainObjectInput && !hasStringInput) {
        return Promise.reject(new Error('Invalid parameter. `getSession()` needs a configuration object or a connection string'));
    }

    if (hasPlainObjectInput) {
        return createSession(input);
    }

    try {
        return createSession(parseUri(input));
    } catch (err) {
        return Promise.reject(err);
    }
};

/**
 * Additional parser options.
 * @typedef {Object} ParserOptions
 * @prop {Mode} [mode] - the parsing mode (DOCUMENT or TABLE)
 */

/**
 * Parse an expression string into a Mysqlx.Expr.Expr.
 * @param {string} expr - expression string
 * @param {ParserOptions} options - additional options
 * @return {proto.Mysqlx.Expr.Expr} The protobuf encoded object.
 */
exports.expr = function (expr, options) {
    return Expr.encodeExpr(expr, options);
};

/**
 * Database entity types.
 * @type {Mode}
 * @const
 */
exports.Mode = query.Type;

/**
 * Get available auth methods.
 *
 * In most cases this will return <pre>[ 'PLAIN', 'MYSQL41' ]</pre>
 * @return {Array.<String>}
 */
exports.getAuthMethods = function () {
    return Authentication.getNames();
};

/**
 * Get the version number
 *
 * This is  shortcut for reading package.json/version
 *
 * @return {String}
 */
exports.getVersion = function () {
    return require('./package').version;
};
