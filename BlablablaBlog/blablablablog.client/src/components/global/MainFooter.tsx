import styles from './MainFooter.module.css';
function MainFooter() {
    return (
        <div className={styles.footer}> <span>&copy; {(new Date().getFullYear())} BlablablaBlog</span></div >
  );
}

export default MainFooter;