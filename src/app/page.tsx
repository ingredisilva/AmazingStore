"use client";
import styles from "./page.module.css";
import SideStore from "./produtos/page";

export default function Home() {
  return (

    <div className={styles.page}>
      <main className={styles.main}>
        <SideStore />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
