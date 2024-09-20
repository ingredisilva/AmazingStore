"use client";
import styles from "./page.module.css";
import AllProducts from "./produtos/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AllProducts />
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
