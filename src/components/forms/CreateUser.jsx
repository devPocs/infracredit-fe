// src/components/forms/CreateUser.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const CreateUser = ({ onClose, onUserAdded }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    role: "User",
    phoneNumber: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://localhost:7140/api/Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      toast.success("User created successfully!");
      onUserAdded();
      onClose();
    } catch (err) {
      toast.error(err.message || "Error creating user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add New User</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={formData.emailAddress}
              onChange={(e) =>
                setFormData({ ...formData, emailAddress: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              required
            >
              <option value="User">User</option>
              <option value="Company">Company</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-4 py-2 text-gray-600 hover:text-gray-800"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateUser.propTypes = {
  onClose: PropTypes.func.isRequired,
  onUserAdded: PropTypes.func.isRequired,
};

export default CreateUser;
