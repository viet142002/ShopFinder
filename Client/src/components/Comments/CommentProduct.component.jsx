function CommentProduct() {
    return (
        <>
            <div className="comment-product">
                <div className="comment-product__header">
                    <h3 className="comment-product__title">
                        Bình luận sản phẩm
                    </h3>
                    <div className="comment-product__rating">
                        <span className="comment-product__star">
                            <i className="fas fa-star"></i>
                        </span>
                        <span className="comment-product__star">
                            <i className="fas fa-star"></i>
                        </span>
                        <span className="comment-product__star">
                            <i className="fas fa-star"></i>
                        </span>
                        <span className="comment-product__star">
                            <i className="fas fa-star"></i>
                        </span>
                        <span className="comment-product__star">
                            <i className="fas fa-star"></i>
                        </span>
                    </div>
                </div>
                <div className="comment-product__body">
                    <div className="comment-product__input">
                        <textarea
                            name="comment"
                            id="comment"
                            cols="30"
                            rows="10"
                            placeholder="Nhập bình luận của bạn"
                        ></textarea>
                        <button className="comment-product__btn">Gửi</button>
                    </div>
                    <div className="comment-product__list">
                        <div className="comment-product__item">
                            <div className="comment-product__avatar">
                                <img
                                    src="https://via.placeholder.com/50"
                                    alt="avatar"
                                />
                            </div>
                            <div className="comment-product__content">
                                <div className="comment-product__header">
                                    <h4 className="comment-product__name">
                                        Nguyễn Văn A
                                    </h4>
                                    <div className="comment-product__rating">
                                        <span className="comment-product__star">
                                            <i className="fas fa-star"></i>
                                        </span>
                                        <span className="comment-product__star">
                                            <i className="fas fa-star"></i>
                                        </span>
                                        <span className="comment-product__star">
                                            <i className="fas fa-star"></i>
                                        </span>
                                        <span className="comment-product__star">
                                            <i className="fas fa-star"></i>
                                        </span>
                                        <span className="comment-product__star">
                                            <i className="fas fa-star"></i>
                                        </span>
                                    </div>
                                </div>
                                <p className="comment-product__text">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Quisquam, quod.
                                </p>
                            </div>
                        </div>
                        <div className="comment-product__item">
                            <div className="comment-product__avatar">
                                <img
                                    src="https://via.placeholder.com/50"
                                    alt="avatar"
                                />
                            </div>
                            <div className="comment-product__content">
                                <div className="comment-product__header">
                                    <h4 className="comment-product__name">
                                        Nguyễn Văn A
                                    </h4>
                                    <div className="comment-product__rating">
                                        <span className="comment-product__star">
                                            <i className="fas fa-star"></i>
                                        </span>
                                        <span className="comment-product__star">
                                            <i className="fas fa-star"></i>
                                        </span>
                                        <span className="comment-product__star">
                                            <i className="fas fa-star"></i>
                                        </span>
                                        <span className="comment-product__star">
                                            <i className="fas fa-star"></i>
                                        </span>
                                        <span className="comment-product__star">
                                            <i className="fas fa-star"></i>
                                        </span>
                                    </div>
                                </div>
                                <p className="comment-product__text">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Quisquam, quod.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CommentProduct;
