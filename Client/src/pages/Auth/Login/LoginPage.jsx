import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import style from '../style.module.scss';
import loginSchema from './validate';
import { loginApi } from '@api/authApi';
import { setUser } from '@redux/userSlice';
import { handleFetch } from '@utils/expression';

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const redirect = searchParams.get('redirect');

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        const data = await handleFetch(() => loginApi(values));

        setSubmitting(false);
        if (data) {
            dispatch(setUser({ user: data.user, token: data.token }));

            if (redirect) {
                if (
                    redirect.split('/').includes('admin') &&
                    data.user.role === 'admin'
                ) {
                    return navigate(redirect);
                }
                if (
                    redirect.split('/').includes('retailer') &&
                    data.user.role === 'retailer'
                ) {
                    return navigate(redirect);
                }
                return navigate('/');
            }

            if (data.user.role === 'admin') return navigate('/admin/dashboard');
            return navigate('/');
        }
    };

    return (
        <>
            <div
                className={clsx(
                    'flex h-svh items-center justify-center',
                    style['container-auth']
                )}
            >
                <div className={clsx(style['slider-thumb'])}></div>
                <section className="z-10 w-[90%] bg-white bg-opacity-[0.8] p-16 md:h-auto md:w-[50%]">
                    <h1 className="mb-10 text-center text-2xl font-bold">
                        Đăng nhập
                    </h1>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={loginSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-6">
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
                                    <div className="relative">
                                        <Field
                                            type={
                                                isShowPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            name="password"
                                            placeholder="Mật khẩu"
                                            className="input-auth"
                                        />
                                        <Button
                                            className="absolute right-2 top-1/2 -translate-y-1/2 transform bg-white transition-all duration-150 hover:bg-gray-100"
                                            shape="circle"
                                            size="small"
                                            icon={
                                                isShowPassword ? (
                                                    <EyeInvisibleOutlined />
                                                ) : (
                                                    <EyeOutlined />
                                                )
                                            }
                                            onClick={() =>
                                                setIsShowPassword(
                                                    !isShowPassword
                                                )
                                            }
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="password"
                                        component="small"
                                    />
                                </div>
                                <div>
                                    <p className="text-center">
                                        Bạn chưa có tài khoản?{' '}
                                        <Link
                                            to={
                                                redirect
                                                    ? `/register?redirect=${redirect}`
                                                    : '/register'
                                            }
                                        >
                                            Đăng ký
                                        </Link>
                                    </p>
                                    <p className="text-center">
                                        <Link to="/forgot-password">
                                            Quên mật khẩu?
                                        </Link>
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
