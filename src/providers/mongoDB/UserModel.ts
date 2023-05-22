import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../../entities/User';

const db = mongoose.connection.useDb('UsersDB');

export type IUserSchema = User & Document;

const UserSchema: Schema = new Schema(
  {
    _id: {type: String },
    name: { type: String },
    email: { type: String },
    password: { type: String },
  },
  {
    collection: 'Users',
  },
);

UserSchema.set('toJSON', {
  transform(__: any, ret: any, _: any) {
    ret.id = ret._id;
    delete ret.__v;
  },
});

const modelUsers = db.model<IUserSchema>('Users', UserSchema);

export default modelUsers;
