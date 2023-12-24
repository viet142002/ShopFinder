import { Input, Dropdown, Space, Button } from "antd";
import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

import { typeLocations } from "../../utils/typeConstraint.js";

function HeaderMap() {
  const [selectType, setSelectType] = useState("all");
  const [search, setSearch] = useState("");

  let rest = [];
  let type = [...typeLocations];

  if (typeLocations.length > 5) {
    rest = type.slice(5);
    type = type.slice(0, 5);
  }

  const items = rest.map((item, index) => {
    return {
      label: (
        <label
          htmlFor={item.value}
          key={index}
          className="w-full cursor-pointer px-2 py-1 has-[:checked]:font-medium has-[:checked]:text-blue-500"
        >
          <input
            className="hidden"
            type="radio"
            name="type-location"
            onChange={() => setSelectType(item.value)}
            value={item.value}
            checked={selectType === item.value}
            id={item.value}
          />
          <span className="text-nowrap">{item.label}</span>
        </label>
      ),
      key: index,
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectType, search);
  };

  return (
    <header className="absolute left-1/2 top-0 z-[99999] mt-[20px] -translate-x-1/2  ">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-nowrap items-center space-x-4">
          <div>
            <Input
              type="text"
              className="border-none bg-white"
              placeholder="abc..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
          <div>
            <div className="flex flex-nowrap space-x-2">
              {type.map((item, index) => {
                return (
                  <label
                    htmlFor={item.value}
                    key={index}
                    className="cursor-pointer bg-white px-2 py-1 has-[:checked]:bg-gray-300"
                  >
                    <input
                      className="hidden"
                      type="radio"
                      name="type-location"
                      value={item.value}
                      checked={selectType === item.value}
                      onChange={() => setSelectType(item.value)}
                      id={item.value}
                    />
                    <span className="text-nowrap">{item.label}</span>
                  </label>
                );
              })}
              {rest.length > 0 && (
                <Dropdown menu={{ items }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      ...
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              )}
            </div>
          </div>
          <div>
            <Button
              onClick={(e) => handleSubmit(e)}
              shape="circle"
              icon={<SearchOutlined />}
            />
          </div>
        </div>
      </form>
    </header>
  );
}

export default HeaderMap;
