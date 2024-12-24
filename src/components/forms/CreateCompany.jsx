import { useState } from "react";
import PropTypes from "prop-types";
import { useLoading } from "../../features/loader/hooks/useLoading";
import { toast } from "react-toastify";
import { useCompany } from "../../features/company/hooks/useCompany";

const CreateCompanyForm = ({ onClose }) => {
  const { setIsLoading } = useLoading();
  const { addCompany } = useCompany();

  const [formData, setFormData] = useState({
    companyName: "",
    projectName: "",
  });

  const [contactInputs, setContactInputs] = useState({
    primaryContact: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      contactType: 1,
    },
    secondaryContact: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      contactType: 2,
    },
    tertiaryContact: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      contactType: 3,
    },
  });

  const handleInputChange = (e, contactType, field) => {
    setContactInputs((prev) => ({
      ...prev,
      [contactType]: {
        ...prev[contactType],
        [field]: e.target.value,
      },
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const companyContact = Object.values(contactInputs)
        .filter(
          (contact) =>
            contact.firstName || contact.email || contact.phoneNumber,
        )
        .map(({ firstName, lastName, email, phoneNumber, contactType }) => ({
          firstName,
          lastName,
          phoneNumber,
          email,
          contactType,
        }));

      const apiData = {
        companyName: formData.companyName,
        projectName: formData.projectName,
        companyContact,
      };

      await addCompany(apiData);
      toast.success("Company created successfully");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to create company");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50 p-4">
      <div className="relative my-8 w-full max-w-7xl rounded-lg bg-white p-4 shadow-lg sm:p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl text-gray-500 transition-colors hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="mb-4 text-center text-lg font-semibold sm:text-left sm:text-xl">
          Create Company
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Company Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                Project Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                value={formData.projectName}
                onChange={(e) =>
                  setFormData({ ...formData, projectName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Primary Contact */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Primary Contact</h3>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={contactInputs.primaryContact.firstName}
                    onChange={(e) =>
                      handleInputChange(e, "primaryContact", "firstName")
                    }
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={contactInputs.primaryContact.lastName}
                    onChange={(e) =>
                      handleInputChange(e, "primaryContact", "lastName")
                    }
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={contactInputs.primaryContact.email}
                    onChange={(e) =>
                      handleInputChange(e, "primaryContact", "email")
                    }
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={contactInputs.primaryContact.phoneNumber}
                    onChange={(e) =>
                      handleInputChange(e, "primaryContact", "phoneNumber")
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* Secondary Contact */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Secondary Contact</h3>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={contactInputs.secondaryContact.firstName}
                    onChange={(e) =>
                      handleInputChange(e, "secondaryContact", "firstName")
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={contactInputs.secondaryContact.lastName}
                    onChange={(e) =>
                      handleInputChange(e, "secondaryContact", "lastName")
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={contactInputs.secondaryContact.email}
                    onChange={(e) =>
                      handleInputChange(e, "secondaryContact", "email")
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={contactInputs.secondaryContact.phoneNumber}
                    onChange={(e) =>
                      handleInputChange(e, "secondaryContact", "phoneNumber")
                    }
                  />
                </div>
              </div>
            </div>

            {/* Tertiary Contact */}
            <div className="space-y-4">
              <h3 className="text-base font-semibold">Tertiary Contact</h3>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={contactInputs.tertiaryContact.firstName}
                    onChange={(e) =>
                      handleInputChange(e, "tertiaryContact", "firstName")
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={contactInputs.tertiaryContact.lastName}
                    onChange={(e) =>
                      handleInputChange(e, "tertiaryContact", "lastName")
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={contactInputs.tertiaryContact.email}
                    onChange={(e) =>
                      handleInputChange(e, "tertiaryContact", "email")
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={contactInputs.tertiaryContact.phoneNumber}
                    onChange={(e) =>
                      handleInputChange(e, "tertiaryContact", "phoneNumber")
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="rounded-md bg-green-500 px-6 py-2 text-sm text-white transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 sm:px-8 sm:text-base"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

CreateCompanyForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CreateCompanyForm;
