import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import style from '../style.module.scss';
import loginSchema from './validate';
import { loginApi, loginRetailerApi } from '@api/authApi';
import { setUser } from '@redux/userSlice';
import { handleFetch } from '@utils/expression';
import { ButtonLoginWithGG } from '@components/Button';
import { setRetailer } from '@redux/retailerSlice';
import { Show } from '@components/common';

function LoginPage({ isLoginRetailer = false }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [data, setData] = useState(null);
    const redirect = searchParams.get('redirect');

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        let data = null;
        if (isLoginRetailer) {
            data = await handleFetch(() => loginRetailerApi(values));
        } else {
            data = await handleFetch(() => loginApi(values));
        }
        setData(data);
        setSubmitting(false);
    };

    useEffect(() => {
        if (data) {
            if (isLoginRetailer) {
                dispatch(
                    setRetailer({
                        retailer: data.retailer,
                        token: data.token
                    })
                );
                localStorage.setItem('token', data.token);
                if (redirect) return navigate(redirect);
                return navigate(`/retailer/${data.retailer._id}/dashboard`);
            }

            dispatch(setUser({ user: data.user, token: data.token }));
            if (redirect) {
                if (
                    redirect.split('/').includes('admin') &&
                    data.user.role === 'admin'
                ) {
                    return navigate(redirect);
                }
                return navigate(redirect);
            }

            if (data.user.role === 'admin') return navigate('/admin/dashboard');
            return navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, dispatch, navigate, redirect]);

    return (
        <>
            <div
                className={clsx(
                    'flex h-svh items-center justify-center',
                    style['container-auth']
                )}
            >
                <div className={clsx(style['slider-thumb'])}></div>
                <section className="z-10 w-[90%] bg-white bg-opacity-[0.8] p-6 md:h-auto md:w-[40%] md:px-14 md:py-10">
                    <h1 className="mb-10 text-center text-2xl font-bold">
                        {isLoginRetailer ? 'Đăng nhập cửa hàng' : 'Đăng nhập'}
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
                                            autoComplete="on"
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
                                        <Show>
                                            <Show.Then isTrue={isLoginRetailer}>
                                                <Link to="/register-retailer">
                                                    Đăng ký
                                                </Link>
                                            </Show.Then>
                                            <Show.Else>
                                                <Link
                                                    to={
                                                        redirect
                                                            ? `/register?redirect=${redirect}`
                                                            : '/register'
                                                    }
                                                >
                                                    Đăng ký
                                                </Link>
                                            </Show.Else>
                                        </Show>
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

                    {!isLoginRetailer && (
                        <div className="mt-6 flex justify-center">
                            <ButtonLoginWithGG setData={setData} />
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}

export default LoginPage;
