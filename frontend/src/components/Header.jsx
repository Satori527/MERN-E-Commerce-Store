import ProductCarousel from "../pages/Products/ProductCarousel";
import SmallProduct from "../pages/Products/SmallProduct";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
      <div className=" flex xl:flex-row lg:flex-col md:flex-col justify-evenly gap-4 px-16 pl-20">
        
        <div className="carousel flex flex-col  p-4 px-16 pb-24 pt-8 gap-12 border border-gray-600 rounded-lg justify-between"
          
        >

          <h1 className="text-5xl font-medium">Top Products</h1>
          <div className="grid grid-cols-2">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
  );
};

export default Header;
