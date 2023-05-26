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

export class ImongoFindOneUserDTO {
    public _id!: string;
    public user!: User;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: any) {
        const { _doc } = props;
        if (_doc) {
            return _doc;
        }
        return props;
    }
}
