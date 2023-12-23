import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import clsx from "clsx";

import registerSchema from "./validate";
import style from "../Login/style.module.scss";

function RegisterPage() {
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 500);
  };

  return (
    <>
      <div
        className={clsx(
          "flex min-h-screen items-center justify-center",
          style["container-auth"],
        )}
      >
        <div className={clsx(style["slider-thumb"])}></div>
        <section className="z-10 w-[50%] bg-white bg-opacity-[0.8] p-10">
          <h1 className="mb-10 text-center text-2xl font-bold">Đăng ký</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({
              isSubmitting,
              /* and other goodies */
            }) => (
              <Form className="space-y-6">
                <div className="flex gap-6">
                  <div className="flex-1">
                    <Field
                      className="input-auth"
                      type="text"
                      placeholder="Nguyễn Văn"
                      name="firstName"
                    />
                    <ErrorMessage name="firstName" component="small" />
                  </div>
                  <div className="flex-1">
                    <Field
                      className="input-auth"
                      type="text"
                      placeholder="A"
                      name="lastName"
                    />
                    <ErrorMessage name="lastName" component="small" />
                  </div>
                </div>
                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="abc@gmail.com"
                    className="input-auth"
                  />
                  <ErrorMessage name="email" component="small" />
                </div>
                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    className="input-auth"
                  />
                  <ErrorMessage name="password" component="small" />
                </div>
                <div>
                  <Field
                    type="password"
                    name="confirm_password"
                    placeholder="Mật khẩu"
                    className="input-auth"
                  />
                  <ErrorMessage name="confirm_password" component="small" />
                </div>
                <div>
                  <p className="text-center">
                    Bạn chưa có tài khoản? <Link to={"/login"}>Đăng nhập</Link>
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-black p-[10px_30px] text-lg font-bold text-white"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Đăng nhập
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </>
  );
}

export default RegisterPage;
