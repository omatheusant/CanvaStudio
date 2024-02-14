"use client";

import Live from "./components/Live";
import NavBar from "./components/NavBar";

export default function Page() {
  return (
    <section className="h-screen overflow-hidden ">
      <NavBar />
      <div className="flex h-full flex-row">
        <Live />
      </div>
    </section>
  );
}
