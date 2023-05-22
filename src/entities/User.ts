import { v4 as uuidv4 } from 'uuid';

export class User {
    public readonly _id: string | undefined;

    public name: string | undefined;
    public email: string | undefined;
    public password: string | undefined;

    constructor(props: Omit<User, '_id'>, id?: string) {
        Object.assign(this, props);
        const uuid = uuidv4();

        if (!id) {
            this._id = uuid;
        }
    }
}
