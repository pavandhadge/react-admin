import React from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleProduct } from "../api/ApiCollection";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Product = () => {
  const tempEntries: number[] = [1, 2, 3, 4, 5];
  const dataLine = [
    {
      name: "Jan",
      purchased: 4000,
      wishlisted: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      purchased: 3000,
      wishlisted: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      purchased: 2000,
      wishlisted: 9800,
      amt: 2290,
    },
    {
      name: "Apr",
      purchased: 2780,
      wishlisted: 3908,
      amt: 2000,
    },
    {
      name: "May",
      purchased: 1890,
      wishlisted: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      purchased: 2390,
      wishlisted: 3800,
      amt: 2500,
    },
    {
      name: "Jul",
      purchased: 3490,
      wishlisted: 4300,
      amt: 2100,
    },
  ];

  // const [user, setUser] = React.useState();
  const { id } = useParams();
  // const navigate = useNavigate();

  const { isLoading, isError, data, isSuccess } = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchSingleProduct(id || ""),
  });

  React.useEffect(() => {
    if (isLoading) {
      toast.loading("Loading...", { id: "promiseRead" });
    }
    if (isError) {
      toast.error("Error while getting the data!", {
        id: "promiseRead",
      });
    }
    if (isSuccess) {
      toast.success("Read the data successfully!", {
        id: "promiseRead",
      });
    }
  }, [isError, isLoading, isSuccess]);

  return (
    // screen
    <div id="singleProduct" className="w-full p-0 m-0">
      {/* container */}
      <div className="w-full grid xl:grid-cols-2 gap-10 mt-5 xl:mt-0">
        {/* column 1 */}
        <div className="w-full flex flex-col items-start gap-10">
          {/* product block */}
          <div className="w-full flex flex-col items-start gap-5">
            {/* photo block */}
            <div className="w-full flex items-center gap-3">
              <div className="flex items-center gap-3 xl:gap-8 xl:mb-4">
                <div className="">
                  {isLoading ? (
                    <div className="w-24 xl:w-36 h-24 xl:h-36 skeleton dark:bg-neutral"></div>
                  ) : isSuccess ? (
                    <div className="w-24 xl:w-36">
                      <img
                        src={data.img}
                        alt="avatar"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex flex-col items-start gap-1">
                  {isLoading ? (
                    <div className="w-[200px] h-[36px] skeleton dark:bg-neutral"></div>
                  ) : isSuccess ? (
                    <h3 className="font-semibold text-xl xl:text-3xl dark:text-white">
                      {data.title}
                    </h3>
                  ) : (
                    <div className="w-[200px] h-[36px] skeleton dark:bg-neutral"></div>
                  )}
                  <span className="font-normal text-base">Exclusive</span>
                </div>
              </div>
            </div>
            {/* detail block */}
            <div className="w-full flex gap-8">
              {isLoading ? (
                <div className="w-full xl:w-[50%} h-52 skeleton dark:bg-neutral"></div>
              ) : isSuccess ? (
                <div className="w-full grid grid-cols-3 xl:flex gap-5 xl:gap-8">
                  {/* column 1 */}
                  <div className="col-span-1 flex flex-col items-start gap-3 xl:gap-5">
                    <span>Product ID</span>
                    <span>Color</span>
                    <span>Price</span>
                    <span>Producer</span>
                    <span>Status</span>
                  </div>
                  {/* column 2 */}
                  <div className="col-span-2 flex flex-col items-start gap-3 xl:gap-5">
                    <span className="font-semibold">{data.id}</span>
                    <span className="font-semibold">{data.color}</span>
                    <span className="font-semibold">{data.price}</span>
                    <span className="font-semibold">{data.producer}</span>
                    <span className="font-semibold">
                      {data.inStock ? "In stock" : "Out of stock"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full xl:w-[50%} h-52 skeleton dark:bg-neutral"></div>
              )}
            </div>
          </div>
          {/* divider */}
          <div className="w-full h-[2px] bg-base-300 dark:bg-slate-700"></div>
          {/* chart */}
          {isLoading ? (
            <div className="w-full min-h-[300px] skeleton dark:bg-neutral"></div>
          ) : isSuccess ? (
            <div className="w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataLine}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="purchased" stroke="#8884d8" />
                  <Line type="monotone" dataKey="wishlisted" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="w-full min-h-[300px] skeleton dark:bg-neutral"></div>
          )}
        </div>
        {/* column 2 */}
        <div id="activities" className="w-full flex flex-col items-start gap-5">
          <h2 className="text-2xl font-semibold dark:text-white">
            Latest Activities
          </h2>
          {isLoading &&
            tempEntries.map((index: number) => (
              <div
                className="w-full h-20 skeleton dark:bg-neutral"
                key={index}
              ></div>
            ))}
          {isSuccess && (
            <ul>
              <li>
                <div className="ml-[1px] relative p-4 bg-base-200 dark:bg-neutral dark:text-neutral-50 min-w-[85vw] xl:min-w-[480px] flex flex-col items-start gap-3">
                  <span>Frans AHW purchased {data.title}</span>
                  <span className="text-xs">3 days ago</span>
                </div>
              </li>
              <li>
                <div className="ml-[1px] relative p-4 bg-base-200 dark:bg-neutral dark:text-neutral-50 min-w-[85vw] xl:min-w-[480px] flex flex-col items-start gap-3">
                  <span>Kurt Cobain added {data.title} into wishlist</span>
                  <span className="text-xs">1 week ago</span>
                </div>
              </li>
              <li>
                <div className="ml-[1px] relative p-4 bg-base-200 dark:bg-neutral dark:text-neutral-50 min-w-[85vw] xl:min-w-[480px] flex flex-col items-start gap-3">
                  <span>Mary Jane purchased {data.title}</span>
                  <span className="text-xs">2 weeks ago</span>
                </div>
              </li>
              <li>
                <div className="ml-[1px] relative p-4 bg-base-200 dark:bg-neutral dark:text-neutral-50 min-w-[85vw] xl:min-w-[480px] flex flex-col items-start gap-3">
                  <span>Jose Rose added {data.title} into wishlist</span>
                  <span className="text-xs">3 weeks ago</span>
                </div>
              </li>
              <li>
                <div className="ml-[1px] relative p-4 bg-base-200 dark:bg-neutral dark:text-neutral-50 min-w-[85vw] xl:min-w-[480px] flex flex-col items-start gap-3">
                  <span>James Deane purchased {data.title}</span>
                  <span className="text-xs">1 month ago</span>
                </div>
              </li>
            </ul>
          )}
          {isError &&
            tempEntries.map((index: number) => (
              <div
                className="w-full h-20 skeleton dark:bg-neutral"
                key={index}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
