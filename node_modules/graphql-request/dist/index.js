"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gql = exports.request = exports.rawRequest = exports.GraphQLClient = void 0;
var cross_fetch_1 = __importDefault(require("cross-fetch"));
var printer_1 = require("graphql/language/printer");
var types_1 = require("./types");
var types_2 = require("./types");
Object.defineProperty(exports, "ClientError", { enumerable: true, get: function () { return types_2.ClientError; } });
/**
 * todo
 */
var GraphQLClient = /** @class */ (function () {
    function GraphQLClient(url, options) {
        this.url = url;
        this.options = options || {};
    }
    GraphQLClient.prototype.rawRequest = function (query, variables) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, headers, others, body, response, result, headers_1, status_1, errorResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.options, headers = _a.headers, others = __rest(_a, ["headers"]);
                        body = JSON.stringify({
                            query: query,
                            variables: variables ? variables : undefined,
                        });
                        return [4 /*yield*/, cross_fetch_1.default(this.url, __assign({ method: 'POST', headers: __assign({ 'Content-Type': 'application/json' }, headers), body: body }, others))];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, getResult(response)];
                    case 2:
                        result = _b.sent();
                        if (response.ok && !result.errors && result.data) {
                            headers_1 = response.headers, status_1 = response.status;
                            return [2 /*return*/, __assign(__assign({}, result), { headers: headers_1, status: status_1 })];
                        }
                        else {
                            errorResult = typeof result === 'string' ? { error: result } : result;
                            throw new types_1.ClientError(__assign(__assign({}, errorResult), { status: response.status, headers: response.headers }), { query: query, variables: variables });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * todo
     */
    GraphQLClient.prototype.request = function (document, variables) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, headers, others, resolvedDoc, body, response, result, errorResult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.options, headers = _a.headers, others = __rest(_a, ["headers"]);
                        resolvedDoc = resolveRequestDocument(document);
                        body = JSON.stringify({
                            query: resolvedDoc,
                            variables: variables ? variables : undefined,
                        });
                        return [4 /*yield*/, cross_fetch_1.default(this.url, __assign({ method: 'POST', headers: __assign({ 'Content-Type': 'application/json' }, headers), body: body }, others))];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, getResult(response)];
                    case 2:
                        result = _b.sent();
                        if (response.ok && !result.errors && result.data) {
                            return [2 /*return*/, result.data];
                        }
                        else {
                            errorResult = typeof result === 'string' ? { error: result } : result;
                            throw new types_1.ClientError(__assign(__assign({}, errorResult), { status: response.status }), { query: resolvedDoc, variables: variables });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    GraphQLClient.prototype.setHeaders = function (headers) {
        this.options.headers = headers;
        return this;
    };
    GraphQLClient.prototype.setHeader = function (key, value) {
        var _a;
        var headers = this.options.headers;
        if (headers) {
            // todo what if headers is in nested array form... ?
            //@ts-ignore
            headers[key] = value;
        }
        else {
            this.options.headers = (_a = {}, _a[key] = value, _a);
        }
        return this;
    };
    return GraphQLClient;
}());
exports.GraphQLClient = GraphQLClient;
/**
 * todo
 */
function rawRequest(url, query, variables) {
    return __awaiter(this, void 0, void 0, function () {
        var client;
        return __generator(this, function (_a) {
            client = new GraphQLClient(url);
            return [2 /*return*/, client.rawRequest(query, variables)];
        });
    });
}
exports.rawRequest = rawRequest;
/**
 * Send a GraphQL Document to the GraphQL server for exectuion.
 *
 * @example
 *
 * ```ts
 * // You can pass a raw string
 *
 * await request('https://foo.bar/graphql', `
 *   {
 *     query {
 *       users
 *     }
 *   }
 * `)
 *
 * // You can also pass a GraphQL DocumentNode. Convenient if you
 * // are using graphql-tag package.
 *
 * import gql from 'graphql-tag'
 *
 * await request('https://foo.bar/graphql', gql`...`)
 *
 * // If you don't actually care about using DocumentNode but just
 * // want the tooling support for gql template tag like IDE syntax
 * // coloring and prettier autoformat then note you can use the
 * // passthrough gql tag shipped with graphql-request to save a bit
 * // of performance and not have to install another dep into your project.
 *
 * import { gql } from 'graphql-request'
 *
 * await request('https://foo.bar/graphql', gql`...`)
 * ```
 */
function request(url, document, variables) {
    return __awaiter(this, void 0, void 0, function () {
        var client;
        return __generator(this, function (_a) {
            client = new GraphQLClient(url);
            return [2 /*return*/, client.request(document, variables)];
        });
    });
}
exports.request = request;
exports.default = request;
/**
 * todo
 */
function getResult(response) {
    var contentType = response.headers.get('Content-Type');
    if (contentType && contentType.startsWith('application/json')) {
        return response.json();
    }
    else {
        return response.text();
    }
}
/**
 * helpers
 */
function resolveRequestDocument(document) {
    if (typeof document === 'string')
        return document;
    return printer_1.print(document);
}
/**
 * Convenience passthrough template tag to get the benefits of tooling for the gql template tag. This does not actually parse the input into a GraphQL DocumentNode like graphql-tag package does. It just returns the string with any variables given interpolated. Can save you a bit of performance and having to install another package.
 *
 * @example
 *
 * import { gql } from 'graphql-request'
 *
 * await request('https://foo.bar/graphql', gql`...`)
 *
 * @remarks
 *
 * Several tools in the Node GraphQL ecosystem are hardcoded to specially treat any template tag named "gql". For example see this prettier issue: https://github.com/prettier/prettier/issues/4360. Using this template tag has no runtime effect beyond variable interpolation.
 */
function gql(chunks) {
    var variables = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        variables[_i - 1] = arguments[_i];
    }
    return chunks.reduce(function (accumulator, chunk, index) { return "" + accumulator + chunk + (index in variables ? variables[index] : ''); }, '');
}
exports.gql = gql;
//# sourceMappingURL=index.js.map