"use client";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ExternalLink, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Dapp } from "@/types/dapp";
interface DappTableProps {
  initialDapps: Dapp[];
}

export default function DappTable({ initialDapps }: DappTableProps) {
  const [search, setSearch] = useState("");
  const [dapps] = useState<Dapp[]>(initialDapps);
  const [filteredDapps, setFilteredDapps] = useState<Dapp[]>(
    initialDapps.slice(0, 10)
  );
  const [view, setView] = useState<"table" | "card">("table");
  const [chainFilter, setChainFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { theme, setTheme } = useTheme();

  const pageSize = 10;

  useEffect(() => {
    const lowerSearch = search.toLowerCase().trim();
    let filtered = dapps;

    if (lowerSearch) {
      filtered = dapps.filter(
        (dapp) =>
          dapp.name.toLowerCase().includes(lowerSearch) ||
          dapp.function.toLowerCase().includes(lowerSearch)
      );
    }

    if (chainFilter !== "all") {
      filtered = filtered.filter((dapp) =>
        dapp.chain.toLowerCase().includes(chainFilter.toLowerCase())
      );
    }

    setFilteredDapps(filtered.slice(0, pageSize * page));
    setHasMore(filtered.length > pageSize * page);
  }, [search, chainFilter, dapps, page]);

  function loadMore() {
    setPage((prev) => prev + 1);
  }

  const chains = [
    "all",
    ...new Set(
      dapps.flatMap((dapp) =>
        dapp.chain.split(", ").map((c) => c.toLowerCase())
      )
    ),
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
        <div className="flex gap-2 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Dapps (e.g., aave, lending)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 max-w-md w-full"
              aria-label="Search Dapps"
            />
          </div>
          <Select value={chainFilter} onValueChange={setChainFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Chain" />
            </SelectTrigger>
            <SelectContent>
              {chains.map((chain) => (
                <SelectItem key={chain} value={chain}>
                  {chain.charAt(0).toUpperCase() + chain.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Toggle
            pressed={view === "card"}
            onPressedChange={() => setView(view === "table" ? "card" : "table")}
            aria-label="Toggle view"
          >
            {view === "table" ? "Card View" : "Table View"}
          </Toggle>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <InfiniteScroll
        dataLength={filteredDapps.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<div className="text-center py-4">Loading...</div>}
        endMessage={<div className="text-center py-4">No more Dapps</div>}
      >
        {view === "table" && (
          <div className="rounded-lg border bg-card shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/4">Name</TableHead>
                  <TableHead className="w-1/4">Link</TableHead>
                  <TableHead className="w-1/4">Chain</TableHead>
                  <TableHead className="w-1/4">Function</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDapps.length > 0 ? (
                  filteredDapps.map((dapp, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium">
                        <Link
                          href={`/dapp/${dapp.name
                            .toLowerCase()
                            .replace(/\s/g, "-")}`}
                        >
                          {dapp.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <a
                          href={dapp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-primary hover:underline"
                        >
                          {dapp.link} <ExternalLink className="ml-1 h-4 w-4" />
                        </a>
                      </TableCell>
                      <TableCell>{dapp.chain}</TableCell>
                      <TableCell>{dapp.function}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-muted-foreground"
                    >
                      No Dapps found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {view === "card" && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDapps.length > 0 ? (
              filteredDapps.map((dapp, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      <Link
                        href={`/dapp/${dapp.name
                          .toLowerCase()
                          .replace(/\s/g, "-")}`}
                      >
                        {dapp.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      <strong>Link:</strong>{" "}
                      <a
                        href={dapp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {dapp.link}
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Chain:</strong> {dapp.chain}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Function:</strong> {dapp.function}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground">
                No Dapps found
              </div>
            )}
          </div>
        )}
      </InfiniteScroll>
    </div>
  );
}
