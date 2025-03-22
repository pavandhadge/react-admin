import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../components/DataTable";
import { fetchdetectedanamoly } from "../api/ApiCollection";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AddData from "../components/AddData";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  OutlinedInput,
} from "@mui/material";

const categoryOptions = ["Electronics", "Clothing", "Automotive", "Food"];
const regionOptions = ["North America", "Europe", "Asia", "South America"];

const DetedtedAnamoly = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["fetchdetectedanamoly"],
    queryFn: fetchdetectedanamoly,
  });

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  const handleRegionChange = (event) => {
    setSelectedRegions(event.target.value);
  };

  const filteredData = data?.filter(
    (item) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(item.category)) &&
      (selectedRegions.length === 0 || selectedRegions.includes(item.region)),
  );

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "product", headerName: "Product", minWidth: 200, flex: 1 },
    { field: "region", headerName: "Region", minWidth: 150, flex: 1 },
    { field: "supplier", headerName: "Supplier", minWidth: 200, flex: 1 },
    {
      field: "lead_time",
      headerName: "Lead Time",
      minWidth: 120,
      flex: 1,
      type: "number",
    },
    {
      field: "inventory",
      headerName: "Inventory",
      minWidth: 150,
      flex: 1,
      type: "number",
    },
    {
      field: "demand",
      headerName: "Demand",
      minWidth: 150,
      flex: 1,
      type: "number",
    },
  ];

  React.useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: "promiseProducts" });
    }
    if (isError) {
      toast.error("Error while getting the data!", { id: "promiseProducts" });
    }
    if (isSuccess) {
      toast.success("Got the data successfully!", { id: "promiseProducts" });
    }
  }, [isError, isLoading, isSuccess]);

  return (
    <div className="w-full p-0 m-0">
      <div className="w-full flex flex-col items-stretch gap-3">
        <div className="w-full flex justify-between xl:mb-5">
          <div className="flex gap-1 justify-start flex-col items-start">
            <h2 className="font-bold text-2xl xl:text-4xl mt-0 pt-0 text-base-content dark:text-neutral-200">
              Detected Anamoly
            </h2>
            {data && data.length > 0 && (
              <span className="text-neutral dark:text-neutral-content font-medium text-base">
                {filteredData.length} Anamolies Found
              </span>
            )}
          </div>
        </div>

        <div className="w-full flex gap-4 mb-4">
          <FormControl className="w-1/2">
            <InputLabel>Category</InputLabel>
            <Select
              multiple
              value={selectedCategories}
              onChange={handleCategoryChange}
              input={<OutlinedInput label="Category" />}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-1/2">
            <InputLabel>Region</InputLabel>
            <Select
              multiple
              value={selectedRegions}
              onChange={handleRegionChange}
              input={<OutlinedInput label="Region" />}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {regionOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {isLoading ? (
          <DataTable
            slug="products"
            columns={columns}
            rows={[]}
            includeActionColumn={false}
          />
        ) : isSuccess ? (
          <DataTable
            slug="products"
            columns={columns}
            rows={filteredData}
            includeActionColumn={false}
          />
        ) : (
          <>
            <DataTable
              slug="products"
              columns={columns}
              rows={[]}
              includeActionColumn={false}
            />
            <div className="w-full flex justify-center">
              Error while getting the data!
            </div>
          </>
        )}

        {isOpen && (
          <AddData slug={"product"} isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      </div>
    </div>
  );
};

export default DetedtedAnamoly;
