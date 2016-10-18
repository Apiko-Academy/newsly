import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TrelloUserSchema = Schema({
  userId: {
    type: String,
    default: '',
  },
  token: {
    type: String,
    default: '',
  },
  username: {
    type: String,
    default: '',
  },
  displayName: {
    type: String,
    default: '',
  },
  avatarUrl: {
    type: String,
    default: '',
  },
  idBoards: {
    type: Array,
    default: [],
  },
});

export default mongoose.model('TrelloUser', TrelloUserSchema);
