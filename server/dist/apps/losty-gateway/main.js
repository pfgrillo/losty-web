/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/losty-gateway/src/app.module.ts":
/*!**********************************************!*\
  !*** ./apps/losty-gateway/src/app.module.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const messages_controller_1 = __webpack_require__(/*! ./controllers/messages.controller */ "./apps/losty-gateway/src/controllers/messages.controller.ts");
const auth_controllers_1 = __webpack_require__(/*! ./controllers/auth.controllers */ "./apps/losty-gateway/src/controllers/auth.controllers.ts");
const users_controller_1 = __webpack_require__(/*! ./controllers/users.controller */ "./apps/losty-gateway/src/controllers/users.controller.ts");
const gateway_service_1 = __webpack_require__(/*! ./services/gateway.service */ "./apps/losty-gateway/src/services/gateway.service.ts");
const proxy_rmq_module_1 = __webpack_require__(/*! ./proxy-rmq/proxy-rmq.module */ "./apps/losty-gateway/src/proxy-rmq/proxy-rmq.module.ts");
const report_module_1 = __webpack_require__(/*! ./report/report.module */ "./apps/losty-gateway/src/report/report.module.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.apps/losty-gateway/.env',
            }),
            report_module_1.ReportModule,
            proxy_rmq_module_1.ProxyRmqModule,
        ],
        controllers: [
            auth_controllers_1.AuthController,
            users_controller_1.UsersController,
            messages_controller_1.MessagesController
        ],
        providers: [gateway_service_1.GatewayService],
    })
], AppModule);


/***/ }),

/***/ "./apps/losty-gateway/src/common/exceptions/exception.filter.ts":
/*!**********************************************************************!*\
  !*** ./apps/losty-gateway/src/common/exceptions/exception.filter.ts ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AllExceptionsFilter = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    constructor() {
        this.logger = new common_1.Logger(AllExceptionsFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        let status = exception instanceof common_1.HttpException ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception.status) {
            status = exception.status;
        }
        const message = exception instanceof common_1.HttpException ? exception.getResponse() : exception;
        this.logger.error(`Http Status: ${status}. Error message: ${JSON.stringify(message)}`);
        response.status(status).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            error: {
                message: message.message ? message.message : message,
                name: message.name,
                status,
            },
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);


/***/ }),

/***/ "./apps/losty-gateway/src/common/interceptors/timeout.interceptor.ts":
/*!***************************************************************************!*\
  !*** ./apps/losty-gateway/src/common/interceptors/timeout.interceptor.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimeoutInterceptor = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
class TimeoutInterceptor {
    intercept(context, next) {
        const url = context.getArgs()[0].url;
        const method = context.getArgs()[0].method;
        return next.handle().pipe((0, rxjs_1.timeout)(15000), (0, rxjs_1.catchError)(err => {
            if (err instanceof rxjs_1.TimeoutError) {
                return (0, rxjs_1.throwError)(() => new common_1.RequestTimeoutException());
            }
            return (0, rxjs_1.throwError)(err);
        }));
    }
}
exports.TimeoutInterceptor = TimeoutInterceptor;


/***/ }),

/***/ "./apps/losty-gateway/src/controllers/auth.controllers.ts":
/*!****************************************************************!*\
  !*** ./apps/losty-gateway/src/controllers/auth.controllers.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const authorization_decorator_1 = __webpack_require__(/*! ../decorators/authorization.decorator */ "./apps/losty-gateway/src/decorators/authorization.decorator.ts");
let AuthController = class AuthController {
    constructor() { }
    async signUp(user) {
    }
    async logIn(user) {
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, authorization_decorator_1.Authorization)(true),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, authorization_decorator_1.Authorization)(true),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AuthController.prototype, "logIn", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [])
], AuthController);


/***/ }),

/***/ "./apps/losty-gateway/src/controllers/messages.controller.ts":
/*!*******************************************************************!*\
  !*** ./apps/losty-gateway/src/controllers/messages.controller.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessagesController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const authorization_decorator_1 = __webpack_require__(/*! ../decorators/authorization.decorator */ "./apps/losty-gateway/src/decorators/authorization.decorator.ts");
