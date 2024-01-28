import styles from "./index.module.css";

const NavigationBar = () => {
  return (
    <div className={styles.navigationBar}>
      <div className={styles.navigationInnerBar}>
        <button className={styles.fashionLogo}>
          <img
            className={styles.fashionLogoChild}
            alt=""
            src="/rectangle-229@2x.png"
          />
        </button>
        <div className={styles.menuRight}>
          <div className={styles.linksContainer}>
            <div className={styles.links}>
              <button className={styles.whyQreactive}>Why QReactive?</button>
              <button className={styles.contactUs}>Contact Us</button>
              <button className={styles.faq}>FAQ</button>
              <div className={styles.createQr}>
                <button className={styles.contactUs}>Create QR Code</button>
                <div className={styles.line} />
              </div>
            </div>
            <button className={styles.component2}>
              <div className={styles.component2Child} />
              <div className={styles.component2Item} />
              <div className={styles.component2Inner} />
              <div className={styles.lineDiv} />
            </button>
            <div className={styles.button}>
              <button className={styles.signIn}>
                <i className={styles.signIn1}>Sign in</i>
              </button>
              <button className={styles.signUp}>
                <i className={styles.signUp1}>Sign Up</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
