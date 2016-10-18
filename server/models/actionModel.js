import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ActionsSchema = new Schema({
  actionId: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  createdAt: {
    type: String,
    default: '',
  },
  date: {
    type: String,
  },
  author: {
    type: Object,
    default: {},
  },
  data: {
    type: Object,
    default: {},
  },
});

export default mongoose.model('Action', ActionsSchema);
