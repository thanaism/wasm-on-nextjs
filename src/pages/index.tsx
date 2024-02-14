import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic.js";

const WasmExample = dynamic(
  {
    loader: async () => {
      const wasm = await import("../../wasm-example/pkg");
      const { greet, tokenize } = wasm;

      return () => {
        const defaultInput = "形態要素解析のテストです";
        const [input, setInput] = useState<string>(defaultInput);
        const [results, setResults] = useState<string[]>([]);

        useEffect(() => {
          void wasm.default().then(() => {
            setResults(tokenize(defaultInput));
          });
        }, [defaultInput]);

        return (
          <div className="flex min-h-screen flex-col items-center justify-center">
            <button
              type="button"
              className={buttonStyle}
              onClick={() => greet("WebAssembly")}
            >
              THIS IS WASM!
            </button>
            <input
              className="border-2 border-gray-500"
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setResults(tokenize(e.target.value));
              }}
            />
            {!results.length ? (
              <LoadingDots />
            ) : (
              results.map((r, i) => <p key={i}>{r}</p>)
            )}
          </div>
        );
      };
    },
  },
  { ssr: false, suspense: true },
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

const LoadingDots = () => (
  <div className="mt-4 flex justify-center">
    <div className="h-2 w-2 animate-ping rounded-full bg-blue-600"></div>
    <div className="mx-4 h-2 w-2 animate-ping rounded-full bg-blue-600"></div>
    <div className="h-2 w-2 animate-ping rounded-full bg-blue-600"></div>
  </div>
);

export default function Home() {
  return (
    <Suspense fallback="loading...">
      <WasmExample />
    </Suspense>
  );
}
