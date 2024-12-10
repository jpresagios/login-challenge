export function fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout: number = 5000
  ): Promise<Response> {
    const controller = new AbortController();
    const signal = controller.signal;
  
    // Set up a timeout to abort the request after the specified time
    const timeoutId = setTimeout(() => {
      controller.abort(); // Abort the request after timeout
    }, timeout);
  
    const fetchOptions: RequestInit = { ...options, signal };
  
    return fetch(url, fetchOptions)
      .then((response) => {
        clearTimeout(timeoutId); // Clear timeout once the request is completed
        return response;
      })
      .catch((error: Error) => {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          throw new Error('Request timed out');
        }
        throw error; // Handle other errors (network error, etc.)
      });
  }