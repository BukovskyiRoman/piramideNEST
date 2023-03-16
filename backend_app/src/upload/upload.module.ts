import { Module } from '@nestjs/common';
import { UploadController } from "./upload.controller";
import { UsersModule } from "../users/users.module";
import { UploadService } from "./upload.service";

@Module({
    providers: [UploadService],
    controllers: [UploadController],
    exports: [UploadService],
    imports: [UsersModule],
})
export class UploadModule {}
