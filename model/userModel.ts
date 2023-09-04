import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  email: {
  },
  contactNumber: {
    type: Number
  },
  password: {
    type: String,
    required: true,
  },
  is_Verified: {
    type: Boolean,
    default: false
  }
});
UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});
/* eslint-disable */
UserSchema.pre("findOneAndUpdate", function (next) {
  const update: any = this.getUpdate();

  if (update.password) {
    bcrypt.genSalt(10, (errB, salt) => {
      if (errB) {
        return next(errB);
      }

      bcrypt.hash(update.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        console.log();

        update.password = hash;

        this.setUpdate(update);
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.validatePassword = function (passwords: string) {
  return bcrypt.compare(passwords, this.password)
};

export default mongoose.model("User", UserSchema);