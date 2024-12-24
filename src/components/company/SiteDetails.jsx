import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { updateSite } from "../../apis/companyApis";
// import { HiOutlineBolt } from "react-icons/hi";
import {
  BsCalendarEvent,
  BsBatteryHalf,
  BsActivity,
  BsArrowLeft,
  BsPencil,
} from "react-icons/bs";

const SiteDetails = ({ site, onBack, projectName, companyName, projectId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [formData, setFormData] = useState({
    localGovernment: "",
    state: "",
    sector: "",
    capex: 0,
    pvCapacitykWp: 0,
    pvPreferredBrand: "",
    batteryPreferredBrand: "",
    batteryCapacity24MonthsKWh: 0,
    inverterBrand: "",
    numberOfMeters: 0,
    meterBrand: "",
    cableSupplierOrOEM: "",
    cable16mmService: 0,
    cable25mmHouseWiring: 0,
    cable70mmAAC: 0,
    cable50mmAAC: 0,
    cable16mmRecline: 0,
    cable100mmAAC: 0,
    cable90mmAAC: 0,
    cable35mmBattery: 0,
    cable10mmSolar: 0,
    cable6mmSolar: 0,
    cable120mmACC: 0,
    months: 0,
  });

  useEffect(() => {
    if (site) {
      setFormData(site);
    }
  }, [site]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };
      const hasAnyChanges = Object.keys(newData).some(
        (key) => newData[key] !== site[key],
      );
      setHasChanges(hasAnyChanges);
      return newData;
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    setHasChanges(false);
    try {
      const updatedSite = {
        ...formData,
        projectId: projectId,
      };
      console.log(updatedSite, "updated site");
      await updateSite(site.id, updatedSite);
      toast.success("Site updated successfully");
      onBack();
    } catch (error) {
      toast.error(error.message || "Failed to update site");
      console.error("Error updating site:", error);
    }
  };

  const handleCancel = () => {
    setFormData(site);
    setIsEditing(false);
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Header with Back Button and Edit/Update */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3 shadow-sm">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <BsArrowLeft className="mr-2 h-5 w-5" />
          Back to Sites
        </button>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="rounded border px-4 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={!hasChanges}
                className={`rounded px-4 py-2 text-white ${
                  hasChanges
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "cursor-not-allowed bg-gray-400"
                }`}
              >
                Update
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 rounded border px-4 py-2 hover:bg-gray-100"
            >
              <BsPencil className="h-4 w-4" />
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-4 md:p-6">
        {/* Key Metrics Section */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Company and Project Info */}
          <div className="flex flex-col gap-4">
            <div className="rounded border bg-white p-4 shadow-sm">
              <span className="font-bold">Client:</span>{" "}
              <span>{companyName}</span>
            </div>
            <div className="rounded border bg-white p-4 shadow-sm">
              <span className="font-bold">Project:</span>{" "}
              <span>{projectName}</span>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded border bg-white p-4 shadow-sm">
              <div>
                <div className="text-sm text-gray-500">PV Capacity</div>
                <div className="text-xl font-bold">
                  {formData.pvCapacitykWp} kWp
                </div>
              </div>
              {/* <HiOutlineBolt className="h-8 w-8 text-yellow-500" /> */}
            </div>
            <div className="flex items-center justify-between rounded border bg-white p-4 shadow-sm">
              <div>
                <div className="text-sm text-gray-500">Duration</div>
                <div className="text-xl font-bold">
                  {formData.months} Months
                </div>
              </div>
              <BsCalendarEvent className="h-8 w-8 text-blue-500" />
            </div>
            <div className="flex items-center justify-between rounded border bg-white p-4 shadow-sm">
              <div>
                <div className="text-sm text-gray-500">Battery Capacity</div>
                <div className="text-xl font-bold">
                  {formData.batteryCapacity24MonthsKWh} kWh
                </div>
              </div>
              <BsBatteryHalf className="h-8 w-8 text-green-500" />
            </div>
            <div className="flex items-center justify-between rounded border bg-white p-4 shadow-sm">
              <div>
                <div className="text-sm text-gray-500">Status</div>
                <div className="text-xl font-bold">Active</div>
              </div>
              <BsActivity className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold">Site Details</h2>
          <form onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Column 1 */}
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Local Government
                  </label>
                  <input
                    type="text"
                    name="localGovernment"
                    value={formData.localGovernment}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Sector
                  </label>
                  <input
                    type="text"
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Capex
                  </label>
                  <input
                    type="text"
                    name="capex"
                    value={formData.capex}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    PV Capacity (kWp)
                  </label>
                  <input
                    type="text"
                    name="pvCapacitykWp"
                    value={formData.pvCapacitykWp}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    PV Preferred Brand
                  </label>
                  <input
                    type="text"
                    name="pvPreferredBrand"
                    value={formData.pvPreferredBrand}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Battery Preferred Brand
                  </label>
                  <input
                    type="text"
                    name="batteryPreferredBrand"
                    value={formData.batteryPreferredBrand}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Battery Capacity (kWh)
                  </label>
                  <input
                    type="text"
                    name="batteryCapacity24MonthsKWh"
                    value={formData.batteryCapacity24MonthsKWh}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Inverter Brand
                  </label>
                  <input
                    type="text"
                    name="inverterBrand"
                    value={formData.inverterBrand}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Number of Meters
                  </label>
                  <input
                    type="text"
                    name="numberOfMeters"
                    value={formData.numberOfMeters}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Meter Brand
                  </label>
                  <input
                    type="text"
                    name="meterBrand"
                    value={formData.meterBrand}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Cable Supplier/OEM
                  </label>
                  <input
                    type="text"
                    name="cableSupplierOrOEM"
                    value={formData.cableSupplierOrOEM}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    16mm Service Cable
                  </label>
                  <input
                    type="text"
                    name="cable16mmService"
                    value={formData.cable16mmService}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    25mm House Wiring
                  </label>
                  <input
                    type="text"
                    name="cable25mmHouseWiring"
                    value={formData.cable25mmHouseWiring}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    70mm AAC
                  </label>
                  <input
                    type="text"
                    name="cable70mmAAC"
                    value={formData.cable70mmAAC}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    50mm AAC
                  </label>
                  <input
                    type="text"
                    name="cable50mmAAC"
                    value={formData.cable50mmAAC}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    16mm Recline
                  </label>
                  <input
                    type="text"
                    name="cable16mmRecline"
                    value={formData.cable16mmRecline}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    100mm AAC
                  </label>
                  <input
                    type="text"
                    name="cable100mmAAC"
                    value={formData.cable100mmAAC}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    90mm AAC
                  </label>
                  <input
                    type="text"
                    name="cable90mmAAC"
                    value={formData.cable90mmAAC}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    35mm Battery
                  </label>
                  <input
                    type="text"
                    name="cable35mmBattery"
                    value={formData.cable35mmBattery}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    10mm Solar
                  </label>
                  <input
                    type="text"
                    name="cable10mmSolar"
                    value={formData.cable10mmSolar}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    6mm Solar
                  </label>
                  <input
                    type="text"
                    name="cable6mmSolar"
                    value={formData.cable6mmSolar}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    120mm ACC
                  </label>
                  <input
                    type="text"
                    name="cable120mmACC"
                    value={formData.cable120mmACC}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Months
                  </label>
                  <input
                    type="text"
                    name="months"
                    value={formData.months}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    className={`w-full rounded border p-2 ${!isEditing ? "bg-gray-50" : ""}`}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

SiteDetails.propTypes = {
  site: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  projectName: PropTypes.string,
  projectId: PropTypes.string,
};

export default SiteDetails;
