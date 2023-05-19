import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./carousal.scss";
import CarItemViewer from "./carousalItem/CarItemViewer";

export default function Carousal() {
    const items = [
        {
            id: 1,
            image: "https://organic1.storola.net/image/organic1.storola.net/cache/catalog/slider/New/Organic1_1920_550_3-1920x550.png",
        },
        {
            id: 2,
            image: "https://organic1.storola.net/image/organic1.storola.net/cache/catalog/slider/New/Organic1_1920_550_3-1920x550.png",
        },
        {
            id: 3,
            image: "https://organic1.storola.net/image/organic1.storola.net/cache/catalog/slider/New/Organic1_1920_550_3-1920x550.png",
        },
    ];

    SwiperCore.use([Navigation, Pagination, Scrollbar, Autoplay]);
    return (
        <>
            <Swiper
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <CarItemViewer item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
}
