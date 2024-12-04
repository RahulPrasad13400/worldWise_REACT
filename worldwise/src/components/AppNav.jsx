import styles from './AppNav.module.css'
import PageNav from './PageNav'
export default function AppNav() {
  return (
    <nav className={styles.nav}>
      <PageNav />
      APP NAVIGATION
    </nav>
  )
}
