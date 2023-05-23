import { User } from './User';

export class UserToken {
    public user!: User;
    public token!: string;

    constructor(props: object) {
        Object.assign(this, props);
    }
}
