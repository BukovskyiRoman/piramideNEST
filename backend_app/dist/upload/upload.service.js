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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../enum/role.enum");
const users_service_1 = require("../users/users.service");
const ExcelJS = require("exceljs");
let UploadService = class UploadService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createNewWorkSheet() {
        const users = await this.usersService.getUsersByRole([role_enum_1.Role.User, role_enum_1.Role.Investor]);
        const workbook = new ExcelJS.Workbook();
        workbook.creator = "Admin Adminovich";
        workbook.title = "Users data";
        const worksheet = workbook.addWorksheet("My sheet");
        worksheet.columns = [
            { header: "Id", key: "id", width: 10 },
            { header: "First name", key: "first_name", width: 32 },
            { header: "Last name", key: "last_name", width: 32 },
            { header: "email", key: "email", width: 32 },
            { header: "role", key: "role", width: 10 },
            { header: "balance", key: "balance", width: 15 }
        ];
        users.forEach(user => {
            worksheet.addRow({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.roles,
                balance: user.balance
            });
        });
        await workbook.xlsx.writeFile("./uploads/users.xlsx");
    }
    async syncUsers(filename) {
        const workbook = new ExcelJS.Workbook();
        let sheet;
        let check;
        try {
            const file = await workbook.xlsx.readFile(`./uploads/${filename}`);
            sheet = file.getWorksheet("My sheet");
            check = await this.checkExcelFields(sheet.getRow(1));
        }
        catch (err) {
            return false;
        }
        if (!check)
            return false;
        await sheet.eachRow(async (row, count) => {
            if (count > 1) {
                const email = row.values[4].text ? row.values[4].text : row.values[4];
                const user = await this.usersService.getUserWithPassword(email);
                if (user) {
                    if (user.first_name !== row.values[2]) {
                        await this.usersService.updateUserProp(user.id, { first_name: row.values[2] });
                    }
                    if (user.last_name !== row.values[3]) {
                        await this.usersService.updateUserProp(user.id, { last_name: row.values[3] });
                    }
                    if (row.values[5] && user.roles !== row.values[5]) {
                        await this.usersService.updateUserProp(user.id, { roles: row.values[5] });
                    }
                }
                else {
                    const data = {
                        first_name: row.values[2],
                        last_name: row.values[3],
                        email,
                        password: "12345678",
                        roles: row.values[5] ? row.values[5] : role_enum_1.Role.User
                    };
                    await this.usersService.createUser(data);
                }
            }
        });
        return true;
    }
    async checkExcelFields(row) {
        const values = Object.values(row.values);
        const data = [
            "id",
            "first name",
            "last name",
            "email",
            "role",
            "balance"
        ];
        const result = values.filter(item => data.includes(item.toLowerCase()));
        return result.length === data.length;
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map