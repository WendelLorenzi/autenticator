

export class User {
    public _id!: string;

    public name!: string;
    public email!: string;
    public password!: string;

    constructor(props: Omit<User, '_id'>, id?: string) {
        Object.assign(this, props);

        if (id && id != undefined) {
            this._id = id;
        }
    }
}
