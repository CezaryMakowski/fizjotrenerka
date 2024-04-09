import Image from "next/image";
import styles from "./page.module.css";
import arrow from "@/public/Schedule/arrow-schedule.svg";
import underline from "@/public/Schedule/podkreślenie-schedule.svg";
import send from "@/public/Schedule/Send-icon.svg";

export default function Grafik() {
  let date = new Date();
  let day = date.getDay();
  let dateFrom = new Date(
    date.setDate(date.getDate() - day + (day === 0 ? -6 : 1))
  );
  let dateTo = new Date(dateFrom);
  dateTo = new Date(dateTo.setDate(dateTo.getDate() + 6));
  let displayDate = `${dateFrom.toLocaleDateString()} - ${dateTo.toLocaleDateString()}`;

  return (
    <main
      style={{ paddingTop: "10rem", paddingBottom: "5rem", overflow: "hidden" }}
    >
      <h1 className={styles.title}>Grafik</h1>
      <div className={styles.calendarContainer}>
        <div className={styles.calendar}>
          <div className={styles.controls}>
            <Image
              className={styles.arrowLeft}
              src={arrow}
              alt="strzałka grafik FizjoTrenerka"
            />
            <span>{displayDate}</span>
            <Image
              className={styles.arrowRight}
              src={arrow}
              alt="strzałka grafik FizjoTrenerka"
            />
          </div>
          <div className={styles.daysWrapper}>
            <span>pon.</span>
            <span>wt.</span>
            <span>śr.</span>
            <span>czw.</span>
            <span>pt.</span>
            <span>sob.</span>
            <span>nd.</span>
          </div>
          <div className={styles.scheduleWrapper}>
            <div className={styles.scheduleColumn}>
              <div>
                <p>11:00-12:00</p>
                <p>termin niedostępny</p>
              </div>
              <div>
                <p>11:00-12:00</p>
                <p>termin niedostępny</p>
              </div>
              <div>
                <p>11:00-12:00</p>
                <p>termin niedostępny</p>
              </div>
            </div>
            <div className={styles.scheduleColumn}>
              <div>
                <p>11:00-12:00</p>
                <p>termin niedostępny</p>
              </div>
            </div>
            <div className={styles.scheduleColumn}>
              <div>
                <p>11:00-12:00</p>
                <p>termin niedostępny</p>
              </div>
              <div>
                <p>11:00-12:00</p>
                <p>termin niedostępny</p>
              </div>
            </div>
            <div className={styles.scheduleColumn}></div>
            <div className={styles.scheduleColumn}>
              <div>
                <p>11:00-12:00</p>
                <p>termin niedostępny</p>
              </div>
              <div>
                <p>11:00-12:00</p>
                <p>termin niedostępny</p>
              </div>
            </div>
            <div className={styles.scheduleColumn}></div>
            <div className={styles.scheduleColumn}>
              <div>
                <p>11:00-12:00</p>
                <p>termin niedostępny</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.messageWrapper}>
        <div className={styles.messageText}>
          <Image
            src={underline}
            alt="podkreślenie tekstu grafiku fizjotrenerka"
          />
          <p>Zaproponuj własny termin:</p>
        </div>
        <input type="datetime-local" />
        <div className={styles.messageSend}>
          <Image src={send} alt="ikona wysłania prpozycji terminu" />
          <button>Wyślij</button>
        </div>
      </div>
    </main>
  );
}
