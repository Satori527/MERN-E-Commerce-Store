import { AiOutlineShopping } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-medium rounded-full py-2 px-10 mr-[18rem] mt-[10rem] text-3xl flex flex-row  items-center justify-center gap-2 hover:bg-pink-700 border border-pink-400" 
            >
              <AiOutlineShopping size={30} />
              Shop
            </Link>
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem] gap-12 gap-y-16">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
