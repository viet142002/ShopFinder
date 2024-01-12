import { Input, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTypeLocation, setSearchText } from '../../redux/searchSlice.js';

import { typeLocations } from '../../utils/typeConstraint.js';

function SearchLocation() {
    const dispatch = useDispatch();
    const selectType = useSelector((state) => state.search.type);
    const searchText = useSelector((state) => state.search.searchText);

    const [isFetch, setIsFetch] = useState(false);
    const [search, setSearch] = useState(searchText);

    useEffect(() => {
        const fetchData = setTimeout(async () => {
            try {
                console.log('fetch data');
            } catch (err) {
                console.log(err);
            }
        }, 1000);

        return () => {
            clearTimeout(fetchData);
        };
    }, [search, isFetch]);

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
                        type="checkbox"
                        name="type-location"
                        onChange={() =>
                            dispatch(
                                setTypeLocation(
                                    selectType === item.value
                                        ? 'all'
                                        : item.value
                                )
                            )
                        }
                        value={item.value}
                        checked={selectType === item.value}
                        id={item.value}
                    />
                    <span className="text-nowrap">{item.label}</span>
                </label>
            ),
            key: index
        };
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setTypeLocation(selectType));
        dispatch(setSearchText(search));
        setIsFetch(true);
        console.log(selectType, search);
    };

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-nowrap items-center space-x-4">
                <div>
                    <Input
                        type="text"
                        className="border-none bg-white min-w-[350px]"
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
                                    className="cursor-pointer rounded-md bg-white px-2 py-1 has-[:checked]:bg-gray-300"
                                >
                                    <input
                                        className="hidden"
                                        type="checkbox"
                                        name="type-location"
                                        value={item.value}
                                        checked={selectType === item.value}
                                        onChange={() =>
                                            dispatch(
                                                setTypeLocation(
                                                    selectType === item.value
                                                        ? 'all'
                                                        : item.value
                                                )
                                            )
                                        }
                                        id={item.value}
                                    />
                                    <span className="text-nowrap">
                                        {item.label}
                                    </span>
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
            </div>
        </form>
    );
}

export default SearchLocation;
