"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const fs_1 = require("fs");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
    }
    async upload(file, res) {
        const success = await this.uploadService.syncUsers(file.filename);
        success ? res.status(common_1.HttpStatus.OK).send() : res.status(common_1.HttpStatus.UNPROCESSABLE_ENTITY).send();
    }
    async download(res) {
        await this.uploadService.createNewWorkSheet();
        const file = (0, fs_1.createReadStream)("./uploads/users.xlsx");
        file.pipe(res);
    }
};
__decorate([
    (0, common_1.Post)("/send"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: (0, multer_1.diskStorage)({
            destination: "./uploads/",
            filename(req, file, cb) {
                let extArray = file.originalname.split(".");
                let extension = extArray[extArray.length - 1];
                cb(null, file.fieldname + "." + extension);
            }
        })
    })),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
            new common_1.FileTypeValidator({ fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
        ]
    }))),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)("/get"),
    (0, common_1.HttpCode)(200),
    (0, common_1.Header)("Content-Type", "application/xlsx"),
    (0, common_1.Header)("Content-Disposition", "attachment; filename=users.xlsx"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "download", null);
UploadController = __decorate([
    (0, common_1.Controller)("upload"),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map