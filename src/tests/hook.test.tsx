import { useCopyToClipboard, useDebounce, useResponsive, useSyncToURL, useSyncUrlWithTab, useToggle } from "@app/hooks";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

const baseUrl = import.meta.env.VITE_BASE_URL as string;

describe("Hook test", async () => {
  it("useToggle cập nhật giá trị toggle", () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);
  });

  it("nên cập nhật trạng thái tab và URL khi handleChangeTab được gọi", () => {
    const initialTab = "tab";
    const paramName = "test";

    const wrapper = ({ children }: any) => <BrowserRouter>{children}</BrowserRouter>;

    const { result } = renderHook(() => useSyncUrlWithTab(initialTab, paramName), {
      wrapper,
    });

    expect(result.current.tabFiltered).toBe(initialTab);

    act(() => {
      result.current.handleChangeTab("newTab");
    });

    // Verify updated state
    expect(result.current.tabFiltered).toBe("newTab");

    const queryParams = new URLSearchParams(window.location.search);
    expect(queryParams.get(paramName)).toBe("newTab");
  });

  it("nên trả về các giá trị đúng cho các truy vấn phương tiện khác nhau", () => {
    const { result } = renderHook(() => useResponsive());

    expect(result.current.isMobile).toEqual(expect.any(Boolean));
    expect(result.current.isTablet).toEqual(expect.any(Boolean));
    expect(result.current.isSmallDesktop).toEqual(expect.any(Boolean));
    expect(result.current.isDesktop).toEqual(expect.any(Boolean));
    expect(result.current.isBigScreen).toEqual(expect.any(Boolean));
    expect(result.current.mobileOnly).toEqual(expect.any(Boolean));
    expect(result.current.tabletOnly).toEqual(expect.any(Boolean));
    expect(result.current.desktopOnly).toEqual(expect.any(Boolean));
  });

  // it("should copy text to clipboard and update copiedText state", async () => {
  //   const { result } = renderHook(() => useCopyToClipboard());

  //   const textToCopy = "Hello, testing!";

  //   await act(async () => {
  //     const success = await result.current[1](textToCopy);
  //     expect(success).toBe(true);

  //     // Wait for the next update
  //     await waitFor(() => {
  //       expect(result.current[0]).toBe(textToCopy);
  //     });
  //   });
  // });

  it("should handle clipboard not supported case", async () => {
    // Mocking navigator.clipboard to simulate clipboard not supported
    Object.defineProperty(navigator, "clipboard", {
      value: undefined,
      writable: true,
    });

    const { result } = renderHook(() => useCopyToClipboard());

    const textToCopy = "Hello, testing!";

    await act(async () => {
      const success = await result.current[1](textToCopy);
      expect(success).toBe(false);
      expect(result.current[0]).toBe(null);
    });
  });

  it("should sync parameters to URL", () => {
    const wrapper = ({ children }: any) => (
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useSyncToURL(), { wrapper });

    // Call the hook with parameters
    act(() => {
      result.current({ test: "newTab" });
    });

    // Get the current URL
    const currentURL = window.location.href;

    // Assert that the URL has been updated correctly
    expect(currentURL).toEqual(`${baseUrl}/?test=newTab`);
  });

  it("should debounce the value", async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: "initial", delay: 100 },
    });

    expect(result.current).toBe("initial");

    act(() => {
      rerender({ value: "updated", delay: 100 });
    });

    await waitFor(() => {
      expect(result.current).toBe("updated");
    });
  });
});
