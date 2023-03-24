"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsTableCreate1679336083881 = void 0;
const typeorm_1 = require("typeorm");
class NewsTableCreate1679336083881 {
    async up(queryRunner) {
        await queryRunner.createTable((new typeorm_1.Table({
            name: 'news',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "body",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "href",
                    type: "varchar",
                    isNullable: false
                },
                {
                    type: "varchar",
                    name: "source",
                    isNullable: false
                },
                {
                    name: "date",
                    type: "varchar",
                    isNullable: false
                }
            ]
        })));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("news");
        await queryRunner.dropTable("news");
    }
}
exports.NewsTableCreate1679336083881 = NewsTableCreate1679336083881;
//# sourceMappingURL=1679336083881-NewsTableCreate.js.map