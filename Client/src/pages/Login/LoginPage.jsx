import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import clsx from "clsx";

import loginSchema from "./validate";
import style from "./style.module.scss";

function LoginPage() {
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
          <h1 className="mb-10 text-center text-2xl font-bold">Đăng nhập</h1>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({
              isSubmitting,
              /* and other goodies */
            }) => (
              <Form className="space-y-6">
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
                  <p className="text-center">
                    Bạn chưa có tài khoản? <Link to={"/register"}>Đăng ký</Link>{" "}
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    className="bg-black p-[10px_30px] text-lg font-bold text-white transition-all duration-150 hover:bg-gray-600 hover:shadow-md"
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

export default LoginPage;
