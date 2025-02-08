import { useState } from "react";
import {
  useCreateCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const CategoryList = () => {
  const { data: categories, isLoading, error } = useFetchCategoriesQuery(); // Added loading and error states
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateName, setUpdateName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category Name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is Created`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating Category Failed, try Again");
    }
  };

  // Loading and Error handling
  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <div className=" ml-16 h-12">Manage Categories</div>

        {/* Form to create category */}
        <form onSubmit={handleCreateCategory}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Category Name"
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            Create Category
          </button>
        </form>

        <br />
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdateName(category.name);
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalVisible && selectedCategory && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update Category</h3>
            <input
              type="text"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
            />
            <button
              onClick={() => {
                /* Handle category update */
              }}
            >
              Update Category
            </button>
            <button onClick={() => setModalVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
