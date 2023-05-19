import React from "react";
import "./carItemViewer.scss";

export default function CarItemViewer({ item }) {
    return (
        <div className="carousal-item">
            <div className="carousal-item__image">
                <img src={item.image} alt="carousal item" />
            </div>
            {item.title && (
                <div
                    style={{
                        height: "100px",
                    }}
                ></div>
            )}
            {item.title && (
                <div className="carousal-item__content">
                    <h2 className="carousal-item__title">{item.title}</h2>
                    <p className="carousal-item__description">
                        {item.description}
                    </p>
                </div>
            )}
        </div>
    );
}
