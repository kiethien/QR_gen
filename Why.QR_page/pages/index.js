import Head from "next/head";
import Header from "../components/header";
import Herosection1 from "../components/herosection1";
import PosQR from "../components/pos-q-r";
import HeroSection2 from "../components/hero-section2";
import Community from "../components/community";
import styles from "./index.module.css";

const WhyQRPage = () => {
  return (
    <div className={styles.whyQrPage}>
      <Header />
      <Herosection1 />
      <PosQR />
      <div className={styles.hero}>
        <HeroSection2 />
      </div>
      <Community />
    </div>
  );
};

export default WhyQRPage;
