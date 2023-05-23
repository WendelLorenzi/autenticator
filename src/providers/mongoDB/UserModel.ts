import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../../entities/User';

const db = mongoose.connection.useDb('Users');

export type IUserSchema = User & Document;

const UserSchema: Schema = new Schema(
  {
    _id: {type: String },
    name: { type: String },
    email: { type: String },
    password: { type: String },
  },
  {
    collection: 'users',
  },
);

UserSchema.set('toJSON', {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  transform(__: any, ret: any, _: any) {
    ret.id = ret._id;
    delete ret.__v;
  },
});

const modelUsers = db.model<IUserSchema>('users', UserSchema);

export default modelUsers;
