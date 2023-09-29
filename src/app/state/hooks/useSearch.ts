import { useInfiniteQuery, UseInfiniteQueryOptions } from "react-query";
import { Proyecto } from "../../../types";
import { axiosInstance } from "../../../infrastructure/axiosInstance";
import { useMemo } from "react";

type FetchSearchResponse = {
  hasMore: any;
  projects: Proyecto[];
};

const fetchSearch = async ({
  pageParam = 1,
  limit = 30,
  orderBy = "desc",
  searchCriteria,
}: {
  pageParam?: number;
  limit?: number;
  orderBy?: "asc" | "desc";
  searchCriteria: {} | undefined;
}) => {
  const queryParams: { [key: string]: any } = {
    page: pageParam,
    limit: limit,
    orderby: orderBy,
  };
  const response = await axiosInstance.post(
    `/projects/search`,
    searchCriteria,
    {
      params: queryParams,
    }
  );
  const responseData = response.data as FetchSearchResponse;

  return responseData;
};

const useSearch = (
  orderBy: "asc" | "desc" = "desc",
  searchCriteria: {} | undefined,
  options?: UseInfiniteQueryOptions
) => {
  const serializedSearchCriteria = JSON.stringify(searchCriteria);

  const queryKey = useMemo(() => {
    return ["search", orderBy, serializedSearchCriteria];
  }, [orderBy, serializedSearchCriteria]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error: rawError,
  } = useInfiniteQuery<FetchSearchResponse, Error>(
    queryKey,
    ({ pageParam }) =>
      fetchSearch({
        pageParam,
        limit: 30,
        orderBy,
        searchCriteria,
      }),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.hasMore ? pages.length + 1 : undefined;
      },
      keepPreviousData: true,
    }
  );

  const filteredProjects = useMemo(() => {
    return data?.pages.flatMap((page) => page.projects) || [];
  }, [data]);

  return {
    projects: filteredProjects,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoading || isFetchingNextPage,
    error: rawError ? (rawError as Error).message : null,
  };
};

export default useSearch;
