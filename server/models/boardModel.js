import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BoardSchema = Schema({
  boardId: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    default: '',
  },
  memberships: {
    type: Array,
    default: [],
  },
});

export default mongoose.model('Board', BoardSchema);
