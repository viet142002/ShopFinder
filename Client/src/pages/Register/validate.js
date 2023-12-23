import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Vui lòng nhập họ"),
  lastName: Yup.string().required("Vui lòng nhập tên"),
  email: Yup.string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng nhập email"),
  password: Yup.string()
    .required("Vui lòng nhập mât khẩu")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(/(?=.*[0-9])/, "Mật khẩu phải có ít nhất 1 số"),
  confirm_password: Yup.string()
    .required("Vui lòng nhập lại mật khẩu")
    .oneOf([Yup.ref("password")], "Mật Khẩu không khớp"),
});

export default registerSchema;
