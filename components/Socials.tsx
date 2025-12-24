"use client"

import { useRef } from "react"

export default function Socials(){
    const socialsRef = useRef(null)

    return <>
        <section
            className="flex flex-center justify-center items-center p-4 my-5"
            data-theme="light"
            id="socials"
            ref={socialsRef}
        >   
            <h1 className="font-bold text-black text-center">Follow us on social media</h1>

        </section>
    </>
}