import styles from './css/MainFooter.module.css';
function MainFooter() {
    return (
        <div className={styles.footer}> <span>BlablablaBlog &copy; All rights reserved {(new Date().getFullYear())}</span></div >
  );
}

export default MainFooter;