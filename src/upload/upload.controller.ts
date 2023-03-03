import {
    Controller,
    FileTypeValidator,
    Get,
    Header,
    HttpCode,
    HttpStatus, MaxFileSizeValidator, ParseFilePipe,
    Post,
    Res,
    StreamableFile, UploadedFile,
    UseInterceptors
} from "@nestjs/common";
import { UploadService } from "./upload.service";
import { createReadStream } from "fs";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller("upload")
export class UploadController {
    constructor(private uploadService: UploadService) {
    }

    @Post("/send")
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: "./uploads/",
            filename(req, file, cb) {
                let extArray = file.originalname.split(".");
                let extension = extArray[extArray.length - 1];
                cb(null, file.fieldname + "." + extension);
            }
        })
    }))
    async upload(@UploadedFile(
                     new ParseFilePipe({
                             validators: [
                                 new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
                                 new FileTypeValidator({ fileType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
                             ]
                         }
                     )
                 )
                     file: Express.Multer.File,
                 @Res() res
    ) {
        const success = await this.uploadService.syncUsers(file.filename);
        success ? res.status(HttpStatus.OK).send() : res.status(HttpStatus.UNPROCESSABLE_ENTITY).send();
    }

    @Get("/get")
    @HttpCode(200)
    @Header("Content-Type", "application/xlsx")
    @Header("Content-Disposition", "attachment; filename=users.xlsx")
    async download(@Res() res) {
        await this.uploadService.createNewWorkSheet();
        const file = createReadStream("./uploads/users.xlsx");
        file.pipe(res);
    }
}
