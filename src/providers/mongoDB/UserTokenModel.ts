import mongoose, { Schema } from "mongoose";
import { UserToken } from "../../entities/UserToken";

const db = mongoose.connection.useDb('Users');

export type IUserTokenSchema = UserToken & Document;

const UserTokenSchema: Schema = new Schema(
  {
    user: { type: Object },
    token: { type: String },
  },
  {
    collection: 'userTokens',
  },
);

UserTokenSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  transform(__: any, ret: any, _: any) {
    ret.id = ret._id;
    delete ret.__v;
  },
});

const modelUsersToken = db.model<IUserTokenSchema>('userTokens', UserTokenSchema);

export default modelUsersToken;
