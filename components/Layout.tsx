import React from "react";
import Head from 'next/head'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'

const Layout = (props: any) => <div>
<Header />
<Head>
  <title>Kei Library</title>
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css" />
</Head>

<div className="container">
<main className={styles.main}>
  {props.children}
  </main>

      <footer className={styles.footer}>
        2021
      </footer>
      </div>
    </div>

export default Layout;