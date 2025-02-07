import Layout from "./components/Layout/Layout";
import Sowar from "./Sowar/page";
import Tafseir from "./Taseir/page";
import Video from "./Video/page";


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
