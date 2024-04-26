import { Table } from "antd";

import { getAllStore } from "@api/communityApi";
import { useEffect, useState } from "react";

/*
{
      _id: '65faacb1f4b26e52933103ec',
      name: 'Bò Né 3 Ngon Đéo',
      user: '65faa94bbd61e0c9c1d78b4e',
      type: 'food',
      phone: '113',
      description: 
        '<h2>Các tùy chọn dịch vụ</h2><ul><li>Mua hàng ngay trên xe</li><li>Đồ ăn mang đi</li><li>Ăn tại chỗ</li></ul><p><br></p><h2>Phù hợp cho người khuyết tật</h2><ul><li>Chỗ đỗ xe cho xe lăn</li><li>Chỗ ngồi cho xe lăn</li><li>Lối vào cho xe lăn</li></ul>',
      images: [
        {
          _id: '65faacb1f4b26e52933103e4',
          path: 
            '/images/AF1QipM1UFrawjglRJjbql01379Ff06AaOda8NUTWT_9=w375-h563-p-k-no_1710927025846.jpg',
          name: 
            'AF1QipM1UFrawjglRJjbql01379Ff06AaOda8NUTWT_9=w375-h563-p-k-no_1710927025846.jpg',
          __v: 0
        },
        {
          _id: '65faacb1f4b26e52933103e6',
          path: 
            '/images/AF1QipM92xutsam0AsgNViIAWzfTVXsKXA1NXEAmiU4t=w750-h563-p-k-no_1710927025847.jpg',
          name: 
            'AF1QipM92xutsam0AsgNViIAWzfTVXsKXA1NXEAmiU4t=w750-h563-p-k-no_1710927025847.jpg',
          __v: 0
        },
        {
          _id: '65faacb1f4b26e52933103e8',
          path: 
            '/images/AF1QipMSLq7-p27s5kpXBlpf32LtpMnCEyLdasXkG1KD=w375-h281-p-k-no_1710927025859.jpg',
          name: 
            'AF1QipMSLq7-p27s5kpXBlpf32LtpMnCEyLdasXkG1KD=w375-h281-p-k-no_1710927025859.jpg',
          __v: 0
        }
      ],
      location: {
        loc: { type: 'Point', coordinates: [ 105.27712419813929, 10.58781375869059 ] },
        _id: '65faacb1f4b26e52933103ed',
        address: {
          _id: '65faacb1f4b26e52933103ea',
          province: 'Cần Thơ',
          district: 'Ninh Kiều',
          ward: 'Xuân Khánh',
          more: 'Đường 30/4',
          __v: 0
        },
        type: 'food',
        information: '65faacb1f4b26e52933103ec',
        informationType: 'Information',
        __v: 0
      },
*/

function InformationManager() {
    const [stores, setStores] = useState([]);
    console.log("🚀 ~ InformationManager ~ stores:", stores)

    useEffect(() => {
        getAllStore().then((response) => {
            setStores(response.data.information);
        });
    }, []);
    return <section className="mx-auto w-[95%] md:w-">
        <Table dataSource={stores} rowKey="_id">
            <Table.Column title="Tên" dataIndex="name" key="name"
                render={(value) => value || "No name"}
            />
            <Table.Column title="Loại" dataIndex="type" key="type" />
            <Table.Column title="SDT" dataIndex="phone" key="phone" />
            <Table.Column title="Email" dataIndex="email" key="email" />
            <Table.Column title="Địa chỉ" dataIndex="location" key="address" />
        </Table>

    </section>
}

export default InformationManager;