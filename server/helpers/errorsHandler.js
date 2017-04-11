import winston from 'winston';

export default function (message) {
  return (err) => {
    winston.error(message);
    winston.error(err);
  };
}
