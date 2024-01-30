import { useEffect } from "react";
import dynamic from "next/dynamic.js";

const WasmExample = dynamic(
  {
    loader: async () => {
      const wasm = await import("../../wasm-example/pkg");
      const { greet } = wasm;

      return () => {
        useEffect(() => {
          void wasm.default();
        }, []);

        return (
          <div className="flex min-h-screen flex-col items-center justify-center">
            <button
              type="button"
              className={buttonStyle}
              onClick={() => greet("WebAssembly")}
            >
              THIS IS WASM!
            </button>
          </div>
        );
      };
    },
  },
  { ssr: false },
);

const buttonStyle = `
  py-2.5 px-5
  me-2 mb-2
  text-sm font-medium text-gray-900
  focus:outline-none
  bg-white
  rounded-lg
  border border-gray-200
  hover:bg-gray-100 hover:text-blue-700
  focus:z-10 focus:ring-4 focus:ring-gray-200
`;

export default function Wasm() {
  return <WasmExample />;
}
