import type { NextPage } from "next";
import React, { useState, useCallback, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Content from "../UI/common/Content";
import Footer from "../UI/common/Footer";
import Header from "../UI/common/Header";
import SectionBox from "../UI/common/SectionBox";
import WarningBox from "../UI/common/WarningBox";
import PageTitle from "./../UI/common/PageTitle";
import { getStrings } from "../logics/services/services.api";
import Loading from "./../UI/common/Loading";
import { PageStrings } from "../interface/interface";
import SequencingTable from "../Modules/SequencingTable/index";
import Head from "next/head";
const Home: NextPage = () => {
  const [strings, setStrings] = useState<PageStrings>();

  useEffect(() => {
    getPageStrings().then((strings: PageStrings) => {
      setStrings(strings);
    });
  }, []);
  const getPageStrings = useCallback(async () => {
    const strings = await getStrings();
    return strings[0];
  }, []);
  const nextPageHandler = (sessions: any[], totalPrice: number) => {
    console.log(sessions, totalPrice);
  };

  if (!strings) return <Loading />;

  return (
    <div className={styles.mainBg}>
      <Head>
        <title>{strings.title}</title>
        <meta name="description" content={strings.metaDescription} />
      </Head>
      <Header />
      <Content>
        <PageTitle title1={strings.pageHeaderTitle} title2={strings.subtitle} />
        <WarningBox text={strings.warningText} />
        <SectionBox
          active={1}
          stepOneTitle={strings.stepOneTitle}
          stepTwoTitle={strings.stepTwoTitle}
        />
        <SequencingTable
          onNextPage={nextPageHandler}
          firstScheduleCta={strings.firstScheduleCta}
        />
      </Content>
      <Footer />
    </div>
  );
};

export default Home;
