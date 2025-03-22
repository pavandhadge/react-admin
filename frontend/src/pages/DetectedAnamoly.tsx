import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../components/DataTable";
import { fetchdetectedanamoly } from "../api/ApiCollection";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import AddData from "../components/AddData";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const categoryOptions = [
  "All",
  "Electronics",
  "Clothing",
  "Automotive",
  "Food",
];
const regionOptions = [
  "All",
  "North America",
  "Europe",
  "Asia",
  "South America",
];

const DetedtedAnamoly = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: ["fetchdetectedanamoly"],
    queryFn: fetchdetectedanamoly,
  });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
  };

  const filteredData = data?.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      (selectedRegion === "All" || item.region === selectedRegion),
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
            <Select value={selectedCategory} onChange={handleCategoryChange}>
              {categoryOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl className="w-1/2">
            <InputLabel>Region</InputLabel>
            <Select value={selectedRegion} onChange={handleRegionChange}>
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
