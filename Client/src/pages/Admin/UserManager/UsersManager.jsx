import { Button, Table } from "antd";

import { getAllUser, updateStatusUser } from "@api/userApi";
import { useEffect, useState } from "react";

import { FilterUser } from "./components/FilterUser";
import { useSearchParams } from "react-router-dom";

function UsersManager() {
    const [searchParams] = useSearchParams();
    const [users, setUsers] = useState()


    const handleUpdateStatus = (userId, status) => {
        updateStatusUser({ userId, status }).then(() => {
            setUsers(users.map(user => {
                if (user._id === userId) {
                    user.status = status
                }
                return user
            }))

        })
    }

    useEffect(() => {
        getAllUser({
            ...Object.fromEntries(searchParams)
        }).then(res => {
            setUsers(res.data.users)
        })
    }, [searchParams])
    return <section className="mx-auto w-[95%] md:w-[80%]">
        <div className="my-6">
            <h1 className="font-bold text-xl text-center">Quản lý người dùng</h1>
        </div>
        <div className="mb-4"><FilterUser /></div>
        <Table
            dataSource={users}
            rowKey="_id"
        >
            <Table.Column
                title="Tên"
                dataIndex="lastname"
                key="lastname"
                render={(_, record) => `${record?.lastname} ${record?.firstname}`}
            />
            <Table.Column
                title="Email"
                dataIndex="email"
                key="email"
            />
            <Table.Column
                title="Số điện thoại"
                dataIndex="phone"
                key="phone"
            />
            <Table.Column
                title="Trạng thái"
                dataIndex="status"
                key="status"
                render={(_, record) => record.status === 'normal' ? 'Bình thường' : 'Khoá'}
            />
            <Table.Column
                title="Hành động"
                key="action"
                render={(_, record) => (
                    <div>
                        {
                            record.status === 'normal' || record.status === 'active' ? <Button danger type="primary" onClick={() => handleUpdateStatus(record._id, 'blocked')}>Chặn</Button> : <Button type="primary" onClick={() => handleUpdateStatus(record._id, 'normal')} className="bg-blue-500">Mở chặn</Button>
                        }
                    </div>
                )}
            />


        </Table>
    </section>
}

export default UsersManager;