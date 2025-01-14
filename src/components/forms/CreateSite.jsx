import { useState } from "react";
import PropTypes from "prop-types";
import { stateAndLGA } from "./../../data";
import { useLoading } from "./../../features/loader/hooks/useLoading";
import { useNavigate } from "react-router-dom";
import { useCompany } from "../../features/company/hooks/useCompany";
import { toast } from "react-toastify";

const CreateSite = ({
  onClose,
  projectCode,
  companyId,
  companyName,
  projectName,
}) => {
  const { addSite, fetchCompanyById } = useCompany();
  const { setIsLoading } = useLoading();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    state: "",
    localGovernment: "",
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

  const states = stateAndLGA.map((item) => item.state);

  // Get LGAs for selected state
  const getLGAs = (stateName) => {
    const stateData = stateAndLGA.find((item) => item.state === stateName);
    return stateData ? stateData.lgas : [];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset LGA if state changes
      ...(name === "state" ? { localGovernment: "" } : {}),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await addSite(projectCode, formData);
      await fetchCompanyById(companyId);
      toast.success("Site added successfully!");
      navigate(`/company/${companyId}`);
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to add site!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-h-[90vh] w-[90%] max-w-6xl overflow-y-auto rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Create New Site</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded border p-4">
            <span className="font-semibold">Company:</span> {companyName}
          </div>
          <div className="rounded border p-4">
            <span className="font-semibold">Project:</span> {projectName}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Column 1 */}
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  required
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Local Government
                </label>
                <select
                  name="localGovernment"
                  value={formData.localGovernment}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  disabled={!formData.state}
                  required
                >
                  <option value="">Select LGA</option>
                  {formData.state &&
                    getLGAs(formData.state).map((lga) => (
                      <option key={lga} value={lga}>
                        {lga}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">Sector</label>
                <input
                  type="text"
                  name="sector"
                  value={formData.sector}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Capex</label>
                <input
                  type="text"
                  name="capex"
                  value={formData.capex}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
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
                  className="w-full rounded border p-2"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Months</label>
                <select
                  name="months"
                  value={formData.months}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  required
                >
                  <option value="">Select Duration</option>
                  <option value={12}>12 Months</option>
                  <option value={24}>24 Months</option>
                  <option value={36}>36 Months</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded border px-4 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Create Site
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateSite.propTypes = {
  onClose: PropTypes.func.isRequired,
  projectCode: PropTypes.string,
  companyId: PropTypes.number,
  projectName: PropTypes.string,
  companyName: PropTypes.string,
};

export default CreateSite;
