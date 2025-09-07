"use client";

import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Loader2Icon } from "lucide-react";
import axios from "axios";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function DataTableDemo({
  apiUrl,
  headers,
  setData,
  setSeries,
  isChanged = "",
  children,
  sortOrder = { key: "createdAt", direction: "desc" },
}) {
  const [sortConfig, setSortConfig] = useState(sortOrder);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchData, setSearchData] = useState("");
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(totalCount / pageSize);

  const fetchData = async (page, pageSize, key, direction) => {
    setLoading(true);
    const query = searchData
      ? `&_search=${searchData.toLocaleLowerCase()}`
      : "";
    await axios
      .get(
        `${apiUrl}?_sort=${key}&_order=${direction}&_page=${page}&_limit=${pageSize}${query}`
      )
      .then((response) => {
        setData(response.data.data);
        setTotalCount(response.data.totalCount);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    if (apiUrl != "") {
      fetchData(currentPage, pageSize, sortConfig.key, sortConfig.direction);
    }
  }, [searchData, sortConfig, currentPage, pageSize, apiUrl, isChanged]);

  useEffect(() => {
    setSeries({ currentPageNumber: currentPage, currentPageSize: pageSize });
  }, [totalCount, pageSize, currentPage]);

  return (
    <div className="p-4 rounded-2xl border border-gray-200 shadow-sm overflow-hidden bg-white mt-5">
      <div className="flex items-center justify-between mb-4">
        {/* <h2 className="text-lg font-semibold"></h2> */}
        <Input
          type="text"
          placeholder="Search by Name or Email..."
          className="max-w-sm"
          onChange={(e) => setSearchData(e.target.value)}
        />{" "}
      </div>

      <Table className="w-full text-sm">
        <TableHeader className="bg-gray-50 border-b-2">
          <TableRow>
            <TableHead>
              {" "}
              <Button
                variant="ghost"
                className="p-0 h-auto text-left font-medium"
              >
                Sr. No.
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </Button>
            </TableHead>
            {headers.map((header) => (
              <TableHead key={header.key}>
                <Button
                  key={header.key}
                  onClick={() => handleSort(header.key)}
                  variant="ghost"
                  className="p-0 h-auto text-left cursor-pointer font-medium"
                >
                  {header.label}
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </Button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={headers.length + 1}
                className="text-center py-10 text-2xl font-medium"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading && <Loader2Icon className="animate-spin" />}{" "}
                  Loading...
                </span>
              </TableCell>
            </TableRow>
          ) : !loading && totalCount === 0 ? (
            <TableRow>
              <TableCell
                colSpan={headers.length + 1}
                className="text-center py-10 text-2xl font-medium"
              >
                No data found.
              </TableCell>
            </TableRow>
          ) : (
            children
          )}
        </TableBody>
      </Table>
      <div className="bg-gray-50 space-x-2 flex items-center justify-end py-2 px-5">
        <Button
          variant="outline"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
