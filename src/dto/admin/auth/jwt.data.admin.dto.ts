export class JwtDataAdminDto {
    adminId: number;
    username: string;
    ext: number;

    toPlainObject() {
        return {
            administratorId: this.adminId,
            username: this.username,
            exp: this.ext
        }
    }
}