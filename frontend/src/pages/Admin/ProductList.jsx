import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //  let productData = new FormData();
      // productData.append("image", image);
      // productData.append("name", name);
      // productData.append("description", description);
      // productData.append("price", price);
      // productData.append("category", category);
      // productData.append("quantity", quantity);
      // productData.append("brand", brand);
      // productData.append("countInStock", stock);

      let productData = {
        image,
        name,
        description,
        price,
        category,
        quantity,
        brand,
        countInStock: stock,
      };


      const { data } = await createProduct(productData);


      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border border-pink-200 text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
                style={{ boxShadow: "6px 6px 6px 6px rgba(0, 0, 0, 0.5)" }}
              />
            </label>
          </div>

          <div className="p-3 w-full">
            <div className="flex flex-row flex-wrap w-full">
              <div className="one w-full">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-full border border-pink-200 rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{boxShadow: "4px 4px 12px 4px rgba(0, 0, 0, 0.6)"}}
                />
              </div>
            </div>

            <div className="flex flex-wrap flex-row w-full ">
              <div className="one w-full">
                  <label htmlFor="name block">Brand</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-full border border-pink-200 rounded-lg bg-[#101011] text-white"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    style={{boxShadow: "4px 4px 12px 4px rgba(0, 0, 0, 0.6)"}}
                  />
                </div>
            </div>

            <div className="flex flex-wrap gap-x-20">
              <div className="two ">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[32rem] border border-pink-200 rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{boxShadow: "4px 4px 12px 4px rgba(0, 0, 0, 0.6)"}}
                />
              </div>
              <div className="two">
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[32rem] border border-pink-200 rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  style={{boxShadow: "4px 4px 12px 4px rgba(0, 0, 0, 0.6)"}}
                />
              </div>
            </div>

            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-[#101011] border border-pink-200 rounded-lg w-[100%] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{boxShadow: "4px 4px 12px 4px rgba(0, 0, 0, 0.6)"}}
            ></textarea>

            <div className="flex flex-wrap gap-x-20">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[32rem] border border-pink-200 rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  style={{boxShadow: "4px 4px 12px 4px rgba(0, 0, 0, 0.6)"}}
                />
              </div>

              <div>
                <label htmlFor="">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[32rem] border border-pink-200 rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                  style={{boxShadow: "4px 4px 12px 4px rgba(0, 0, 0, 0.6)"}}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button 

              onClick={handleSubmit}
              className="button py-4 px-10 mt-5 rounded-lg text-lg font-bold"
              
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
