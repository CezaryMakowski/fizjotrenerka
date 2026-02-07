import ActiveLink from "./ActiveLink";
import styles from "./NavLinks.module.css";

export default function NavLinks({
  setSidebarVisible,
}: {
  setSidebarVisible?: (visible: boolean) => void;
}) {
  return (
    <>
      <div
        onClick={() => setSidebarVisible && setSidebarVisible(false)}
        className={styles.listItem}
      >
        <ActiveLink href="/" activeClassName={styles.active}>
          <svg
            className={`${styles.svg} ${styles.right}`}
            viewBox="0 0 113 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112.976 27.2619L110.548 24.5086C106.643 19.9229 101.169 16.5845 94.8282 14.8004C85.5671 12.2489 80.0336 12.1629 55.1038 14.0833C30.3335 15.994 13.3416 10.7479 1 1.5" />
          </svg>
          <svg
            className={`${styles.svg} ${styles.left}`}
            viewBox="0 0 113 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112.976 27.2619L110.548 24.5086C106.643 19.9229 101.169 16.5845 94.8282 14.8004C85.5671 12.2489 80.0336 12.1629 55.1038 14.0833C30.3335 15.994 13.3416 10.7479 1 1.5" />
          </svg>
          <span>Główna</span>
        </ActiveLink>
      </div>
      <div
        onClick={() => setSidebarVisible && setSidebarVisible(false)}
        className={styles.listItem}
      >
        <ActiveLink href="/o-mnie" activeClassName={styles.active}>
          <svg
            className={`${styles.svg} ${styles.right}`}
            viewBox="0 0 113 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112.976 27.2619L110.548 24.5086C106.643 19.9229 101.169 16.5845 94.8282 14.8004C85.5671 12.2489 80.0336 12.1629 55.1038 14.0833C30.3335 15.994 13.3416 10.7479 1 1.5" />
          </svg>
          <svg
            className={`${styles.svg} ${styles.left}`}
            viewBox="0 0 113 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112.976 27.2619L110.548 24.5086C106.643 19.9229 101.169 16.5845 94.8282 14.8004C85.5671 12.2489 80.0336 12.1629 55.1038 14.0833C30.3335 15.994 13.3416 10.7479 1 1.5" />
          </svg>
          <span>O Mnie</span>
        </ActiveLink>
      </div>
      {/* <div className={styles.listItem}>
        <ActiveLink href="/grafik" activeClassName={styles.active}>
          <svg
            className={`${styles.svg} ${styles.right}`}
            viewBox="0 0 113 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112.976 27.2619L110.548 24.5086C106.643 19.9229 101.169 16.5845 94.8282 14.8004C85.5671 12.2489 80.0336 12.1629 55.1038 14.0833C30.3335 15.994 13.3416 10.7479 1 1.5" />
          </svg>
          <svg
            className={`${styles.svg} ${styles.left}`}
            viewBox="0 0 113 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112.976 27.2619L110.548 24.5086C106.643 19.9229 101.169 16.5845 94.8282 14.8004C85.5671 12.2489 80.0336 12.1629 55.1038 14.0833C30.3335 15.994 13.3416 10.7479 1 1.5" />
          </svg>
          <span>Grafik</span>
        </ActiveLink>
      </div> */}
      <div
        onClick={() => setSidebarVisible && setSidebarVisible(false)}
        className={styles.listItem}
      >
        <ActiveLink href="/cennik" activeClassName={styles.active}>
          <svg
            className={`${styles.svg} ${styles.right}`}
            viewBox="0 0 113 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112.976 27.2619L110.548 24.5086C106.643 19.9229 101.169 16.5845 94.8282 14.8004C85.5671 12.2489 80.0336 12.1629 55.1038 14.0833C30.3335 15.994 13.3416 10.7479 1 1.5" />
          </svg>
          <svg
            className={`${styles.svg} ${styles.left}`}
            viewBox="0 0 113 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112.976 27.2619L110.548 24.5086C106.643 19.9229 101.169 16.5845 94.8282 14.8004C85.5671 12.2489 80.0336 12.1629 55.1038 14.0833C30.3335 15.994 13.3416 10.7479 1 1.5" />
          </svg>
          <span>Cennik</span>
        </ActiveLink>
      </div>
      <div
        onClick={() => setSidebarVisible && setSidebarVisible(false)}
        className={styles.listItem}
      >
        <ActiveLink href="/sklep" activeClassName={styles.active}>
          <svg
            className={`${styles.svg} ${styles.right}`}
            viewBox="0 0 113 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112.976 27.2619L110.548 24.5086C106.643 19.9229 101.169 16.5845 94.8282 14.8004C85.5671 12.2489 80.0336 12.1629 55.1038 14.0833C30.3335 15.994 13.3416 10.7479 1 1.5" />
          </svg>
          <svg
            className={`${styles.svg} ${styles.left}`}
            viewBox="0 0 113 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112.976 27.2619L110.548 24.5086C106.643 19.9229 101.169 16.5845 94.8282 14.8004C85.5671 12.2489 80.0336 12.1629 55.1038 14.0833C30.3335 15.994 13.3416 10.7479 1 1.5" />
          </svg>
          <span>Sklep</span>
        </ActiveLink>
      </div>
      <div
        onClick={() => setSidebarVisible && setSidebarVisible(false)}
        className={styles.listItem}
      >
        <ActiveLink href="/blog" activeClassName={styles.active}>
          <svg
            className={`${styles.svg} ${styles.right}`}
            viewBox="0 0 113 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112.976 27.2619L110.548 24.5086C106.643 19.9229 101.169 16.5845 94.8282 14.8004C85.5671 12.2489 80.0336 12.1629 55.1038 14.0833C30.3335 15.994 13.3416 10.7479 1 1.5" />
          </svg>
          <svg
            className={`${styles.svg} ${styles.left}`}
            viewBox="0 0 113 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112.976 27.2619L110.548 24.5086C106.643 19.9229 101.169 16.5845 94.8282 14.8004C85.5671 12.2489 80.0336 12.1629 55.1038 14.0833C30.3335 15.994 13.3416 10.7479 1 1.5" />
          </svg>
          <span>Blog</span>
        </ActiveLink>
      </div>
      <div
        onClick={() => setSidebarVisible && setSidebarVisible(false)}
        className={styles.listItem}
      >
        <ActiveLink href="/kontakt" activeClassName={styles.active}>
          <svg
            className={`${styles.svg} ${styles.right}`}
            viewBox="0 0 113 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112.976 27.2619L110.548 24.5086C106.643 19.9229 101.169 16.5845 94.8282 14.8004C85.5671 12.2489 80.0336 12.1629 55.1038 14.0833C30.3335 15.994 13.3416 10.7479 1 1.5" />
          </svg>
          <svg
            className={`${styles.svg} ${styles.left}`}
            viewBox="0 0 113 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112.976 27.2619L110.548 24.5086C106.643 19.9229 101.169 16.5845 94.8282 14.8004C85.5671 12.2489 80.0336 12.1629 55.1038 14.0833C30.3335 15.994 13.3416 10.7479 1 1.5" />
          </svg>
          <span>Kontakt</span>
        </ActiveLink>
      </div>
    </>
  );
}
