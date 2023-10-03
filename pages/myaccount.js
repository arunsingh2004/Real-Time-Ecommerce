import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const MyAccount = () => {
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (!localStorage.getItem("token")) {
        router.push("/");
      }
    };
  }, []);

  return (
    <>
      <h1>MyAccount</h1>
    </>
  );
};

export default MyAccount;
