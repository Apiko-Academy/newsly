import toastr from 'toastr';

export default function (err) {
  toastr.error(err.message);
}
