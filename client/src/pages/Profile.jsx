import { useSelector, useDispatch } from "react-redux";
import { User, Mail, ShoppingCart, Package, Edit2, Camera } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { setUser } from "../app/slices/authSlice";

const Profile = () => {
  const user = useSelector(state => state.auth.user);
  const cart = useSelector(state => state.cart.cart); 
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || ""
  });
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const imageUrl = user?.image 
    ? `${import.meta.env.VITE_SERVER_URL}${user.image}` 
    : "https://i.pravatar.cc/150";

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);

      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("email", formData.email);
      if (newImage) {
        dataToSend.append("image", newImage);
      }

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/update-profile`, {
        method: "PUT",
        body: dataToSend,
        credentials: "include"
      });

      const data = await res.json();

      if (data.success) {
        dispatch(setUser(data.user));
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        setNewImage(null);
        setPreviewImage(null);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || "",
      email: user?.email || ""
    });
    setNewImage(null);
    setPreviewImage(null);
  };

  return (
    <div className="min-h-screen pt-32 pb-10 flex justify-center items-center px-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 w-full max-w-md">
        
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={previewImage || imageUrl}
              alt={user?.name || "Profile"}
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 shadow-lg"
              onError={(e) => {
                e.target.src = "https://i.pravatar.cc/150";
              }}
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-purple-500 w-10 h-10 rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:bg-purple-600 transition-colors">
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
            {!isEditing && (
              <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
            )}
          </div>
        </div>

        {/* User Info / Edit Form */}
        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Save"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-2 bg-gray-500 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2">{user?.name}</h2>
            <p className="text-gray-400 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              {user?.email}
            </p>
          </div>
        )}

        {/* Stats - Real-time data */}
        {!isEditing && (
          <>
            <div className="border-t border-white/20 pt-6">
              <div className="flex justify-around">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-500 flex items-center justify-center gap-1">
                    <ShoppingCart className="w-6 h-6" />
                    {cart?.length || 0}
                  </p>
                  <p className="text-sm text-gray-400">Cart Items</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-500 flex items-center justify-center gap-1">
                    <Package className="w-6 h-6" />
                    0
                  </p>
                  <p className="text-sm text-gray-400">Orders</p>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="w-full mt-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Edit2 className="w-5 h-5" />
              Edit Profile
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default Profile;