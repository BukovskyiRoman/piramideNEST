"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterNewsTable1679646005812 = void 0;
const typeorm_1 = require("typeorm");
class AlterNewsTable1679646005812 {
    async up(queryRunner) {
        await queryRunner.changeColumn('news', 'date', new typeorm_1.TableColumn({
            isNullable: false,
            type: "bigInt",
            name: 'date'
        }));
    }
    async down(queryRunner) {
        await queryRunner.changeColumn('news', 'date', new typeorm_1.TableColumn({
            isNullable: false,
            type: "varchar",
            name: 'date'
        }));
    }
}
exports.AlterNewsTable1679646005812 = AlterNewsTable1679646005812;
//# sourceMappingURL=1679646005812-AlterNewsTable.js.map