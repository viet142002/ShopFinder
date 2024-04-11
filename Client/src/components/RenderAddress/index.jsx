function RenderAddress({ address, className = '' }) {
    return (
        <>
            <p className={className}>
                {address.more && address.more + ', '}
                {`${address.ward}, ${address.district}, ${address.province}`}
            </p>
        </>
    );
}

export default RenderAddress;