let MessagesController = class MessagesController {
    constructor() { }
    async saveMessage(message) {
    }
    async getMessage(chatRoom) {
    }
    async openRoom(body) {
    }
};
exports.MessagesController = MessagesController;
__decorate([
    (0, common_1.Post)(''),
    (0, authorization_decorator_1.Authorization)(true),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_a = typeof Promise !== "undefined" && Promise) === "function" ? _a : Object)
], MessagesController.prototype, "saveMessage", null);
__decorate([
    (0, common_1.Post)(),
    (0, authorization_decorator_1.Authorization)(true),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], MessagesController.prototype, "getMessage", null);
__decorate([
    (0, common_1.Put)(),
    (0, authorization_decorator_1.Authorization)(true),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], MessagesController.prototype, "openRoom", null);
exports.MessagesController = MessagesController = __decorate([
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [])
], MessagesController);


/***/ }),

/***/ "./apps/losty-gateway/src/controllers/users.controller.ts":
/*!****************************************************************!*\
  !*** ./apps/losty-gateway/src/controllers/users.controller.ts ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const authorization_decorator_1 = __webpack_require__(/*! ../decorators/authorization.decorator */ "./apps/losty-gateway/src/decorators/authorization.decorator.ts");
let UsersController = class UsersController {
    constructor() { }
    async getUser(req) {
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, authorization_decorator_1.Authorization)(true),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof Request !== "undefined" && Request) === "function" ? _a : Object]),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UsersController.prototype, "getUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [])
], UsersController);


/***/ }),

/***/ "./apps/losty-gateway/src/decorators/authorization.decorator.ts":
/*!**********************************************************************!*\
  !*** ./apps/losty-gateway/src/decorators/authorization.decorator.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Authorization = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const Authorization = (secured) => (0, common_1.SetMetadata)('secured', secured);
exports.Authorization = Authorization;


/***/ }),

/***/ "./apps/losty-gateway/src/proxy-rmq/client-proxy-rmq.ts":
/*!**************************************************************!*\
  !*** ./apps/losty-gateway/src/proxy-rmq/client-proxy-rmq.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientProxyRMQ = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let ClientProxyRMQ = class ClientProxyRMQ {
    constructor(configService) {
        this.configService = configService;
        this.user = this.configService.get('RMQ_USER');
        this.password = this.configService.get('RMQ_PASSWORD');
        this.url = this.configService.get('RMQ_URL');
    }
    getClientProxyReportInstance() {
        return microservices_1.ClientProxyFactory.create({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [`amqp://${this.user}:${this.password}@${this.url}`],
                queue: 'report',
                queueOptions: {
                    durable: true
                }
            }
        });
    }
};
exports.ClientProxyRMQ = ClientProxyRMQ;
exports.ClientProxyRMQ = ClientProxyRMQ = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ClientProxyRMQ);


/***/ }),

/***/ "./apps/losty-gateway/src/proxy-rmq/proxy-rmq.module.ts":
/*!**************************************************************!*\
  !*** ./apps/losty-gateway/src/proxy-rmq/proxy-rmq.module.ts ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProxyRmqModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_proxy_rmq_1 = __webpack_require__(/*! ./client-proxy-rmq */ "./apps/losty-gateway/src/proxy-rmq/client-proxy-rmq.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let ProxyRmqModule = class ProxyRmqModule {
};
exports.ProxyRmqModule = ProxyRmqModule;
exports.ProxyRmqModule = ProxyRmqModule = __decorate([
    (0, common_1.Module)({
        providers: [client_proxy_rmq_1.ClientProxyRMQ, config_1.ConfigService],
        exports: [client_proxy_rmq_1.ClientProxyRMQ],
    })
], ProxyRmqModule);


/***/ }),

/***/ "./apps/losty-gateway/src/report/controllers/report.controller.ts":
/*!************************************************************************!*\
  !*** ./apps/losty-gateway/src/report/controllers/report.controller.ts ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ReportController_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const report_service_1 = __webpack_require__(/*! ../report.service */ "./apps/losty-gateway/src/report/report.service.ts");
