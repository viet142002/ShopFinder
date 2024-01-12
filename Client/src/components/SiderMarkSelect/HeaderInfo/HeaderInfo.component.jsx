function HeaderInfo({ name, rate, type }) {
    return (
        <div className="px-siderInfo pt-[5px]">
            <h2 className="text-lg font-medium">{name}</h2>
            <p>{rate}</p>
            <p>{type}</p>
        </div>
    );
}

export default HeaderInfo;
