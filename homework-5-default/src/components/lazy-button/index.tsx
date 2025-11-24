"use client";

import { useState } from "react";
import type { ReactNode } from "react";

export const LazyButton = ({ children, text, activeText }: { children: ReactNode, activeText: string, text: string }) => {
    const [active, setActive] = useState(false);


    return (
        <div className={'py-6'}>
            <button  onClick={() => setActive(prevState => !prevState)} className="inline-block mb-6 px-4 py-2 bg-white rounded-lg hover:shadow-md hover:text-blue-700 hover:border-blue-700 text-blue-500 border-2 border-blue-500">{active? activeText: text}</button>
            {active &&  <>{children}</> }
        </div>
    );
}