import { useGetNewProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaStore } from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetNewProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    prevArrow: (
      <button className="slick-prev text-gray-700">
        <FaArrowLeft />
      </button>
    ),
    nextArrow: (
      <button className="slick-next text-gray-700">
        <FaArrowRight />
      </button>
    ),
  };

  return (
    <div className="w-full mb-8 mx-auto px-4 md:px-12 lg:px-12 xl:px-16">
      {isLoading ? null : error ? (
        <Message variant="Danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="w-full sm:w-full md:w-[36rem] lg:w-full xl:w-[55rem] mx-auto"
        >
          {products.map(({ image, _id, name, price, description, brand }) => (
            <div key={_id} className="flex justify-center p-4">
              <div className="w-full max-w-full md:max-w-[36rem] lg:max-w-full bg-white shadow-md rounded-lg p-4">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-[18rem] md:h-[24rem] object-cover rounded-lg shadow"
                />
                <div className="mt-3 text-center">
                  <h2 className="text-lg font-semibold">{name}</h2>
                  <p className="text-gray-700 text-sm">${price}</p>
                  <p className="text-gray-600 text-sm mt-1">{description}</p>
                </div>
                <div className="flex justify-center mt-3">
                  <h1 className="flex items-center text-gray-800">
                    <FaStore className="mr-2 text-gray-700" /> Brand: {brand}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
