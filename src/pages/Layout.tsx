import {Outlet} from "react-router-dom";
import styles from './Layout.module.scss'

export const Layout = () => {
  return (
    <div  className={styles.wrapper}>
      <header className={styles.header}>

        HEDER
      </header>

      <main className={styles.content}>
        <Outlet/>
      </main>

      <footer className={styles.footer}>

        /FOOTER
      </footer>

    </div>
  )
}