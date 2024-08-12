import mongoose from "mongoose";
import { DateTime } from "luxon";

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    message: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "users", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "users", required: true },
    date_sent: { type: Date, default: Date.now }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

MessageSchema.virtual("date_sent_formatted").get(function () {
  return DateTime.fromJSDate(this.date_sent).toLocaleString(DateTime.DATETIME_MED);
});

export default mongoose.model("messages", MessageSchema);
