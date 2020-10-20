export class User {
    constructor(
       public name: string,
       public email: string,
       public id?: number,
       public lastLogin?: Date,
       public password: string = ''
    ) { }

    getIdAndName(): string {
        return this.id + ": " + this.name;
    }
}