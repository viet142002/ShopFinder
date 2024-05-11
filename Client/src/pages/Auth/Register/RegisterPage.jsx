import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import style from '../style.module.scss';
import registerSchema from './validate';
import { registerApi } from '~/api/authApi';
import { setUser } from '~/redux/userSlice';
import { handleFetch } from '~/utils/expression';

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect');

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        const res = await handleFetch(() => registerApi(values));
        setSubmitting(false);
        if (res.token) {
            dispatch(setUser({ user: res.newUser, token: res.token }));
            if (redirect) {
                if (
                    redirect.split('/').includes('admin') ||
                    redirect.split('/').includes('retailer')
                ) {
                    return navigate('/');
                }
                return navigate(redirect);
            }
            return navigate('/');
        }
    };

    return (
        <>
            <div
                className={clsx(
                    'flex min-h-screen items-center justify-center',
                    style['container-auth']
                )}
            >
                <div className={clsx(style['slider-thumb'])}></div>
                <section className="z-10 w-[90%] bg-white bg-opacity-[0.8] p-6 md:w-[50%] md:p-10">
                    <h1 className="mb-10 text-center text-2xl font-bold">
                        Đăng ký
                    </h1>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            confirm_password: '',
                            firstname: '',
                            lastname: ''
                        }}
                        validationSchema={registerSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-6">
                                <div className="flex gap-6">
                                    <div className="flex-1">
                                        <Field
                                            className="input-auth"
                                            type="text"
                                            placeholder="Nguyễn Văn"
                                            name="lastname"
                                        />
                                        <ErrorMessage
                                            name="lastname"
                                            component="small"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Field
                                            className="input-auth"
                                            type="text"
                                            placeholder="A"
                                            name="firstname"
                                        />
                                        <ErrorMessage
                                            name="firstname"
                                            component="small"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="abc@gmail.com"
                                        className="input-auth"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="small"
                                    />
                                </div>
                                <div>
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Mật khẩu"
                                        className="input-auth"
                                        autoComplete="on"
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="small"
                                    />
                                </div>
                                <div>
                                    <Field
                                        type="password"
                                        name="confirm_password"
                                        placeholder="Nhập lại mật khẩu"
                                        className="input-auth"
                                        autoComplete="on"
                                    />
                                    <ErrorMessage
                                        name="confirm_password"
                                        component="small"
                                    />
                                </div>
                                <div>
                                    <p className="text-center">
                                        Bạn chưa có tài khoản?{' '}
                                        <Link
                                            to={
                                                redirect
                                                    ? `/login?redirect=${redirect}`
                                                    : '/login'
                                            }
                                            className="hover:text-blue-500"
                                        >
                                            Đăng nhập
                                        </Link>
                                    </p>
                                    <p className="text-center">
                                        Bạn muốn đăng ký bán hàng?{' '}
                                        <Link
                                            to="/register-retailer"
                                            className="hover:text-blue-500"
                                        >
                                            Đăng ký ngay
                                        </Link>
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <button
                                        className="bg-black p-[10px_30px] text-lg font-bold text-white"
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Đăng ký
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
