export const getApiErrorMessage = (
    error: any,
    defaultMessage: string = "An unexpected error occurred."
  ): string => {
    return error?.response?.data?.message || error?.message || defaultMessage;
  };
  