import Image from "next/image";
import { Content, Inter } from "next/font/google";
import Contents from "../components/Contents";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="">
        <img src="img1.jpg"></img>
        <Contents />
      </div>
    </>
  );
}
