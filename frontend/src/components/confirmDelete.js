import Swal from "sweetalert2";

export const confirmDelete = async ({
  title = "Are you sure?",
  text = "This item will be permanently deleted.",
  confirmButtonText = "Yes, delete it!",
  cancelButtonText = "Cancel",
}) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
  });
};
