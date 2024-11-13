import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/globe.svg"
          alt="Globe Icon"
          width={180}
          height={38}
          priority
        />
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deploy now
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
          <p>Lots of text here to test font look.</p>
      </footer>
    </div>
  );
}
