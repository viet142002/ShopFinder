import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Vui lòng nhập email"),
  password: Yup.string()
    .required("Vui lòng nhập mât khẩu")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(/(?=.*[0-9])/, "Mật khẩu phải có ít nhất 1 số"),
});

export default loginSchema;
