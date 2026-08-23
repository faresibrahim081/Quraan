import Layout from "./components/Layout/Layout";
import Sowar from "./Sowar/page";
import Tafseir from "./Tafseir/page";
import Video from "./Video/page";
import React, { Suspense, lazy } from "react";


export default function Home() {

  const Loading = lazy(() => import("./Loading"));
  return (
    <>
      <Layout />
      <Sowar />
      <Suspense fallback={<Loading />}>
        <Video />
      </Suspense>
      <Tafseir />
    </>
  );
}
