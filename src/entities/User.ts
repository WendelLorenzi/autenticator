import { v4 as uuidv4 } from 'uuid';

export class User {
    public readonly _id!: string;

    public name!: string;
    public email!: string;
    public password!: string;

    constructor(props: Omit<User, '_id'>, id?: string) {
        Object.assign(this, props);
        const uuid = uuidv4();

        if (!id) {
            this._id = uuid;
        }
    }
}
