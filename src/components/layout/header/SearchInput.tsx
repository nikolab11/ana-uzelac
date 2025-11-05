"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { XIcon } from "@/components/icons/XIcon";

interface Props {
  placeholder: string;
}

export function SearchInput(props: Props) {
  const [value, setValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // Read initial search value from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const searchValue = searchParams.get("search") || "";
      setValue(searchValue);
    }
  }, []);

  // Update query params when typing (only if on shop page)
  useEffect(() => {
    // Only update if we're on shop page
    if (pathname !== "/shop") {
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);

    // Update or remove search parameter
    if (value.trim()) {
      searchParams.set("search", value);
    } else {
      searchParams.delete("search");
    }

    const newQuery = searchParams.toString();
    const newUrl = newQuery ? `/shop?${newQuery}` : "/shop";

    router.replace(newUrl as any);
  }, [value, pathname, router]);

  const handleClear = () => {
    setValue("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) {
          // Navigate to shop page only on Enter
          router.push(`/shop?search=${encodeURIComponent(value)}` as any);
        }
      }}
      className={
        "border-b-[var(--foreground)] border-b pb-1 flex gap-1 items-center relative"
      }
    >
      <input
        name="search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={
          "placeholder:text-[var(--foreground)] focus:outline-none focus:ring-0 flex-1 pr-6"
        }
        placeholder={props.placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-0 cursor-pointer p-1 hover:opacity-70 transition-opacity"
          aria-label="Clear search"
        >
          <XIcon size={2.5} />
        </button>
      )}
    </form>
  );
}
