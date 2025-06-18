import React from 'react';
import './SizeGuideModal.css';

const SizeGuideModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Hướng dẫn chọn size</h2>
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <div className="categories">
                        {/* Men's Clothing */}
                        <section className="category">
                            <h2><strong>QUẦN ÁO NAM</strong></h2>
                            <img src="http://localhost:8055/assets/a5764261-3133-453d-9721-4829fe6f3772.png?width=1000&height=1000"
                                alt="Qa Nam 008aa22210494eacb7228e246b8f5878.png" />
                        </section>

                        {/* Women's Clothing */}
                        <section className="category">
                            <h2><strong>QUẦN ÁO NỮ</strong></h2>
                            <img src="http://localhost:8055/assets/3d63a265-0604-43e5-a6de-add7a0813503.png?width=1000&height=1000"
                                alt="Qa Nu 099e7bf720d94cbab33c139ed01c5c7c.png" loading="lazy" />
                        </section>

                        {/* Men's Shoes */}
                        <section className="category">
                            <h2><strong>GIÀY DÉP NAM</strong></h2>
                            <img src="http://localhost:8055/assets/ac88638b-c54e-4b89-8cc5-ec359a1d1598.jpg?width=1000&height=1000"
                                alt="Size Giay Ln Update.jpg" loading="lazy" />
                        </section>

                        {/* Women's Shoes */}
                        <section className="category">
                            <h2><strong>GIÀY DÉP NỮ</strong></h2>
                            <img src="http://localhost:8055/assets/e7ec7ee1-82ef-413c-a8d1-c0a9bdd7ebcf.png?width=1000&height=1000"
                                alt="Giay Nu Li Ning 1b4cb60e456f4e3d9589cb7bb86579f7.png" loading="lazy" />
                        </section>

                        {/* Kids' Clothing */}
                        <section className="category">
                            <h2><strong>ÁO TRẺ EM</strong></h2>
                            <img src="http://localhost:8055/assets/80ac0512-2acc-442e-940b-339ffb433e06.png?width=1000&height=1000"
                                alt="Ao Kid 512b95ce662247269b1d9da3e4727cf1.png" loading="lazy" />
                        </section>

                        {/* Kids' Pants */}
                        <section className="category">
                            <h2><strong>QUẦN TRẺ EM</strong></h2>
                            <img src="http://localhost:8055/assets/a7d56fc7-1b16-4d38-adce-39ffc0eba246.png?width=1000&height=1000"
                                alt="Quan Kid 5e3c428790a24cbaa2a3c5b2b835f4ca.png" loading="lazy" />
                        </section>

                        {/* Girls' Dresses */}
                        <section className="category">
                            <h2><strong>VÁY LIỀN BÉ GÁI</strong></h2>
                            <img src="http://localhost:8055/assets/a7d56fc7-1b16-4d38-adce-39ffc0eba246.png?width=1000&height=1000"
                                alt="Quan Kid 5e3c428790a24cbaa2a3c5b2b835f4ca.png" loading="lazy" />
                        </section>

                        {/* Kids' Shoes */}
                        <section className="category">
                            <h2><strong>GIÀY DÉP TRẺ EM</strong></h2>
                            <img src="http://localhost:8055/assets/fff18a5e-42d3-4df8-bc43-54de24810aed.png?width=600&height=600"
                                alt="Bv2672 063 29 6c0c95fcf10f4b98aa6584e9f3898c0f Grande.png" loading="lazy" />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SizeGuideModal; 