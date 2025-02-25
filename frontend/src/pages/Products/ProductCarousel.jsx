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
    autoPlay: true,
    autoPlaySpeed: 1000,
    pauseOnHover: true,
    prevArrow: (
      <button className="slick-prev">
        <FaArrowLeft />
      </button>
    ),
    nextArrow: (
      <button className="slick-next">
        <FaArrowRight />
      </button>
    ),
  };

  return (
    <div className="mb-4 ml-4 xl:block lg:block md:block mx-auto relative">
      {isLoading ? null : error ? (
        <Message variant="Danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[45rem] lg:w-[48rem] md:w-[54rem] sm:w-[36rem] sm:block mx-auto"
        >
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="flex justify-center p-2">
                <div className="w-full max-w-[40rem] ml-5">
                  <img
                    src={image}
                    alt={name}
                    className="w-full rounded-lg object-cover h-[28rem] shadow-lg"
                  />
                  <div className="mt-3">
                    <h2>{name}</h2>
                    <p>${price}</p>
                    <p>{description}</p>
                  </div>
                  <div className="flex justify-between w-[20rem]">
                    <div className="one">
                      <h1 className="flex items-center mb-6">
                        <FaStore className="mr-2 text-white" /> Brand:{brand}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
