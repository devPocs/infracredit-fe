import { useState } from "react";
import PropTypes from "prop-types";
import { stateAndLGA } from "./../../data";
import { useLoading } from "./../../features/loader/hooks/useLoading";
import { useCompany } from "../../features/company/hooks/useCompany";
import { toast } from "react-toastify";
import { updateSite } from "./../../apis/companyApis";

const SiteDetails = ({ site, onBack, projectName, companyName, projectId }) => {
  const { fetchCompanyById } = useCompany();
  const { setIsLoading } = useLoading();
  const [isEditing, setIsEditing] = useState(false);

  const states = stateAndLGA.map((item) => item.state);

  const [formData, setFormData] = useState({
    state: site.state || "",
    localGovernment: site.localGovernment || "",
    sector: site.sector || "",
    capex: site.capex || 0,
    pvCapacitykWp: site.pvCapacitykWp || 0,
    pvPreferredBrand: site.pvPreferredBrand || "",
    batteryPreferredBrand: site.batteryPreferredBrand || "",
    batteryCapacity24MonthsKWh: site.batteryCapacity24MonthsKWh || 0,
    inverterBrand: site.inverterBrand || "",
    numberOfMeters: site.numberOfMeters || 0,
    meterBrand: site.meterBrand || "",
    cableSupplierOrOEM: site.cableSupplierOrOEM || "",
    cable16mmService: site.cable16mmService || 0,
    cable25mmHouseWiring: site.cable25mmHouseWiring || 0,
    cable70mmAAC: site.cable70mmAAC || 0,
    cable50mmAAC: site.cable50mmAAC || 0,
    cable16mmRecline: site.cable16mmRecline || 0,
    cable100mmAAC: site.cable100mmAAC || 0,
    cable90mmAAC: site.cable90mmAAC || 0,
    cable35mmBattery: site.cable35mmBattery || 0,
    cable10mmSolar: site.cable10mmSolar || 0,
    cable6mmSolar: site.cable6mmSolar || 0,
    cable120mmACC: site.cable120mmACC || 0,
    months: site.months || 0,
  });

  const getLGAs = (stateName) => {
    const stateData = stateAndLGA.find((item) => item.state === stateName);
    return stateData ? stateData.lgas : [];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" ? { localGovernment: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(site.id);
    try {
      setIsLoading(true);
      await updateSite(site.id, formData, projectId); // Pass projectId here
      await fetchCompanyById(projectId);
      toast.success("Site updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || "Failed to update site!");
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (label, name, type = "text") => {
    if (type === "select" && name === "state") {
      return (
        <div className="space-y-1">
          <label className="text-sm font-medium">{label}</label>
          {isEditing ? (
            <select
              name={name}
              value={formData[name]}
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
          ) : (
            <div className="p-2">{formData[name]}</div>
          )}
        </div>
      );
    }

    if (type === "select" && name === "localGovernment") {
      return (
        <div className="space-y-1">
          <label className="text-sm font-medium">{label}</label>
          {isEditing ? (
            <select
              name={name}
              value={formData[name]}
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
          ) : (
            <div className="p-2">{formData[name]}</div>
          )}
        </div>
      );
    }

    if (type === "select" && name === "months") {
      return (
        <div className="space-y-1">
          <label className="text-sm font-medium">{label}</label>
          {isEditing ? (
            <select
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full rounded border p-2"
              required
            >
              <option value="">Select Duration</option>
              <option value={12}>12 Months</option>
              <option value={24}>24 Months</option>
              <option value={36}>36 Months</option>
            </select>
          ) : (
            <div className="p-2">{formData[name]} months</div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-1">
        <label className="text-sm font-medium">{label}</label>
        {isEditing ? (
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
        ) : (
          <div className="p-2">{formData[name]}</div>
        )}
      </div>
    );
  };

  return (
    <div className="rounded-lg bg-white p-6">
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded border p-4">
          <span className="font-semibold">Company:</span> {companyName}
        </div>
        <div className="rounded border p-4">
          <span className="font-semibold">Project:</span> {projectName}
        </div>
      </div>

      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold">Site Details</h2>
        {isEditing ? (
          <div className="space-x-2">
            <button
              onClick={() => setIsEditing(false)}
              className="rounded px-4 py-2 text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Edit
          </button>
        )}
      </div>

      <form className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Column 1 */}
        <div className="space-y-4">
          {renderField("State", "state", "select")}
          {renderField("Local Government", "localGovernment", "select")}
          {renderField("Sector", "sector")}
          {renderField("Capex", "capex", "number")}
          {renderField("PV Capacity (kWp)", "pvCapacitykWp", "number")}
          {renderField("PV Preferred Brand", "pvPreferredBrand")}
          {renderField("Battery Preferred Brand", "batteryPreferredBrand")}
          {renderField(
            "Battery Capacity (kWh)",
            "batteryCapacity24MonthsKWh",
            "number",
          )}
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          {renderField("Inverter Brand", "inverterBrand")}
          {renderField("Number of Meters", "numberOfMeters", "number")}
          {renderField("Meter Brand", "meterBrand")}
          {renderField("Cable Supplier/OEM", "cableSupplierOrOEM")}
          {renderField("16mm Service Cable", "cable16mmService", "number")}
          {renderField("25mm House Wiring", "cable25mmHouseWiring", "number")}
          {renderField("70mm AAC", "cable70mmAAC", "number")}
          {renderField("50mm AAC", "cable50mmAAC", "number")}
        </div>

        {/* Column 3 */}
        <div className="space-y-4">
          {renderField("16mm Recline", "cable16mmRecline", "number")}
          {renderField("100mm AAC", "cable100mmAAC", "number")}
          {renderField("90mm AAC", "cable90mmAAC", "number")}
          {renderField("35mm Battery", "cable35mmBattery", "number")}
          {renderField("10mm Solar", "cable10mmSolar", "number")}
          {renderField("6mm Solar", "cable6mmSolar", "number")}
          {renderField("120mm ACC", "cable120mmACC", "number")}
          {renderField("Months", "months", "select")}
        </div>
      </form>

      <div className="mt-6">
        <button
          onClick={onBack}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          Back
        </button>
      </div>
    </div>
  );
};

SiteDetails.propTypes = {
  site: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  projectName: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
};

export default SiteDetails;
