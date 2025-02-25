import { useGetNewProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

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
    autoPlaySpeed: 3000,
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
    <div className="mb-4 xl:block lg:block md:block mx-auto">
      {isLoading ? null : error ? (
        <Message variant="Danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block mx-auto"
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
              <div key={_id} className="flex justify-center p-4">
                <div className="w-full max-w-[45rem] ml-5">
                  <img
                    src={image}
                    alt={name}
                    className="w-full rounded-lg object-cover h-[30rem] shadow-lg"
                  />
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