let ReportController = ReportController_1 = class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
        this.logger = new common_1.Logger(ReportController_1.name);
    }
    async reportItem(request) {
        this.logger.log('Getting reported items');
        return await this.reportService.getReportedItems();
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Request !== "undefined" && Request) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ReportController.prototype, "reportItem", null);
exports.ReportController = ReportController = ReportController_1 = __decorate([
    (0, common_1.Controller)('report'),
    __metadata("design:paramtypes", [typeof (_a = typeof report_service_1.ReportService !== "undefined" && report_service_1.ReportService) === "function" ? _a : Object])
], ReportController);


/***/ }),

/***/ "./apps/losty-gateway/src/report/report.module.ts":
/*!********************************************************!*\
  !*** ./apps/losty-gateway/src/report/report.module.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const proxy_rmq_module_1 = __webpack_require__(/*! ../proxy-rmq/proxy-rmq.module */ "./apps/losty-gateway/src/proxy-rmq/proxy-rmq.module.ts");
const report_controller_1 = __webpack_require__(/*! ./controllers/report.controller */ "./apps/losty-gateway/src/report/controllers/report.controller.ts");
const report_service_1 = __webpack_require__(/*! ./report.service */ "./apps/losty-gateway/src/report/report.service.ts");
let ReportModule = class ReportModule {
};
exports.ReportModule = ReportModule;
exports.ReportModule = ReportModule = __decorate([
    (0, common_1.Module)({
        imports: [proxy_rmq_module_1.ProxyRmqModule],
        controllers: [report_controller_1.ReportController],
        providers: [report_service_1.ReportService]
    })
], ReportModule);


/***/ }),

/***/ "./apps/losty-gateway/src/report/report.service.ts":
/*!*********************************************************!*\
  !*** ./apps/losty-gateway/src/report/report.service.ts ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_proxy_rmq_1 = __webpack_require__(/*! ../proxy-rmq/client-proxy-rmq */ "./apps/losty-gateway/src/proxy-rmq/client-proxy-rmq.ts");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
let ReportService = class ReportService {
    constructor(clientProxyRMQ) {
        this.clientProxyRMQ = clientProxyRMQ;
        this.reportClient = this.clientProxyRMQ.getClientProxyReportInstance();
    }
    async getReportedItems() {
        console.log('service');
        console.log(this.reportClient);
        const reportResponse = this.reportClient.send('find_all_items', JSON.stringify({ data: 'test data' }));
        let reportedItems = await (0, rxjs_1.lastValueFrom)(reportResponse);
        return await reportedItems;
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof client_proxy_rmq_1.ClientProxyRMQ !== "undefined" && client_proxy_rmq_1.ClientProxyRMQ) === "function" ? _a : Object])
], ReportService);


/***/ }),

/***/ "./apps/losty-gateway/src/services/gateway.service.ts":
/*!************************************************************!*\
  !*** ./apps/losty-gateway/src/services/gateway.service.ts ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GatewayService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let GatewayService = class GatewayService {
    constructor() {
        console.log('service');
    }
    async getReportedItems() {
        console.log('service');
    }
};
exports.GatewayService = GatewayService;
exports.GatewayService = GatewayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GatewayService);


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!****************************************!*\
  !*** ./apps/losty-gateway/src/main.ts ***!
  \****************************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./apps/losty-gateway/src/app.module.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const exception_filter_1 = __webpack_require__(/*! ./common/exceptions/exception.filter */ "./apps/losty-gateway/src/common/exceptions/exception.filter.ts");
const timeout_interceptor_1 = __webpack_require__(/*! ./common/interceptors/timeout.interceptor */ "./apps/losty-gateway/src/common/interceptors/timeout.interceptor.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.setGlobalPrefix('api/v1');
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new exception_filter_1.AllExceptionsFilter());
    app.useGlobalInterceptors(new timeout_interceptor_1.TimeoutInterceptor());
    await app.listen(configService.get('PORT'));
}
bootstrap();

})();

/******/ })()
;