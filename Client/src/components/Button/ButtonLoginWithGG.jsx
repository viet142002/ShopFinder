import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { loginWithGoogleApi } from '@api/authApi';

export function ButtonLoginWithGG({ setData }) {
    const [user, setUser] = useState(null);
    // const [profile, setProfile] = useState(null);
    // console.log('🚀 ~ ButtonLoginWithGG ~ profile:', profile);
    const handleLogin = useGoogleLogin({
        flow: 'implicit',
        onSuccess: (res) => {
            setUser(res);
        }
    });

    useEffect(() => {
        if (user) {
            console.log('🚀 ~ useEffect ~ user:', user);
            const fetchData = async () => {
                try {
                    const profile = await axios.get(
                        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                        {
                            headers: {
                                Authorization: `Bearer ${user.access_token}`,
                                Accept: 'application/json'
                            }
                        }
                    );
                    const res = await loginWithGoogleApi(profile.data);
                    setData(res.data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }
    }, [user, setData]);

    return (
        <Button
            onClick={() => handleLogin()}
            icon={<GoogleOutlined />}
            className="flex items-center font-medium"
        >
            Google
        </Button>
    );
}
