import { User } from './User';

export class UserToken {
    public userId!: string;
    public token!: string;

    constructor(props: object) {
        Object.assign(this, props);
    }
}

export class ImongoFindOneTokenDTO {
    public _id!: string;
    public user!: User;
    public token!: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: any) {
        const { _doc } = props;
        if (_doc) {
            return _doc;
        }
        return props;
    }
}
