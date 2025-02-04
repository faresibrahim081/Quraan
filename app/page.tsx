import Layout from "./components/Layout/Layout";
import Sowar from "./Sowar/page";
import Tafseir from "./Taseir/Tafseir";
import Video from "./Video/Video";

export default function Home() {
  return (
    <>
      <Layout />
      <Sowar />
      <Video />
      <Tafseir />
    </>
  );
}
