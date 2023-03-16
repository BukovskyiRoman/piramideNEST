/// <reference types="multer" />
import { UploadService } from "./upload.service";
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    upload(file: Express.Multer.File, res: any): Promise<void>;
    download(res: any): Promise<void>;
}
